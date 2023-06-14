import React from 'react';
import styles from '../styles/Home.module.css';
import MapSector from './MapSector';

interface MapGridProps {}
export default function MapGrid(props: MapGridProps): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);
  const [sectors, setSectors] = React.useState<Array<JSX.Element>>([]);
  React.useEffect(() => {
    // create a two dimensional array of Pixel components
    const grid: typeof sectors = [];

    for (let x = 1; x <= 16; x++) {
      for (let y = 1; y <= 16; y++) {
        let color = '#000000';
        // TODO: get the chunk of the sector from the db cache and fit it into the sector
        grid.push(
          <MapSector x={x} y={y} color={color} key={`${x}sector${y}`} />
        );
      }
    }
    // set the grid
    setSectors(grid);
  }, []);
  return (
    <div ref={ref} className={styles.grid}>
      {sectors}
    </div>
  );
}