import { ChangeEvent, Dispatch, useState } from 'react';
import Button from '@/components/Button';
import { API_URL } from '@/utils/constants';
import { Account, EthAddress, Token } from '@/utils/types';
import NoMannys from '@/views/tattoo-shop/NoMannys';
import StepControls from '@/views/tattoo-shop/StepControls';
import {
  StepFour,
  StepOne,
  StepThree,
  StepTwo,
} from '@/views/tattoo-shop/Steps';
import WalletConnect from '@/views/tattoo-shop/WalletConnect';
import {
  SubmitResponse,
  TattooCoordinates,
  UploadResponse,
} from '@/views/tattoo-shop/types';

type Props = {
  account: Account;
  mannys: Token[] | undefined;
  setJobType: Dispatch<string>;
};

const TattooAdd = ({ account, mannys, setJobType }: Props) => {
  const [ownerSignature, setOwnerSignature] = useState<
    EthAddress | undefined
  >();
  const [chosenManny, setChosenManny] = useState<number>();
  const [isUploadingTattoo, setIsUploadingTattoo] = useState<boolean>(false);
  const [uploadResponse, setUploadResponse] = useState<UploadResponse>();
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [uploadFile, setUploadFile] = useState<File>();
  const [tattooCoords, setTattooCoords] = useState<TattooCoordinates>();

  if (account.isConnecting) {
    return null;
  }

  if (!account.isConnecting && !account?.address) {
    return <WalletConnect />;
  }

  if (!account.isConnecting && mannys !== undefined && !mannys.length) {
    return <NoMannys />;
  }

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    // validate
    if (!event.target.files) {
      return;
    }

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

  const onTattooUpload = async (sig: EthAddress) => {
    if (uploadFile === undefined || chosenManny === undefined) {
      return;
    }

    setIsUploadingTattoo(true);
    const data = new FormData();
    data.append('file', uploadFile);
    data.append('token', chosenManny.toString());
    data.append('sig', String(sig));
    data.append('path', uploadFile.name);

    fetch(`${API_URL}/tattoo-shop/upload`, {
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

  const onTattooSubmit = async (voucherCode?: string) => {
    if (
      chosenManny === undefined ||
      ownerSignature === undefined ||
      uploadResponse === undefined ||
      uploadResponse.textureUrl === undefined
    ) {
      return;
    }
    setIsUploadingTattoo(true);
    const data = new FormData();
    data.append('token', chosenManny.toString());
    data.append('sig', ownerSignature);
    data.append('textureUrl', uploadResponse.textureUrl);
    data.append('coordinates', JSON.stringify(tattooCoords));
    if (voucherCode) {
      data.append('code', voucherCode);
    }

    fetch(`${API_URL}/tattoo-shop/submit`, {
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

  return (
    <>
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
        {!isUploadingTattoo && submitResponse !== undefined && (
          <div
            className={`TattooShop-response ${
              submitResponse.type === 'success' ? 'text-green' : 'text-red'
            } flex flex-wrap justify-center flex-col`}
          >
            <p className="text-lg mt-4 text-center">{submitResponse.message}</p>
            <p className="text-center mt-4">
              <Button
                className="text-2xl font-bold leading-10 uppercase px-4 py-[6px]"
                color={submitResponse.type === 'failure' ? 'red' : 'green'}
                onClick={() => {
                  setUploadResponse(undefined);
                  setSubmitResponse(undefined);
                  setTattooCoords(undefined);
                  setUploadFile(undefined);
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
            label="1 of 4"
            jobType="add"
            mannys={mannys}
            chosenManny={chosenManny}
            setChosenManny={setChosenManny}
          />
        )}
        {currentStep === 1 && !isUploadingTattoo && (
          <StepTwo onFileChange={onFileChange} label="2 of 4" jobType="add" />
        )}
        {currentStep === 2 &&
          !isUploadingTattoo &&
          uploadResponse?.textureUrl &&
          chosenManny !== undefined && (
            <StepThree
              chosenManny={chosenManny}
              textureUrl={uploadResponse.textureUrl}
              setTattooCoords={setTattooCoords}
              showExisting={false}
              label="3 of 4"
              jobType="add"
            />
          )}
        {currentStep === 3 && chosenManny !== undefined && (
          <StepFour
            account={account}
            chosenManny={chosenManny}
            onTattooSubmit={onTattooSubmit}
            label="4 of 4"
            jobType="add"
          />
        )}
      </div>
      <StepControls
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        chosenManny={chosenManny}
        uploadFile={uploadFile}
        setOwnerSignature={setOwnerSignature}
        tattooCoords={tattooCoords}
        onTattooUpload={onTattooUpload}
        setJobType={setJobType}
        jobType="add"
      />
    </>
  );
};

export default TattooAdd;
