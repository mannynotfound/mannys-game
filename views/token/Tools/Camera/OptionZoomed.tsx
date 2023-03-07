import ToggleSwitch from '@/components/ToggleSwitch';
import type { TokenStateDispatch } from '@/views/token/types';

type Props = {
  tokenId: number;
  zoomedIn: boolean;
  dispatch: TokenStateDispatch;
};

export default function OptionZoomed({ tokenId, zoomedIn, dispatch }: Props) {
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center">
        <b>PFP MODE</b>
      </div>
      <div>
        <ToggleSwitch
          id="pfp-mode"
          name="pfp-mode"
          checked={zoomedIn}
          onChange={() => {
            dispatch({
              type: 'SET_ZOOM',
              tokenId,
              payload: {
                zoomedIn: !zoomedIn,
              },
            });
          }}
          disabled={false}
        />
      </div>
    </div>
  );
}
