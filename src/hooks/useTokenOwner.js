import { useState, useEffect } from 'react';

export default function useTokenOwner(mannyContract, tokenId) {
  const [tokenOwner, setTokenOwner] = useState();

  useEffect(() => {
    const checkOwner = async () => {
      if (mannyContract?.ownerOf && tokenId && tokenId <= 1616) {
        try {
          const tO = await mannyContract.ownerOf(tokenId);
          setTokenOwner(tO);
        } catch (e) {
          console.error(e);
        }
      }
    };

    checkOwner();
  }, [tokenId, mannyContract?.ownerOf]);

  return tokenOwner;
}
