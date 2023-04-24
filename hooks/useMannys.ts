import { useContractRead } from 'wagmi';
import mannysGameAbi from '@/fixtures/contracts/MANNYSGAMEabi';
import { MANNY_CONTRACT } from '@/utils/constants';
import type { EthAddress, Token, TokenId } from '@/utils/types';

export default function useMannys(address: EthAddress): Token[] | undefined {
  const { data: allTokens } = useContractRead({
    address: MANNY_CONTRACT,
    abi: mannysGameAbi,
    functionName: 'tokensByOwner',
    args: address !== undefined ? [address] : undefined,
  });

  if (allTokens === undefined) return undefined;
  return allTokens?.map((tokenId) => ({ tokenId: tokenId as TokenId }));
}
