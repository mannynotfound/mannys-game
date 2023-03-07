import { useState, useEffect } from 'react';
import { useContract } from 'wagmi';
import type { Provider } from '@wagmi/core';
import { EthAddress } from '@/utils/types';
import abi from '@/fixtures/contracts/FWBabi';

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
  }, [contract]);

  return hasFWB;
}
