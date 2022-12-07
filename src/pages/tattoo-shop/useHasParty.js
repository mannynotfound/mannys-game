import { useState, useEffect } from 'react';
import { useContract } from 'wagmi';

const CONTRACT = '0x4523Fb71EC20f63928541c48cFC236219BD7700D';
const { abi } = require('contracts/PARTYabi');

export default function useHasParty(provider, address) {
  const [balance, setBalance] = useState();

  const contract = useContract({
    addressOrName: CONTRACT,
    contractInterface: abi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    const getBalance = async () => {
      const contractBalance = await contract.balanceOf(address);
      setBalance(contractBalance > 0);
    };

    getBalance();
  }, [contract]);

  return balance;
}
