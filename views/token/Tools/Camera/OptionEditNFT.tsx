import Button from '@/components/Button';
import type { TokenId } from '@/utils/types';
import { useTokenDispatch } from '@/views/token/hooks';

type Props = {
  tokenId: TokenId;
};

export default function OptionEditNFT({ tokenId }: Props) {
  const dispatch = useTokenDispatch();
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
