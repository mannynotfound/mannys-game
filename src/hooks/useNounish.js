import { useState, useEffect } from 'react';
import { useContract } from 'wagmi';

const LILNOUNS_CONTRACT = '0x4b10701Bfd7BFEdc47d50562b76b436fbB5BdB3B';
const { abi: lilNounsAbi } = require('contracts/LILNOUNSabi');

const NOUNS_CONTRACT = '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03';
const { abi: nounsAbi } = require('contracts/NOUNSabi');

const TOADZ_CONTRACT = '0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6';
const { abi: toadzAbi } = require('contracts/CRYPTOADZabi');

export default function useNounish(provider, address) {
  const [balance, setBalance] = useState();

  const lilNounsContract = useContract({
    addressOrName: LILNOUNS_CONTRACT,
    contractInterface: lilNounsAbi,
    signerOrProvider: provider,
  });

  const nounsContract = useContract({
    addressOrName: NOUNS_CONTRACT,
    contractInterface: nounsAbi,
    signerOrProvider: provider,
  });

  const toadzContract = useContract({
    addressOrName: TOADZ_CONTRACT,
    contractInterface: toadzAbi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    const getBalance = async () => {
      const lilNounsBalance = await lilNounsContract.balanceOf(address);
      const nounsBalance = await nounsContract.balanceOf(address);
      const toadzBalance = await toadzContract.balanceOf(address);

      setBalance(lilNounsBalance > 0 || nounsBalance > 0 || toadzBalance > 0);
    };

    getBalance();
  }, [lilNounsContract, nounsContract, toadzContract]);

  return balance;
}
