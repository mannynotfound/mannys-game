import ToggleSwitch from '@/components/ToggleSwitch';
import type { TokenStateDispatch } from '@/views/token/types';

type Props = {
  tokenId: number;
  textureHD: boolean;
  dispatch: TokenStateDispatch;
};

export default function OptionToggleHD({
  tokenId,
  textureHD,
  dispatch,
}: Props) {
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
              payload: {
                textureHD: !textureHD,
              },
            });
          }}
          disabled={false}
        />
      </div>
    </div>
  );
}
