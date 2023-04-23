import { useEffect, useState } from 'react';

type FloorResponse = {
  [collection: string]: number;
};

export default function useFloorPrice(
  collections: [string, number][]
): FloorResponse {
  const [floorPrices, setFloors] = useState<FloorResponse>({});

  useEffect(() => {
    const getFloors = async () => {
      const floorResponses: FloorResponse = {};
      for (const [collection, multiplier] of collections) {
        const floorPrice = await fetch(
          `https://api.opensea.io/api/v1/collection/${collection}?format=json`
        )
          .then((resp) => resp.json())
          .then((json) => json?.collection?.stats?.floor_price || 0);

        floorResponses[collection] = floorPrice * multiplier;
      }

      setFloors(floorResponses);
    };

    getFloors();
  }, [collections]);

  return floorPrices;
}
