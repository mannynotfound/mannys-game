import ToggleSwitch from '@/components/ToggleSwitch';
import type { TokenStateDispatch } from '@/views/token/types';

type Props = {
  tokenId: number;
  paused: boolean;
  dispatch: TokenStateDispatch;
};

export default function OptionPaused({ tokenId, paused, dispatch }: Props) {
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
              payload: {
                paused: !paused,
              },
            });
          }}
          disabled={false}
        />
      </div>
    </div>
  );
}
