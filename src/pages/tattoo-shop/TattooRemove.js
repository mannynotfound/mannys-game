import { useState } from 'react';
import StepControls from 'pages/tattoo-shop/StepControls';
import WalletConnect from 'pages/tattoo-shop/WalletConnect';
import NoMannys from 'pages/tattoo-shop/NoMannys';
import { StepOne, StepFour } from 'pages/tattoo-shop/Steps';
import { Page, Button } from 'components';

const TattooRemove = ({ account, mannys, setJobType, signer, signMessage }) => {
  const [chosenManny, setChosenManny] = useState(null);
  const [submitResponse, setSubmitResponse] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

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

  const stepProps = {
    mannys,
    chosenManny,
    setChosenManny,
    setCurrentStep,
    currentStep,
    onTattooSubmit,
    setJobType,
    signMessage,
    signer,
  };

  return (
    <Page className="relative z-10">
      <div className="w-full h-auto mt-4">
        {submitResponse && (
          <div
            className={`TattooShop-response ${
              submitResponse.type === 'success' ? 'text-green' : ''
            } flex flex-wrap justify-center flex-col`}
            style={{
              color: submitResponse.type === 'failure' ? 'red' : 'inherit',
            }}
          >
            <p className="text-lg mt-4 text-center">{submitResponse.message}</p>
            <p className="text-center mt-4">
              <Button
                className="text-2xl font-bold leading-10 uppercase px-4"
                color={submitResponse.type === 'failure' ? 'red' : 'green'}
                large
                onClick={() => {
                  setSubmitResponse(null);
                  setChosenManny(null);
                  setCurrentStep(0);
                }}
              >
                Start Over
              </Button>
            </p>
          </div>
        )}
        {currentStep === 0 && (
          <StepOne {...stepProps} label="1 of 2" jobType="remove" />
        )}
        {currentStep === 1 && (
          <StepFour {...stepProps} label="2 of 2" jobType="remove" />
        )}
      </div>
      <StepControls {...stepProps} jobType="remove" />
    </Page>
  );
};

export default TattooRemove;
