import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import mannysGameAbi from '@/fixtures/contracts/MANNYSGAMEabi';
import { MANNY_CONTRACT } from '@/utils/constants';

export default function useTokenOwner(tokenId: number) {
  const { data: tokenOwner } = useContractRead({
    address: MANNY_CONTRACT,
    abi: mannysGameAbi,
    functionName: 'ownerOf',
    args: [BigNumber.from(tokenId)],
  });

  return tokenOwner;
}
