import { useBalance } from 'wagmi';
import { EthAddress } from '@/utils/types';

const FWB_CONTRACT = '0x35bd01fc9d6d5d81ca9e055db88dc49aa2c699a8';

export default function useFWB(address: EthAddress) {
  const { data: balance } = useBalance({
    address,
    token: FWB_CONTRACT,
  });

  return balance?.value !== undefined;
}
