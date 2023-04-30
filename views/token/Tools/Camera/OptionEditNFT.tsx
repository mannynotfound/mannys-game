import { twMerge } from 'tailwind-merge';
import { useAppDispatch } from '@/views/token/hooks';
import type { TokenId } from '@/utils/types';
import { openImageUpload } from '@/views/token/reducer';

type Props = {
  tokenId: TokenId;
};

export default function OptionEditNFT({ tokenId }: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex w-full">
      <button
        className={twMerge(
          'button w-full cursor-pointer py-0.5 px-[12px]',
          `text-white text-center hover:text-gray-dark`,
          'border border-white rounded-sm',
          'hover:bg-white'
        )}
        onClick={() => dispatch(openImageUpload({ tokenId }))}
      >
        EDIT NFT IMAGE
      </button>
    </div>
  );
}
