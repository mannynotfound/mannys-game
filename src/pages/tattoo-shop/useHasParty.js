import { useState, useEffect } from 'react';
import { useContract } from 'wagmi';

const CONTRACT = '0x4523Fb71EC20f63928541c48cFC236219BD7700D';
const { abi } = require('contracts/PARTYabi');

export default function useHasParty(provider, address) {
  const [contributedEnough, setContributedEnough] = useState(false);

  const contract = useContract({
    addressOrName: CONTRACT,
    contractInterface: abi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    const getContributions = async () => {
      const contribution = await contract.getContributorInfo(address);
      if (contribution?.length) {
        const contributionAmount = contribution[0];
        // contributed at least .04 eth
        setContributedEnough(contributionAmount >= 40000000000000000);
      }
    };

    getContributions();
  }, [contract, address]);

  return contributedEnough;
}
