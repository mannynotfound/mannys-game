import { useContractRead } from 'wagmi';
import lootAbi from '@/fixtures/contracts/LOOTabi';
import mLootAbi from '@/fixtures/contracts/MLOOTabi';
import { EthAddress } from '@/utils/types';

const MLOOT_CONTRACT = '0x1dfe7Ca09e99d10835Bf73044a23B73Fc20623DF';
const LOOT_CONTRACT = '0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7';

export default function useLoot(address: EthAddress) {
  const { data: lootBalance } = useContractRead({
    address: LOOT_CONTRACT,
    abi: lootAbi,
    functionName: 'balanceOf',
    args: address !== undefined ? [address] : undefined,
    enabled: address !== undefined,
  });

  const { data: mLootBalance } = useContractRead({
    address: MLOOT_CONTRACT,
    abi: mLootAbi,
    functionName: 'balanceOf',
    args: address !== undefined ? [address] : undefined,
    enabled: address !== undefined,
  });

  const hasLoot = lootBalance !== undefined && lootBalance > 0n;
  const hasMLoot = mLootBalance !== undefined && mLootBalance > 0n;

  return { hasLoot, hasMLoot };
}
