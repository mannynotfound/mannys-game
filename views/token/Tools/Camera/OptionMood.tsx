import { useProvider } from 'wagmi';
import useLoot from '@/hooks/useLoot';
import { getTokenProps } from '@/utils';
import { Account } from '@/utils/types';
import type { TokenStateDispatch } from '@/views/token/types';

type Props = {
  account: Account;
  tokenId: number;
  mood: string;
  dispatch: TokenStateDispatch;
};

export default function OptionMood({
  account,
  tokenId,
  mood,
  dispatch,
}: Props) {
  const animationName = getTokenProps(tokenId)?.animationName;
  const provider = useProvider();
  const { hasLoot, hasMLoot } = useLoot(provider, account?.address);

  return (
    <div className="flex w-full justify-between mb-2">
      <div className="flex items-center">
        <b>MOOD</b>
      </div>
      <div>
        <select
          className="text-black p-1 text-right font-mono max-w-[170px]"
          value={mood}
          onChange={(e) => {
            dispatch({
              type: 'SET_MOOD',
              tokenId,
              payload: {
                mood: e.target.value,
              },
            });
          }}
        >
          <option>idle</option>
          {animationName !== undefined && <option>{animationName}</option>}
          <option
            title="Requires mLoot/Loot NFT."
            disabled={!hasMLoot && !hasLoot}
          >
            spellcast
          </option>
          <option
            title="Requires mLoot/Loot NFT."
            disabled={!hasMLoot && !hasLoot}
          >
            inward slash
          </option>
          <option
            title="Requires mLoot/Loot NFT."
            disabled={!hasMLoot && !hasLoot}
          >
            downward swing
          </option>
          <option
            title="Requires mLoot/Loot NFT."
            disabled={!hasMLoot && !hasLoot}
          >
            thrust
          </option>
          <option
            title="Requires mLoot/Loot NFT."
            disabled={!hasMLoot && !hasLoot}
          >
            horizontal swing
          </option>
          <option
            title="Requires mLoot/Loot NFT."
            disabled={!hasMLoot && !hasLoot}
          >
            sword run
          </option>
          <option title="Requires Loot NFT." disabled={!hasLoot}>
            spellcast 2h
          </option>
          <option title="Requires Loot NFT." disabled={!hasLoot}>
            battlecry
          </option>
        </select>
      </div>
    </div>
  );
}
