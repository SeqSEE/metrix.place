import React from 'react';
import Pixel from './Pixel';
import styles from '../styles/Home.module.css';
import { RGBColor } from 'react-color';
import axios from 'axios';

interface EditGridProps {
  x: number;
  y: number;
  sector: [x: number, y: number];
  pixel: [x: number, y: number] | undefined;
  setPixel(pixel: [x: number, y: number] | undefined): void;
  color: RGBColor;
  setColor(color: RGBColor): void;
  updated: number;
}
export default function EditGrid(props: EditGridProps): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pixels, setPixels] = React.useState<Array<JSX.Element>>([]);
  React.useEffect(() => {
    updatePixels();
  }, [props.pixel, props.sector, props.color]);

  React.useEffect(() => {
    if (props.updated > 0) {
      updatePixels();
    }
  }, [props.updated]);

  const updatePixels = async () => {
    // create a two dimensional array of Pixel components
    const res = await axios.post('/api/pixelmap/get', {
      x: props.sector[0],
      y: props.sector[1]
    });
    const data: Uint8ClampedArray = res.data.data;
    const grid: typeof pixels = [];

    for (let x = 0; x < 64; x++) {
      for (let y = 0; y < 64; y++) {
        const pixelIndex = (x + y * 64) * 4; // Calculate the index for the desired pixel
        const r = data[pixelIndex]; // Red value (0-255)
        const g = data[pixelIndex + 1]; // Green value (0-255)
        const b = data[pixelIndex + 2]; // Blue value (0-255)
        const a = data[pixelIndex + 3] / 255; // Alpha value (0-255)

        let color: RGBColor = { r, g, b, a };
        if (props.pixel && x === props.pixel[0] && y === props.pixel[1]) {
          color = props.color;
          props.setColor(props.color);
        }

        grid.push(
          <Pixel
            sector={props.sector}
            pixel={props.pixel}
            setPixel={props.setPixel}
            x={x}
            y={y}
            color={color}
            setColor={props.setColor}
            key={`${x}pixel${y}`}
          />
        );
      }
    }
    // set the grid
    setPixels(grid);
  };
  return (
    <div ref={ref} className={styles.grid}>
      {pixels}
    </div>
  );
}
