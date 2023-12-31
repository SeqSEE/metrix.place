import express from 'express';
import next from 'next';
import cors from 'cors';
import http from 'http';
import { Server, Socket } from 'socket.io';

import Logger from './util/logger';
import { staticServe } from './util/StaticServe';
const logger = new Logger('server', 'purple');
const loggerApp = logger.createSubLogger('app', 'green');

const port = parseInt(process.env.NEXT_PUBLIC_HOST_PORT as string, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: process.cwd() });

const handle = app.getRequestHandler();
interface SocketIdToSocketMap {
  [socketId: string]: Socket; // Assuming Socket is the type representing a socket object
}
export let connectedSockets: SocketIdToSocketMap = {};

const corsOptions = {
  origin: `http://localhost:${port}`
};

app.prepare().then(() => {
  loggerApp.info(`>> Running as ${process.env.NODE_ENV} on Port ${port}`);

  const server = express();
  const srv = http.createServer(server);
  const io = new Server(srv);
  io.on('connection', (socket) => {
    connectedSockets[socket.id] = socket;
    socket.on('disconnect', () => {
      delete connectedSockets[socket.id]; // Remove the disconnected socket from the storage
    });
    // Emit update signals or handle events based on your application's logic
    // For example:
    // socket.emit('update', { data: 'Some update data' });
  });

  server.use(cors(corsOptions));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use('/plc', staticServe);

  const serve = process.env.SERVE_PATH_ROOT
    ? (process.env.SERVE_PATH_ROOT as string)
    : '*';
  /* eslint-disable @typescript-eslint/no-explicit-any */
  server.all(serve, (req: any, res: any) => {
    return handle(req, res);
  });

  srv.listen(port, () => {
    loggerApp.info(`> Ready on http://localhost:${port}`);
  });
});
