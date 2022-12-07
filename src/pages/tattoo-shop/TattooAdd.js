import { useState } from 'react';
import StepControls from 'pages/tattoo-shop/StepControls';
import WalletConnect from 'pages/tattoo-shop/WalletConnect';
import NoMannys from 'pages/tattoo-shop/NoMannys';
import { StepOne, StepTwo, StepThree, StepFour } from 'pages/tattoo-shop/Steps';
import { Page, Button } from 'components';

const TattooAdd = ({ account, mannys, setJobType, signMessage, signer }) => {
  const [ownerSignature, setOwnerSignature] = useState(null);
  const [chosenManny, setChosenManny] = useState(null);
  const [isUploadingTattoo, setIsUploadingTattoo] = useState(false);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [submitResponse, setSubmitResponse] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadFile, setUploadFile] = useState(null);
  const [tattooPosition, setTattooPosition] = useState(null);

  if (account.isConnecting) {
    return null;
  }

  if (!account.isConnecting && !account?.address) {
    return <WalletConnect />;
  }

  if (!account.isConnecting && Array.isArray(mannys) && !mannys.length) {
    return <NoMannys />;
  }

  const onFileChange = async (event) => {
    // validate
    const file = event.target.files[0];
    const fileSize = file.size / 1024 / 1024;
    if (fileSize > 1) {
      alert('File must be under 1mb.');
      return;
    }
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      alert('File must be a valid PNG or JPG...');
      return;
    }
    if (file) {
      setUploadFile(file);
    }
  };

  const onTattooUpload = async (sig) => {
    setIsUploadingTattoo(true);
    const data = new FormData();
    data.append('file', uploadFile);
    data.append('token', chosenManny);
    data.append('sig', sig);
    data.append('path', uploadFile.name);

    const fetchUrl = window.location.host.includes('localhost')
      ? 'http://localhost:3001'
      : 'https://mannys-game-server.herokuapp.com';
    fetch(`${fetchUrl}/api/tattoo-shop/upload`, {
      method: 'POST',
      mode: 'cors',
      body: data,
    })
      .then(async (resp) => {
        const respJson = await resp.json();
        return {
          status: resp.status,
          ...respJson,
        };
      })
      .then((json) => {
        setUploadResponse({
          type: json.status === 200 ? 'success' : 'failure',
          message: json.message,
          textureUrl: json.textureUrl,
        });
        setIsUploadingTattoo(false);
        if (json.status === 200) {
          // set tatoo placement step
          setCurrentStep(2);
        }
      })
      .catch((error) => {
        setSubmitResponse({
          type: 'failure',
          message: String(error),
        });
        setIsUploadingTattoo(false);
      });
  };

  const onTattooSubmit = async (voucherCode) => {
    setIsUploadingTattoo(true);
    const data = new FormData();
    data.append('token', chosenManny);
    data.append('sig', ownerSignature);
    data.append('textureUrl', uploadResponse.textureUrl);
    data.append('coordinates', JSON.stringify(tattooPosition));
    if (voucherCode) {
      data.append('code', voucherCode);
    }

    const fetchUrl = window.location.host.includes('localhost')
      ? 'http://localhost:3001'
      : 'https://mannys-game-server.herokuapp.com';
    fetch(`${fetchUrl}/api/tattoo-shop/submit`, {
      method: 'POST',
      mode: 'cors',
      body: data,
    })
      .then(async (resp) => {
        const respJson = await resp.json();
        return {
          status: resp.status,
          ...respJson,
        };
      })
      .then((json) => {
        let type = json.status === 200 ? 'success' : 'failure';
        if (json.message?.includes('smh')) type = 'failure';
        setSubmitResponse({
          type,
          message: json.message,
          textureUrl: json.textureUrl,
        });
        setIsUploadingTattoo(false);
        if (json.status === 200) {
          // set tatoo placement step
          setCurrentStep(-1);
        }
      })
      .catch((error) => {
        setSubmitResponse({
          type: 'failure',
          message: String(error),
        });
        setIsUploadingTattoo(false);
      });
  };

  const stepProps = {
    account,
    mannys,
    chosenManny,
    uploadFile,
    setChosenManny,
    setCurrentStep,
    currentStep,
    ownerSignature,
    setOwnerSignature,
    onTattooSubmit,
    onTattooUpload,
    tattooPosition,
    setJobType,
    signMessage,
    signer,
  };

  return (
    <Page className="relative z-10">
      <div className="h-full pb-10">
        {isUploadingTattoo && chosenManny && currentStep === 1 && (
          <div className="flex flex-wrap justify-center">
            <p className="text-lg mt-4">
              Uploading tattoo for #{chosenManny}...
            </p>
          </div>
        )}
        {isUploadingTattoo && chosenManny && currentStep === 2 && (
          <div className="flex flex-wrap justify-center">
            <p className="text-lg mt-4">
              Submitting tattoo for #{chosenManny}...
            </p>
          </div>
        )}
        {!isUploadingTattoo && submitResponse && (
          <div
            className={`TattooShop-response ${
              submitResponse.type === 'success' ? 'text-green' : 'text-red'
            } flex flex-wrap justify-center flex-col`}
          >
            <p className="text-lg mt-4 text-center">{submitResponse.message}</p>
            <p className="text-center mt-4">
              <Button
                className="text-2xl font-bold leading-10 uppercase px-4"
                color={submitResponse.type === 'failure' ? 'red' : 'green'}
                large
                onClick={() => {
                  setUploadResponse(null);
                  setSubmitResponse(null);
                  setTattooPosition(null);
                  setUploadFile(null);
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
          <StepOne {...stepProps} label="1 of 4" jobType="add" />
        )}
        {currentStep === 1 && !isUploadingTattoo && (
          <StepTwo onFileChange={onFileChange} label="2 of 4" jobType="add" />
        )}
        {currentStep === 2 &&
          !isUploadingTattoo &&
          uploadResponse?.textureUrl && (
            <StepThree
              {...stepProps}
              uploadResponse={uploadResponse}
              setTattooPosition={setTattooPosition}
              label="3 of 4"
              jobType="add"
            />
          )}
        {currentStep === 3 && (
          <StepFour {...stepProps} label="4 of 4" jobType="add" />
        )}
      </div>
      <StepControls {...stepProps} jobType="add" />
    </Page>
  );
};

export default TattooAdd;
