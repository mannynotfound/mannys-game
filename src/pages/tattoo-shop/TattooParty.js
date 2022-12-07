import { useState } from 'react';
import StepControls from 'pages/tattoo-shop/StepControls';
import WalletConnect from 'pages/tattoo-shop/WalletConnect';
import NoParty from 'pages/tattoo-shop/NoParty';
import { StepTwo, StepThree, StepFour } from 'pages/tattoo-shop/Steps';
import useHasParty from 'pages/tattoo-shop/useHasParty';
import { Page, Button } from 'components';

const TattooParty = ({
  provider,
  account,
  mannys,
  setJobType,
  signMessage,
  signer,
}) => {
  const [ownerSignature, setOwnerSignature] = useState(null);
  const [chosenManny, setChosenManny] = useState(84);
  const [isUploadingTattoo, setIsUploadingTattoo] = useState(false);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [submitResponse, setSubmitResponse] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadFile, setUploadFile] = useState(null);
  const [tattooPosition, setTattooPosition] = useState(null);
  const hasPartyNft = useHasParty(provider, account?.address);

  if (account.isConnecting) {
    return null;
  }

  if (!account.isConnecting && !account?.address) {
    return <WalletConnect />;
  }

  if (!account.isConnecting && !hasPartyNft) {
    return <NoParty />;
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

  const onTattooUpload = async (signature) => {
    setIsUploadingTattoo(true);
    const data = new FormData();
    data.append('file', uploadFile);
    data.append('token', 84);
    data.append('sig', signature);
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
    data.append('token', 84);
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
        {isUploadingTattoo && currentStep === 1 && (
          <div className="flex flex-wrap justify-center">
            <p className="text-lg text-white mt-4">Uploading tattoo...</p>
          </div>
        )}
        {isUploadingTattoo && currentStep === 2 && (
          <div className="flex flex-wrap justify-center">
            <p className="text-lg text-white mt-4">Submitting party tat...</p>
          </div>
        )}
        {!isUploadingTattoo && submitResponse && (
          <div
            className={`TattooShop-response max-w-md mx-auto ${
              submitResponse.type === 'success' ? 'text-green' : 'text-red'
            } flex flex-wrap justify-center flex-col`}
          >
            <img
              alt="party kazoo"
              src="https://partyprod.nyc3.digitaloceanspaces.com/homepage/kazoo-home.png"
            />
            <div className="border-t border-b border-green">
              <p className="text-lg mt-4 text-center">
                {submitResponse.message}
              </p>
              <p className="text-lg my-4 text-center">
                The final party tattoo manny will reveal 12/12.
              </p>
            </div>
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
                  setCurrentStep(1);
                }}
              >
                Start Over
              </Button>
            </p>
          </div>
        )}
        {currentStep === 1 && !isUploadingTattoo && (
          <StepTwo onFileChange={onFileChange} label="1 of 3" jobType="party" />
        )}
        {currentStep === 2 &&
          !isUploadingTattoo &&
          uploadResponse?.textureUrl && (
            <StepThree
              {...stepProps}
              uploadResponse={uploadResponse}
              setTattooPosition={setTattooPosition}
              label="2 of 3"
              jobType="party"
            />
          )}
        {currentStep === 3 && (
          <StepFour {...stepProps} label="3 of 3" jobType="party" />
        )}
      </div>
      <StepControls {...stepProps} jobType="party" />
    </Page>
  );
};

export default TattooParty;
