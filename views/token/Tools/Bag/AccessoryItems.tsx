import useSWR from 'swr';
import { useProvider } from 'wagmi';
import { Accessory, allAccessories } from '@/fixtures/accessories';
import useLoot from '@/hooks/useLoot';
import useFWB from '@/hooks/useFWB';
import useNounish from '@/hooks/useNounish';
import type { Account, AchievementEarnedObject } from '@/utils/types';
import { fetcher, groupBy } from '@/utils';
import { API_URL } from '@/utils/constants';
import type {
  TokenState,
  TokenStateDispatch,
  SetTooltipArgs,
} from '@/views/token/types';
import Item from '@/views/token/Tools/Bag/AccessoryItem';

type Props = {
  tokenId: number;
  account: Account;
  accessories: TokenState['accessories'];
  dispatch: TokenStateDispatch;
  setTooltip: (args: SetTooltipArgs) => void;
};

const accessoriesByCategory = groupBy(allAccessories, (a) => a.category);

export default function AccessoryItems({
  tokenId,
  account,
  accessories,
  dispatch,
  setTooltip,
}: Props) {
  const provider = useProvider();
  const address = account?.address;

  const { data: achievements } = useSWR<AchievementEarnedObject[]>(
    address === undefined ? null : `${API_URL}/achievements/gamer/${address}`,
    fetcher
  );

  const hasFWB = useFWB(provider, address);
  const hasNouns = useNounish(provider, address);
  const { hasLoot, hasMLoot } = useLoot(provider, address);
  const getItemEnabled = (accessory: Accessory) => {
    if (
      accessory.validator === undefined ||
      accessory.requirement === undefined
    ) {
      return true;
    }

    if (accessory.mystery) {
      return false;
    }

    return accessory.validator({
      achievements: achievements ?? [],
      hasFWB,
      hasNouns,
      hasMLoot,
      hasLoot,
    });
  };

  return (
    <>
      {Object.entries(accessoriesByCategory).map(
        ([category, accessoryData]) => (
          <div key={category}>
            <div className="text-green text-lg capitalize mb-1">{category}</div>
            <div className="flex" onMouseLeave={() => setTooltip(undefined)}>
              {accessoryData.map((acc, idx, arr) => {
                const slotAccessories = accessories?.[acc.slot] ?? [];
                const isActive = slotAccessories.includes(acc.id);
                return (
                  <Item
                    isEnabled={getItemEnabled(acc)}
                    isActive={isActive}
                    onClick={() => {
                      dispatch({
                        type: 'TOGGLE_ACCESSORY',
                        tokenId,
                        payload: acc,
                      });
                    }}
                    setTooltip={setTooltip}
                    key={acc.id}
                    imageUrl={`/accessories/${acc.id}.png`}
                    accessory={acc}
                    className={idx === arr.length - 1 ? '' : 'mr-1'}
                  />
                );
              })}
            </div>
          </div>
        )
      )}
    </>
  );
}
