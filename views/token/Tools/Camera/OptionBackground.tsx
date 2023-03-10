import type { TokenId } from '@/utils/types';
import { useAppDispatch } from '@/views/token/hooks';
import { setBgColor } from '@/views/token/reducer';

type Props = {
  tokenId: TokenId;
  bgColor: string;
};

export default function OptionBackground({ tokenId, bgColor }: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center">
        <b>BACKGROUND</b>
      </div>
      <div>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => {
            dispatch(
              setBgColor({
                tokenId,
                value: e.target.value,
              })
            );
          }}
        />
      </div>
    </div>
  );
}
