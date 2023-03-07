import { twMerge } from 'tailwind-merge';
import type { TokenStateDispatch } from '@/views/token/types';
import { Backpack, Camera } from '@/components/Svg';

type Props = {
  tokenId: number;
  bagOpen: boolean;
  cameraOpen: boolean;
  dispatch: TokenStateDispatch;
};

export default function Menu({
  tokenId,
  bagOpen,
  cameraOpen,
  dispatch,
}: Props) {
  const baseClasses = twMerge(
    'min-w-[50px] min-h-[50px]',
    'inline-block p-1 rounded-md relative border',
    'hover:text-yellow hover:border-yellow cursor-pointer'
  );
  const bagClasses = twMerge(
    baseClasses,
    bagOpen ? 'border-yellow text-yellow' : 'border-green text-green'
  );
  const cameraClasses = twMerge(
    baseClasses,
    cameraOpen ? 'border-yellow text-yellow' : 'border-green text-green'
  );

  return (
    <div className="w-full flex items-center justify-end gap-2">
      <div
        className={cameraClasses}
        onClick={() =>
          dispatch({ type: 'SET_CAMERA_OPEN', tokenId, payload: !cameraOpen })
        }
      >
        <div className="flex items-center absolute inset-0">
          <Camera height={30} width={30} className="mx-auto" />
        </div>
      </div>
      <div
        className={bagClasses}
        onClick={() =>
          dispatch({ type: 'SET_BAG_OPEN', tokenId, payload: !bagOpen })
        }
      >
        <Backpack height={40} width={20} className="mx-auto" />
      </div>
    </div>
  );
}
