import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const config = {
  development: {
    storage: path.resolve('./data', 'database.sqlite'),
    dialect: 'sqlite'
  },
  test:
    process.env.DB_DIALECT === 'sqlite'
      ? {
          storage: path.resolve('./data', 'database.sqlite'),
          dialect: 'sqlite'
        }
      : {
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          host: process.env.DB_HOST,
          dialect: process.env.DB_DIALECT
        },
  production:
    process.env.DB_DIALECT === 'sqlite'
      ? {
          storage: path.resolve('./data', 'database.sqlite'),
          dialect: 'sqlite'
        }
      : {
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          host: process.env.DB_HOST,
          dialect: process.env.DB_DIALECT
        }
};
export { config };
