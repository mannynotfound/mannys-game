import { useState, useEffect } from 'react';
import type { Contract } from 'ethers';
import type { EthAddress, Token, TokenId } from '@/utils/types';

export default function useMannys(
  mannyContract: Contract | null,
  address: EthAddress
): Token[] | undefined {
  const [mannys, setMannys] = useState<Token[]>();

  useEffect(() => {
    const getBalances = async () => {
      if (!address || mannyContract === null) return;
      const allTokens = await mannyContract.tokensByOwner(address);
      if (allTokens === undefined) return;
      setMannys(allTokens.map((tokenId: TokenId) => ({ tokenId })));
    };

    getBalances();
  }, [address, mannyContract !== null]);

  return mannys;
}
