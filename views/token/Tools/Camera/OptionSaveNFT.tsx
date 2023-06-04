import { twMerge } from 'tailwind-merge';

type Props = {
  saveUserMetadata: () => void;
};

export default function OptionSaveMetadata({ saveUserMetadata }: Props) {
  return (
    <div className="flex w-full">
      <button
        className={twMerge(
          'button w-full cursor-pointer py-0.5 px-[12px]',
          `text-white text-center hover:text-gray-dark`,
          'border border-white rounded-sm',
          'hover:bg-white'
        )}
        onClick={saveUserMetadata}
      >
        SAVE NFT
      </button>
    </div>
  );
}
