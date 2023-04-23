import { useEffect, useState } from 'react';
import type { Contract } from 'ethers';
import type { EthAddress } from '@/utils/types';

export default function useTokenOwner(
  mannyContract: Contract,
  tokenId: number
) {
  const [tokenOwner, setTokenOwner] = useState<EthAddress>();

  useEffect(() => {
    const checkOwner = async () => {
      if (mannyContract?.ownerOf && tokenId && tokenId <= 1616) {
        try {
          const tO: EthAddress = await mannyContract.ownerOf(tokenId);
          setTokenOwner(tO);
        } catch (e) {
          console.error(e);
        }
      }
    };

    checkOwner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenId, mannyContract?.ownerOf]);

  return tokenOwner;
}
