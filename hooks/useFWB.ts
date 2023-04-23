import { useEffect, useState } from 'react';
import type { Provider } from '@wagmi/core';
import { useContract } from 'wagmi';
import abi from '@/fixtures/contracts/FWBabi';
import { EthAddress } from '@/utils/types';

const FWB_CONTRACT = '0x35bd01fc9d6d5d81ca9e055db88dc49aa2c699a8';

export default function useFWB(provider: Provider, address: EthAddress) {
  const [hasFWB, setHasFWB] = useState(false);

  const contract = useContract({
    address: FWB_CONTRACT,
    abi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    const getBalance = async () => {
      if (contract === null) {
        return;
      }
      const balance = await contract.balanceOf(address);
      setHasFWB(balance > 0);
    };
    getBalance();
  }, [contract, address]);

  return hasFWB;
}
