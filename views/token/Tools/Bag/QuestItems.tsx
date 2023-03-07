import type { TokenStateDispatch, SetTooltipArgs } from '@/views/token/types';
import { allQuests } from '@/fixtures/quests';
import QuestItem from '@/views/token/Tools/Bag/QuestItem';

type Props = {
  tokenId: number;
  dispatch: TokenStateDispatch;
  setTooltip: (args: SetTooltipArgs) => void;
};

export default function Quests({ tokenId, dispatch, setTooltip }: Props) {
  return (
    <div key="quest-items">
      <div className="text-green text-lg capitalize mb-1">quest items</div>
      <div className="flex gap-x-1" onMouseLeave={() => setTooltip(undefined)}>
        {allQuests.map((quest) => (
          <QuestItem
            key={quest.id}
            quest={quest}
            tokenId={tokenId}
            dispatch={dispatch}
            setTooltip={setTooltip}
            imageUrl={`/accessories/${quest.id}.png`}
          />
        ))}
      </div>
    </div>
  );
}
