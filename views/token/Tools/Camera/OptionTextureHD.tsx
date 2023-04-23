import ToggleSwitch from '@/components/ToggleSwitch';
import { useAppDispatch } from '@/views/token/hooks';
import type { TokenId } from '@/utils/types';
import { setTextureHD } from '@/views/token/reducer';

type Props = {
  tokenId: TokenId;
  textureHD: boolean;
};

export default function OptionToggleHD({ tokenId, textureHD }: Props) {
  const dispatch = useAppDispatch();
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
            dispatch(
              setTextureHD({
                tokenId,
                value: !textureHD,
              })
            );
          }}
          disabled={false}
        />
      </div>
    </div>
  );
}
