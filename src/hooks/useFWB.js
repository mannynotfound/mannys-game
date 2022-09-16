import { useState, useEffect } from 'react';
import { useContract } from 'wagmi';

const FWB_CONTRACT = '0x35bd01fc9d6d5d81ca9e055db88dc49aa2c699a8';
const { abi } = require('contracts/FWBabi');

export default function useFWB(provider, address) {
  const [hasFWB, setHasFWB] = useState();

  const contract = useContract({
    addressOrName: FWB_CONTRACT,
    contractInterface: abi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    const getBalance = async () => {
      const balance = await contract.balanceOf(address);
      setHasFWB(balance > 0);
    };
    getBalance();
  }, [contract]);

  return hasFWB;
}
