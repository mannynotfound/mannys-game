import Button from '@/components/Button';
import type { TokenStateDispatch } from '@/views/token/types';

type Props = {
  dispatch: TokenStateDispatch;
  tokenId: number;
};

export default function OptionEditNFT({ dispatch, tokenId }: Props) {
  return (
    <div className="flex w-full">
      <Button
        className="w-full text-center hover:bg-yellow"
        color="yellow"
        onClick={() => dispatch({ type: 'OPEN_IMAGE_UPLOAD', tokenId })}
      >
        <div className="mt-1">EDIT NFT IMAGE</div>
      </Button>
    </div>
  );
}
