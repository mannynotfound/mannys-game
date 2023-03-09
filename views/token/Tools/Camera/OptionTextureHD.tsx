import ToggleSwitch from '@/components/ToggleSwitch';
import type { TokenId } from '@/utils/types';
import { useTokenDispatch } from '@/views/token/hooks';

type Props = {
  tokenId: TokenId;
  textureHD: boolean;
};

export default function OptionToggleHD({ tokenId, textureHD }: Props) {
  const dispatch = useTokenDispatch();
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center">
        <b>HD TEXTURE</b>
      </div>
      <div>
        <ToggleSwitch
          id="textureHD"
          name="textureHD"
          checked={textureHD}
          onChange={() => {
            dispatch({
              type: 'SET_TEXTURE_HD',
              tokenId,
              payload: !textureHD,
            });
          }}
          disabled={false}
        />
      </div>
    </div>
  );
}
