import ToggleSwitch from '@/components/ToggleSwitch';
import type { TokenId } from '@/utils/types';
import { useTokenDispatch } from '@/views/token/hooks';

type Props = {
  tokenId: TokenId;
  zoomedIn: boolean;
};

export default function OptionZoomed({ tokenId, zoomedIn }: Props) {
  const dispatch = useTokenDispatch();
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
              payload: !zoomedIn,
            });
          }}
          disabled={false}
        />
      </div>
    </div>
  );
}
