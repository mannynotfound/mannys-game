import { Pause, Play } from '@/components/Svg';
import { useAppDispatch } from '@/views/token/hooks';
import type { TokenId } from '@/utils/types';
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
      <div className="text-white cursor-pointer">
        {paused ? (
          <Play
            height={20}
            width={20}
            onClick={() => {
              dispatch(
                setPaused({
                  tokenId,
                  value: false,
                })
              );
            }}
          />
        ) : (
          <Pause
            onClick={() => {
              dispatch(
                setPaused({
                  tokenId,
                  value: true,
                })
              );
            }}
          />
        )}
      </div>
    </div>
  );
}
