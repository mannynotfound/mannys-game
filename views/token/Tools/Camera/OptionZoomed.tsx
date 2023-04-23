import ToggleSwitch from '@/components/ToggleSwitch';
import { useAppDispatch } from '@/views/token/hooks';
import type { TokenId } from '@/utils/types';
import { setZoom } from '@/views/token/reducer';

type Props = {
  tokenId: TokenId;
  zoomedIn: boolean;
};

export default function OptionZoomed({ tokenId, zoomedIn }: Props) {
  const dispatch = useAppDispatch();
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
            dispatch(
              setZoom({
                tokenId,
                value: !zoomedIn,
              })
            );
          }}
          disabled={false}
        />
      </div>
    </div>
  );
}
