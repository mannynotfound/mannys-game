import { useState, useEffect } from 'react';
import { asyncForEach } from 'utils';

export default function useFloor(collections) {
  const [floorPrices, setFloors] = useState(0);

  useEffect(() => {
    const getFloors = async () => {
      const floorResponses = {};
      await asyncForEach(collections, async ([collection, multiplier]) => {
        await fetch(
          `https://api.opensea.io/api/v1/collection/${collection}?format=json`
        )
          .then((resp) => resp.json())
          .then((json) => {
            floorResponses[collection] =
              (json?.collection?.stats?.floor_price || 0) * multiplier;
          });
      });

      setFloors(floorResponses);
    };

    getFloors();
  }, []);

  return floorPrices;
}
