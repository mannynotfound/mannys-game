import ToggleSwitch from '@/components/ToggleSwitch';
import type { TokenId } from '@/utils/types';
import { useTokenDispatch } from '@/views/token/hooks';

type Props = {
  tokenId: TokenId;
  paused: boolean;
};

export default function OptionPaused({ tokenId, paused }: Props) {
  const dispatch = useTokenDispatch();
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
            dispatch({
              type: 'SET_PAUSED',
              tokenId,
              payload: !paused,
            });
          }}
          disabled={false}
        />
      </div>
    </div>
  );
}
