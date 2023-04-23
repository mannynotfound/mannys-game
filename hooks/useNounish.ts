import { useEffect, useState } from 'react';
import type { Provider } from '@wagmi/core';
import { useContract } from 'wagmi';
import toadzAbi from '@/fixtures/contracts/CRYPTOADZabi';
import lilNounsAbi from '@/fixtures/contracts/LILNOUNSabi';
import nounsAbi from '@/fixtures/contracts/NOUNSabi';
import { EthAddress } from '@/utils/types';

const LILNOUNS_CONTRACT = '0x4b10701Bfd7BFEdc47d50562b76b436fbB5BdB3B';
const NOUNS_CONTRACT = '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03';
const TOADZ_CONTRACT = '0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6';

export default function useNounish(provider: Provider, address: EthAddress) {
  const [hasNounish, setHasNounish] = useState(false);

  const lilNounsContract = useContract({
    address: LILNOUNS_CONTRACT,
    abi: lilNounsAbi,
    signerOrProvider: provider,
  });

  const nounsContract = useContract({
    address: NOUNS_CONTRACT,
    abi: nounsAbi,
    signerOrProvider: provider,
  });

  const toadzContract = useContract({
    address: TOADZ_CONTRACT,
    abi: toadzAbi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    const getBalance = async () => {
      const lilNounsBalance = await lilNounsContract?.balanceOf(address);
      const nounsBalance = await nounsContract?.balanceOf(address);
      const toadzBalance = await toadzContract?.balanceOf(address);
      const hasLilNouns = lilNounsBalance ?? 0 > 0;
      const hasNouns = nounsBalance ?? 0 > 0;
      const hasToadz = toadzBalance ?? 0 > 0;
      setHasNounish(hasLilNouns || hasNouns || hasToadz);
    };

    getBalance();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [
    lilNounsContract !== null,
    nounsContract !== null,
    toadzContract !== null,
    address,
  ]);

  return hasNounish;
}
