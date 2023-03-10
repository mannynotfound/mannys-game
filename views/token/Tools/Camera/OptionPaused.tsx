import ToggleSwitch from '@/components/ToggleSwitch';
import type { TokenId } from '@/utils/types';
import { useAppDispatch } from '@/views/token/hooks';
import { setPaused } from '@/views/token/reducer';

type Props = {
  tokenId: TokenId;
  paused: boolean;
};

export default function OptionPaused({ tokenId, paused }: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center">
        <b>PAUSED</b>
      </div>
      <div>
        <ToggleSwitch
          id="paused"
          name="paused"
          checked={paused}
          onChange={() => {
            dispatch(
              setPaused({
                tokenId,
                value: !paused,
              })
            );
          }}
          disabled={false}
        />
      </div>
    </div>
  );
}
