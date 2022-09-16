import { useState, useEffect } from 'react';

export default function useMannys(mannyContract, address) {
  const [mannys, setMannys] = useState();

  useEffect(() => {
    const getBalances = async () => {
      const allTokens = await mannyContract.tokensByOwner(address);
      const update = allTokens?.map((at) => ({ id: at, owner: address }));
      setMannys(update);
    };
    if (address && mannyContract?.tokensByOwner) {
      getBalances();
    }
  }, [address, mannyContract]);

  return mannys;
}
