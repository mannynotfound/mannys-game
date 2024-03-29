import { Dispatch } from 'react';
import { useSignMessage } from 'wagmi';
import { EthAddress } from '@/utils/types';
import { TattooCoordinates } from '@/views/tattoo-shop/types';

type Props = {
  setCurrentStep: Dispatch<number>;
  currentStep: number;
  chosenManny?: number;
  uploadFile?: File;
  setOwnerSignature?: Dispatch<EthAddress | undefined>;
  tattooCoords?: TattooCoordinates;
  onTattooUpload?: (sig: EthAddress) => void;
  jobType: string;
  setJobType: Dispatch<string>;
};

const StepControls = ({
  setCurrentStep,
  currentStep,
  chosenManny,
  uploadFile,
  setOwnerSignature,
  tattooCoords,
  onTattooUpload,
  jobType,
  setJobType,
}: Props) => {
  const { signMessageAsync: signMessage } = useSignMessage();
  let prevBtn = null;
  let nextBtn = null;

  const btnClasses = [
    'border-2',
    'text-2xl leading-10',
    'whitespace-nowrap',
    'font-bold uppercase',
    'py-2 px-6',
    'hover:text-gray',
  ];

  const prevClasses = ['border-white text-white', 'hover:bg-white']
    .concat(btnClasses)
    .join(' ');

  const nextClasses = ['ml-4', 'border-green text-green', 'hover:bg-green']
    .concat(btnClasses)
    .join(' ');

  if (currentStep === 0) {
    prevBtn = (
      <button
        className={prevClasses}
        onClick={() => {
          setJobType('');
        }}
      >
        ← BACK
      </button>
    );
    if (chosenManny) {
      nextBtn = (
        <button className={nextClasses} onClick={() => setCurrentStep(1)}>
          USE #{chosenManny} →
        </button>
      );
    }
  }

  if (currentStep === 1) {
    if (
      jobType === 'add' &&
      uploadFile &&
      setOwnerSignature !== undefined &&
      onTattooUpload !== undefined
    ) {
      nextBtn = (
        <button
          className={nextClasses}
          onClick={async () => {
            const signature = await signMessage({
              message: 'Claiming Manny Tattoo',
            }).catch(console.error);
            if (signature) {
              setOwnerSignature(signature);
              onTattooUpload(signature);
            }
          }}
        >
          Upload {uploadFile.name} →
        </button>
      );
    }
  }

  if (currentStep === 2) {
    prevBtn = (
      <button className={prevClasses} onClick={() => setCurrentStep(1)}>
        ← BACK
      </button>
    );
    if (jobType === 'add' && tattooCoords !== undefined) {
      nextBtn = (
        <button className={nextClasses} onClick={() => setCurrentStep(3)}>
          SUBMIT #{chosenManny} →
        </button>
      );
    }
  }

  if (currentStep === 3) {
    prevBtn = (
      <button className={prevClasses} onClick={() => setCurrentStep(2)}>
        ← BACK
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 w-full px-8 flex z-50">
      <div className="flex-1 text-right">{prevBtn}</div>
      <div className="flex-1 text-left">{nextBtn}</div>
    </div>
  );
};

export default StepControls;
