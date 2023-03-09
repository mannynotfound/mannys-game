import type { TokenId } from '@/utils/types';
import { useTokenDispatch } from '@/views/token/hooks';

type Props = {
  tokenId: TokenId;
  bgColor: string;
};

export default function OptionBackground({ tokenId, bgColor }: Props) {
  const dispatch = useTokenDispatch();
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
            dispatch({
              type: 'SET_BG_COLOR',
              tokenId,
              payload: e.target.value,
            });
          }}
        />
      </div>
    </div>
  );
}
