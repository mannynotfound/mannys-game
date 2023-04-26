import { AnimatePresence, motion, useIsPresent } from 'framer-motion';
import useSWR from 'swr';
import { Accessory, allAccessories } from '@/fixtures/accessories';
import useFWB from '@/hooks/useFWB';
import useLoot from '@/hooks/useLoot';
import useNounish from '@/hooks/useNounish';
import { useAppDispatch } from '@/views/token/hooks';
import { fetcher, groupBy } from '@/utils';
import { API_URL } from '@/utils/constants';
import type { Account, AchievementEarnedObject, TokenId } from '@/utils/types';
import Item from '@/views/token/Tools/Bag/AccessoryItem';
import type { SetTooltipArgs } from '@/views/token/Tools/Bag/Tooltip';
import { TokenState, toggleAccessory } from '@/views/token/reducer';

type Props = {
  tokenId: TokenId;
  account: Account;
  accessories: TokenState['accessories'];
  setTooltip: (args: SetTooltipArgs) => void;
};

const accessoriesByCategory = groupBy(allAccessories, (a) => a.category);

export default function AccessoryItems({
  tokenId,
  account,
  accessories,
  setTooltip,
}: Props) {
  const dispatch = useAppDispatch();
  const address = account?.address;

  const { data: achievements } = useSWR<AchievementEarnedObject[]>(
    address === undefined ? null : `${API_URL}/achievements/gamer/${address}`,
    fetcher
  );

  const hasFWB = useFWB(address);
  const hasNouns = useNounish(address);
  const { hasLoot, hasMLoot } = useLoot(address);
  const getItemEnabled = (accessory: Accessory) => {
    if (
      accessory.validator === undefined ||
      accessory.requirement === undefined
    ) {
      return true;
    }

    return accessory.validator({
      achievements: achievements ?? [],
      hasFWB,
      hasNouns,
      hasMLoot,
      hasLoot,
    });
  };

  const isPresent = useIsPresent();

  return (
    <>
      {Object.entries(accessoriesByCategory).map(
        ([category, accessoryData]) => (
          <div key={category}>
            <div className="text-green text-lg capitalize mb-1 min-h-[28px]">
              <AnimatePresence>
                {isPresent && (
                  <motion.div
                    className="inline-block"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, transition: { delay: 0.2 } }}
                    exit={{ scale: 0 }}
                  >
                    {category}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div
              className="flex min-h-[40px] gap-x-1"
              onMouseLeave={() => setTooltip(undefined)}
            >
              <AnimatePresence>
                {isPresent &&
                  accessoryData.map((acc) => {
                    const slotAccessories = accessories?.[acc.slot] ?? [];
                    const isActive = slotAccessories.includes(acc.id);
                    return (
                      <div key={acc.id} className="h-[40px] w-[40px]">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, transition: { delay: 0.2 } }}
                          exit={{ scale: 0 }}
                        >
                          <Item
                            isEnabled={getItemEnabled(acc)}
                            isActive={isActive}
                            onClick={() => {
                              dispatch(
                                toggleAccessory({
                                  tokenId,
                                  value: {
                                    id: acc.id,
                                    slot: acc.slot,
                                  },
                                })
                              );
                            }}
                            setTooltip={setTooltip}
                            key={acc.id}
                            imageUrl={`/accessories/${acc.id}.png`}
                            accessory={acc}
                          />
                        </motion.div>
                      </div>
                    );
                  })}
              </AnimatePresence>
            </div>
          </div>
        )
      )}
    </>
  );
}
