import { allQuests } from '@/fixtures/quests';
import type { TokenId } from '@/utils/types';
import QuestItem from '@/views/token/Tools/Bag/QuestItem';
import type { SetTooltipArgs } from '@/views/token/Tools/Bag/Tooltip';

type Props = {
  tokenId: TokenId;
  setTooltip: (args: SetTooltipArgs) => void;
};

export default function Quests({ tokenId, setTooltip }: Props) {
  return (
    <div key="quest-items">
      <div className="text-green text-lg capitalize mb-1">quest items</div>
      <div className="flex gap-x-1" onMouseLeave={() => setTooltip(undefined)}>
        {allQuests.map((quest) => (
          <QuestItem
            key={quest.id}
            quest={quest}
            tokenId={tokenId}
            setTooltip={setTooltip}
            imageUrl={`/accessories/${quest.id}.png`}
          />
        ))}
      </div>
    </div>
  );
}
