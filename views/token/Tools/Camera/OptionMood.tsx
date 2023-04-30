import { useMemo } from 'react';
import Select from 'react-select';
import { animations } from 'manny';
import { twMerge } from 'tailwind-merge';
import useLoot from '@/hooks/useLoot';
import { useAppDispatch } from '@/views/token/hooks';
import { getTokenProps } from '@/utils';
import type { Account, TokenId } from '@/utils/types';
import { setMood } from '@/views/token/reducer';

type Props = {
  account: Account;
  tokenId: TokenId;
  mood: string;
};

const weaponAnimations = [
  'spellcast',
  'inward slash',
  'downward swing',
  'thrust',
  'horizontal swing',
  'sword run',
  'spellcast 2h',
  'battlecry',
];

export default function OptionMood({ account, tokenId, mood }: Props) {
  const dispatch = useAppDispatch();
  const animationName = getTokenProps(tokenId)?.animationName;
  const { hasLoot, hasMLoot } = useLoot(account?.address);

  const allOptions = useMemo(() => {
    const modelAnim = animationName !== undefined ? [animationName] : [];
    const weaponsAndDefaults = modelAnim
      .concat(animations)
      .concat(weaponAnimations)
      .sort();
    return weaponsAndDefaults.map((option) => ({
      value: option,
      label: option,
      disabled: !hasMLoot && !hasLoot,
    }));
  }, [animationName, hasMLoot, hasLoot]);

  return (
    <div className="flex w-full justify-between gap-x-4">
      <div className="flex items-center">
        <b>MOOD</b>
      </div>
      <Select
        className="min-w-[185px] h-[32px]"
        maxMenuHeight={240}
        classNames={{
          control: () =>
            '!bg-gray-dark h-[32px] !min-h-[32px] !border-white !shadow-none',
          singleValue: () => '!text-white text-sm',
          valueContainer: () => '!p-0 !px-2',
          indicatorsContainer: () => '!p-0 indicators-container',
          option: (state) =>
            twMerge(
              '!px-2 !py-0.5 !text-sm',
              (state.isFocused || state.isSelected) &&
                '!bg-yellow !text-gray-dark'
            ),
          menu: () => '!bg-gray-dark !text-white border border-white',
          input: () => '',
        }}
        options={allOptions}
        onChange={(newValue) => {
          dispatch(
            setMood({
              tokenId,
              value: newValue?.value ?? 'idle',
            })
          );
        }}
        value={{
          value: mood,
          label: mood,
        }}
      />
    </div>
  );
}
