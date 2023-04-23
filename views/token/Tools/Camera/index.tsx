import { useAppDispatch } from '@/views/token/hooks';
import type { Account, TokenId } from '@/utils/types';
import OptionBackground from '@/views/token/Tools/Camera/OptionBackground';
import OptionEditNFT from '@/views/token/Tools/Camera/OptionEditNFT';
import OptionMood from '@/views/token/Tools/Camera/OptionMood';
import OptionPaused from '@/views/token/Tools/Camera/OptionPaused';
import OptionSave from '@/views/token/Tools/Camera/OptionSave';
import OptionTextureHD from '@/views/token/Tools/Camera/OptionTextureHD';
import OptionZoomed from '@/views/token/Tools/Camera/OptionZoomed';
import { toggleCameraOpen } from '@/views/token/reducer';

type Props = {
  account: Account;
  tokenId: TokenId;
  mood: string;
  bgColor: string;
  zoomedIn: boolean;
  paused: boolean;
  textureHD: boolean;
};

export default function Camera({
  account,
  tokenId,
  mood,
  bgColor,
  zoomedIn,
  paused,
  textureHD,
}: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="absolute right-0 px-8 text-green select-none bottom-[200px] max-w-[320px] w-full">
      <div className="border p-4 border-green rounded-md relative z-10 flex flex-col gap-y-2">
        <div
          className="absolute top-0 right-0 text-yellow cursor-pointer z-0"
          onClick={() =>
            dispatch(
              toggleCameraOpen({
                tokenId,
                value: false,
              })
            )
          }
        >
          <div className="p-4 pb-0 text-2xl">
            <b>x</b>
          </div>
        </div>
        <div className="text-yellow text-xl">
          <b>Camera</b>
        </div>
        <OptionMood account={account} tokenId={tokenId} mood={mood} />
        <OptionBackground tokenId={tokenId} bgColor={bgColor} />
        <OptionZoomed tokenId={tokenId} zoomedIn={zoomedIn} />
        <OptionPaused tokenId={tokenId} paused={paused} />
        <OptionTextureHD tokenId={tokenId} textureHD={textureHD} />
        <OptionSave tokenId={tokenId} />
        <OptionEditNFT tokenId={tokenId} />
      </div>
    </div>
  );
}
