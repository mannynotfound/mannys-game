import type { TokenStateDispatch } from '@/views/token/types';

type Props = {
  tokenId: number;
  bgColor: string;
  dispatch: TokenStateDispatch;
};

export default function OptionBackground({
  tokenId,
  bgColor,
  dispatch,
}: Props) {
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
              payload: {
                bgColor: e.target.value,
              },
            });
          }}
        />
      </div>
    </div>
  );
}
