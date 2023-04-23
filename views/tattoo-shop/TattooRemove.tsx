import { Dispatch, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/Button';
import { Account, Token } from '@/utils/types';
import NoMannys from '@/views/tattoo-shop/NoMannys';
import StepControls from '@/views/tattoo-shop/StepControls';
import { StepFour, StepOne } from '@/views/tattoo-shop/Steps';
import WalletConnect from '@/views/tattoo-shop/WalletConnect';
import { SubmitResponse } from '@/views/tattoo-shop/types';

type Props = {
  account: Account;
  mannys: Token[] | undefined;
  setJobType: Dispatch<string>;
};

const TattooRemove = ({ account, mannys, setJobType }: Props) => {
  const [chosenManny, setChosenManny] = useState<number>();
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>();
  const [currentStep, setCurrentStep] = useState<number>(0);

  if (account.isConnecting) {
    return null;
  }

  const onTattooSubmit = () => {
    setSubmitResponse({
      type: 'success',
      message: 'submitted tattoo removal request',
    });
  };

  if (!account.isConnecting && !account?.address) {
    return <WalletConnect />;
  }

  if (!account.isConnecting && Array.isArray(mannys) && !mannys.length) {
    return <NoMannys />;
  }

  return (
    <>
      <div className="w-full h-auto mt-4">
        {submitResponse && (
          <div
            className={twMerge(
              'flex flex-wrap justify-center flex-col',
              submitResponse.type === 'success' ? 'text-green' : 'text-red'
            )}
          >
            <p className="text-lg mt-4 text-center">{submitResponse.message}</p>
            <p className="text-center mt-4">
              <Button
                className="text-2xl font-bold leading-10 uppercase px-4 py-[6px]"
                color={submitResponse.type === 'failure' ? 'red' : 'green'}
                onClick={() => {
                  setSubmitResponse(undefined);
                  setChosenManny(undefined);
                  setCurrentStep(0);
                }}
              >
                Start Over
              </Button>
            </p>
          </div>
        )}
        {currentStep === 0 && mannys !== undefined && mannys.length > 0 && (
          <StepOne
            chosenManny={chosenManny}
            setChosenManny={setChosenManny}
            mannys={mannys}
            label="1 of 2"
            jobType="remove"
          />
        )}
        {currentStep === 1 && (
          <StepFour
            account={account}
            chosenManny={chosenManny}
            onTattooSubmit={onTattooSubmit}
            label="2 of 2"
            jobType="remove"
          />
        )}
      </div>
      <StepControls
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        chosenManny={chosenManny}
        setJobType={setJobType}
        jobType="remove"
      />
    </>
  );
};

export default TattooRemove;
