import { useContractRead } from 'wagmi';
import toadzAbi from '@/fixtures/contracts/CRYPTOADZabi';
import lilNounsAbi from '@/fixtures/contracts/LILNOUNSabi';
import nounsAbi from '@/fixtures/contracts/NOUNSabi';
import { EthAddress } from '@/utils/types';

const LILNOUNS_CONTRACT = '0x4b10701Bfd7BFEdc47d50562b76b436fbB5BdB3B';
const NOUNS_CONTRACT = '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03';
const TOADZ_CONTRACT = '0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6';

export default function useNounish(address: EthAddress) {
  const { data: lilNounsBalance } = useContractRead({
    address: LILNOUNS_CONTRACT,
    abi: lilNounsAbi,
    functionName: 'balanceOf',
    args: address !== undefined ? [address] : undefined,
  });

  const { data: nounsBalance } = useContractRead({
    address: NOUNS_CONTRACT,
    abi: nounsAbi,
    functionName: 'balanceOf',
    args: address !== undefined ? [address] : undefined,
  });

  const { data: toadzBalance } = useContractRead({
    address: TOADZ_CONTRACT,
    abi: toadzAbi,
    functionName: 'balanceOf',
    args: address !== undefined ? [address] : undefined,
  });

  const hasLilNouns = lilNounsBalance !== undefined && lilNounsBalance.gt(0);
  const hasNouns = nounsBalance !== undefined && nounsBalance.gt(0);
  const hasToadz = toadzBalance !== undefined && toadzBalance.gt(0);

  return hasLilNouns || hasNouns || hasToadz;
}
