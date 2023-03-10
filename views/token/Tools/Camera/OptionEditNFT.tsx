import Button from '@/components/Button';
import type { TokenId } from '@/utils/types';
import { useAppDispatch } from '@/views/token/hooks';
import { openImageUpload } from '@/views/token/reducer';

type Props = {
  tokenId: TokenId;
};

export default function OptionEditNFT({ tokenId }: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex w-full">
      <Button
        className="w-full text-center hover:bg-yellow"
        color="yellow"
        onClick={() => dispatch(openImageUpload({ tokenId }))}
      >
        <div className="mt-1">EDIT NFT IMAGE</div>
      </Button>
    </div>
  );
}
