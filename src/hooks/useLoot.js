import { useState, useEffect } from 'react';
import { useContract } from 'wagmi';

const MLOOT_CONTRACT = '0x1dfe7Ca09e99d10835Bf73044a23B73Fc20623DF';
const LOOT_CONTRACT = '0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7';
const { abi: lootAbi } = require('contracts/LOOTabi');
const { abi: mLootAbi } = require('contracts/MLOOTabi');

const useLoot = (provider, address) => {
  const [lootBalance, setLootBalance] = useState();
  const [mLootBalance, setMLootBalance] = useState();

  const lootContract = useContract({
    addressOrName: LOOT_CONTRACT,
    contractInterface: lootAbi,
    signerOrProvider: provider,
  });

  const mLootContract = useContract({
    addressOrName: MLOOT_CONTRACT,
    contractInterface: mLootAbi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    const getBalances = async () => {
      const lootBalance = await lootContract.balanceOf(address);
      setLootBalance(lootBalance > 0);

      const mLootBalance = await mLootContract.balanceOf(address);
      setMLootBalance(mLootBalance > 0);
    };

    getBalances();
  }, [lootContract, mLootContract]);

  return { lootBalance, mLootBalance };
};

export default useLoot;
