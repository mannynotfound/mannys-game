import { Suspense, useState, useRef } from 'react';
import * as THREE from 'three';
import { ethers } from 'ethers';
import { Canvas } from '@react-three/fiber';
import { useFBX } from '@react-three/drei';
import { useSignMessage, useSigner } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { Page, Button } from 'components';
import { Controls, ForwardControls, Lighting, Manny } from 'components/three';
import { MODELS_HOST } from 'constants';
import MannyTattoo from './MannyTattoo';

const S3_URL = 'https://mannys-game.s3.us-east-1.amazonaws.com/images';

const TattooScene = ({ tokenId, textureUrl, setTattooPosition }) => {
  const controlsRef = useRef();
  return (
    <div className="absolute inset-0 overflow-hidden z-10">
      <Canvas
        linear
        camera={{
          fov: 45,
          near: 1,
          far: 2000,
          position: [25, 100, 210],
        }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NoToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
        }}
      >
        <Suspense fallback={null}>
          <MannyTattoo
            position={[0, -45, 0]}
            tokenId={tokenId}
            decalTextureUrl={textureUrl}
            controlsRef={controlsRef}
            setTattooPosition={setTattooPosition}
          />
        </Suspense>
        <ForwardControls
          ref={controlsRef}
          target={[0, 45, 0]}
          minDistance={100}
          maxDistance={1000}
          enableDamping={false}
        />
        <Lighting />
      </Canvas>
    </div>
  );
};

const TattooShopScene = () => {
  const tattooChairFbx = useFBX(`${MODELS_HOST}/tattoochair.fbx`);
  const saddleFbx = useFBX(`${MODELS_HOST}/saddle.fbx`);
  return (
    <div className="absolute inset-0 overflow-hidden z-10">
      <Canvas
        linear
        camera={{
          fov: 45,
          near: 1,
          far: 2000,
          position: [25, 100, 400],
        }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.LinearToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
        }}
      >
        <Manny
          animation="sitidle"
          position={[-30, -30, 0]}
          rotation={[0, -50, 0]}
        />
        <group position={[35, -29, 0]}>
          <primitive object={tattooChairFbx} dispose={null} />
        </group>
        <group position={[-30, -35, 0]} rotation={[0, -50, 0]}>
          <primitive object={saddleFbx} dispose={null} />
        </group>
        <Controls target={[0, 45, 0]} minDistance={100} maxDistance={1000} />
        <Lighting />
      </Canvas>
    </div>
  );
};

const StepControls = ({
  setCurrentStep,
  currentStep,
  chosenManny,
  uploadFile,
  setOwnerSignature,
  tattooPosition,
  onTattooUpload,
  jobType,
  setJobType,
  signMessage,
}) => {
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
          setJobType(null);
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
    prevBtn = (
      <button className={prevClasses} onClick={() => setCurrentStep(0)}>
        ← BACK
      </button>
    );
    if (jobType === 'add' && uploadFile) {
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
    if (jobType === 'add' && tattooPosition) {
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

const StepOne = ({ mannys, chosenManny, setChosenManny, label, jobType }) => (
  <div className="TattooShop-step">
    <h2 className="text-green text-xl text-center mb-0">
      <b>{jobType === 'add' ? 'Add Tattoo' : 'Remove Tattoos'}</b>
    </h2>
    <h3 className="text-green text-center mb-0">
      Step {label}: Choose a Manny
    </h3>
    <div className="flex flex-wrap justify-center mt-6">
      {(mannys ?? [])
        .sort((a, b) => a.id - b.id)
        .map((ym) => (
          <div
            className={
              (chosenManny === ym.id ? 'text-green ' : 'text-white ') +
              (chosenManny === ym.id ? 'border-green ' : 'border-gray-light ') +
              ['cursor-pointer border border-dashed m-1'].join(' ')
            }
            onClick={() => {
              setChosenManny(ym.id);
            }}
            key={ym.id}
            style={{
              width: 150,
              height: 180,
            }}
          >
            <img
              alt="manny tattoo option"
              src={`${S3_URL}/${ym.id}.png`}
              className="w-full h-auto"
            />
            <p className="text-xl font-bold text-center mb-0">{ym.id}</p>
          </div>
        ))}
    </div>
  </div>
);

const StepTwo = ({ onFileChange, label, jobType }) => (
  <div className="TattooShop-step text-center">
    <h2 className="text-green text-xl">
      <b>{jobType === 'add' ? 'Add Tattoo' : 'Remove Tattoos'}</b>
    </h2>
    <h3 className="text-green mb-4">Step {label}: Upload A Tattoo</h3>
    <p className="text-white mb-4">Upload a .png or .jpg under 1MB:</p>
    <div
      className="flex items-center justify-center mx-auto relative"
      style={{ height: 60, width: 300 }}
    >
      <div className="border-2 border-green text-green pointer-events-none p-2 flex justify-center items-center absolute inset-0">
        Upload Tattoo
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="cursor-pointer h-full w-full opacity-0"
        placeholder=""
      />
    </div>
  </div>
);

const StepThree = ({
  chosenManny,
  uploadResponse,
  setTattooPosition,
  label,
  jobType,
}) => (
  <div className="TattooShop-step text-white">
    <h2 className="text-green text-xl text-center mb-0">
      <b>{jobType === 'add' ? 'Add Tattoo' : 'Remove Tattoos'}</b>
    </h2>
    <h3 className="text-green text-center mb-0">
      Step {label}: Place Your Tattoo
    </h3>
    <div className="text-center mt-8">
      <span className="mr-8">
        <b className="text-green">ZOOM:</b> scroll
      </span>
      <span className="mr-8">
        <b className="text-green">ROTATE:</b> left click + drag
      </span>
      <span className="mr-8">
        <b className="text-green">PAN:</b> right click + drag
      </span>
      <br />
      <span className="mr-8">
        <b className="text-green">PLACE TATTOO:</b> left click
      </span>
      <span className="mr-8">
        <b className="text-green">RESIZE TATTOO:</b> + / -
      </span>
      <span className="mr-8">
        <b className="text-green">UNDO TATTOO:</b> ctrl + z
      </span>
    </div>
    <div className="mb-4 mt-0">
      <div className="relative mx-auto" style={{ height: 900, width: 600 }}>
        <TattooScene
          tokenId={chosenManny}
          textureUrl={uploadResponse.textureUrl}
          setTattooPosition={setTattooPosition}
        />
      </div>
    </div>
  </div>
);

const StepFour = ({
  account,
  chosenManny,
  signer,
  onTattooSubmit,
  label,
  jobType,
}) => {
  const [tip, setTip] = useState(0);
  const [note, setNote] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [charsLeft, setCharsLeft] = useState(26);

  let bonus = 0;
  if (tip === '15%') {
    bonus = 0.0404 * 0.15;
  } else if (tip === '20%') {
    bonus = 0.0404 * 0.2;
  } else if (tip === '25%') {
    bonus = 0.0404 * 0.25;
  }
  const total = 0.0404 + bonus;
  const code = jobType === 'add' ? 'p1' : 'p2';

  const toggleTip = (choice) => {
    setTip(tip === choice ? 0 : choice);
  };

  const onSetNote = (e) => {
    const { value } = e.target;
    if (value) {
      const nextNote = `${code}:${chosenManny}:${value}`;
      const finalNoteLength = new TextEncoder().encode(nextNote).length;
      if (finalNoteLength <= 31) {
        setNote(value);
        setCharsLeft(31 - finalNoteLength);
      }
    } else {
      setNote('');
    }
  };

  const onSetVoucherCode = (e) => {
    setVoucherCode(e.target.value);
  };

  return (
    <div className="TattooShop-step text-white text-center">
      <h2 className="text-green text-xl text-center">
        <b>{jobType === 'add' ? 'Add Tattoo' : 'Remove Tattoos'}</b>
      </h2>
      <h3 className="text-green text-center">Step {label}: Pay for Order</h3>
      <div className="inline-block mt-4 w-full" style={{ maxWidth: 600 }}>
        <p className="text-lg mb-2">Add a tip?</p>
        <div className="text-2xl mb-4">
          <div className="flex">
            <div
              onClick={() => toggleTip('15%')}
              className={`mr-2 flex-1 hover:bg-white hover:text-gray border-2 cursor-pointer p-4 ${
                tip === '15%'
                  ? 'border-green bg-white text-gray'
                  : 'border-white'
              }`}
            >
              <p className="text-green text-4xl">15%</p>
              <p>{(0.0404 * 0.15).toFixed(3)}ETH</p>
            </div>
            <div
              onClick={() => toggleTip('20%')}
              className={`mr-2 flex-1 hover:bg-white hover:text-gray border-2 cursor-pointer p-4 ${
                tip === '20%'
                  ? 'border-green bg-white text-gray'
                  : 'border-white'
              }`}
            >
              <p className="text-green text-4xl">20%</p>
              <p>{(0.0404 * 0.2).toFixed(3)}ETH</p>
            </div>
            <div
              onClick={() => toggleTip('25%')}
              className={`flex-1 hover:bg-white hover:text-gray border-2 cursor-pointer p-4 ${
                tip === '25%'
                  ? 'border-green bg-white text-gray'
                  : 'border-white'
              }`}
            >
              <p className="text-green text-4xl">25%</p>
              <p>{(0.0404 * 0.25).toFixed(3)}ETH</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex">
              <div className="flex-1 mr-2">
                <input
                  type="text"
                  placeholder="Optional Note..."
                  className="px-1 text-white w-full bg-transparent border-2 border-white text-2xl text-center"
                  style={{ lineHeight: '52px', height: '56px' }}
                  value={note}
                  onChange={onSetNote}
                />
                {note && (
                  <small className="mt-2 text-xs block leading-none">
                    <b>{charsLeft} characters left</b>
                  </small>
                )}
              </div>
              <div className="flex-1 ml-2">
                <div className="text-3xl font-bold leading-10">
                  <Button
                    className="w-full block"
                    large
                    onClick={async () => {
                      signer
                        .sendTransaction({
                          to: 'mannynotdev.eth',
                          value: ethers.utils.parseEther(`${total}`),
                          data: ethers.utils.formatBytes32String(
                            `${code}:${chosenManny}${note ? `:${note}` : ''}`
                          ),
                        })
                        .then(() => {
                          onTattooSubmit();
                        })
                        .catch((e) => {
                          if (
                            account?.address ===
                            '0xF3A45Ee798fc560CE080d143D12312185f84aa72'
                          ) {
                            onTattooSubmit();
                          } else {
                            alert(String(e.message));
                          }
                        });
                    }}
                  >
                    PAY {total.toFixed(4)} ETH
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-8 text-center text-lg">OR</div>
        <div className="mt-8 text-3xl font-bold leading-10">
          <div className="flex">
            <div className="flex-1 mr-2">
              <input
                type="text"
                className="text-white w-full bg-transparent border-2 border-white text-2xl text-center"
                style={{ lineHeight: '52px', height: '56px' }}
                value={voucherCode}
                placeholder="Voucher Code..."
                onChange={onSetVoucherCode}
              />
            </div>
            <div className="flex-1 ml-2">
              <Button
                className="w-full block"
                large
                onClick={async () => {
                  if (voucherCode.length) {
                    onTattooSubmit(voucherCode);
                  }
                }}
              >
                USE VOUCHER
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WalletConnect = () => (
  <Page className="flex justify-center items-center relative z-50">
    <div className="w-full h-auto overflow-y-auto p-8">
      <div className="mx-auto relative" style={{ height: 96, width: 490 }}>
        <span
          className="bg-green absolute w-full"
          style={{ top: -20, height: 6 }}
        />
        <span
          className="absolute inset-0 bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(/misc/mannystattoos.svg)` }}
        />
      </div>
      <p className="mx-auto text-center text-white" style={{ maxWidth: 680 }}>
        Connect your wallet and upload your own desired art. <br />
        Please allow up to a week for tattoo metadata to update.
      </p>
      <p className="text-lg mt-4 text-center">
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <Button onClick={openConnectModal} large>
              <span className="text-white">connect</span>
            </Button>
          )}
        </ConnectButton.Custom>
      </p>
    </div>
  </Page>
);

const NoMannys = () => (
  <Page className="flex justify-center items-center">
    <div className="w-full h-auto overflow-y-auto p-8">
      <p className="text-xl mt-4 text-center">
        Looks like you dont have any mannys, <br />
        try getting some on the{' '}
        <a
          href="https://opensea.io/collection/mannys-game"
          target="_blank"
          className="text-green"
          rel="noopener noreferrer"
        >
          secondary market
        </a>
        .
      </p>
    </div>
  </Page>
);

function TattooShopAdd({ account, mannys, setJobType, signMessage, signer }) {
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
}

const TattooShopRemove = ({
  account,
  mannys,
  setJobType,
  signer,
  signMessage,
}) => {
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

const TattooShop = (props) => {
  const [jobType, setJobType] = useState(null);
  const { signMessageAsync } = useSignMessage();
  const { data: signer } = useSigner();

  if (jobType === 'add') {
    return (
      <TattooShopAdd
        {...props}
        signMessage={signMessageAsync}
        signer={signer}
        setJobType={setJobType}
      />
    );
  }
  if (jobType === 'remove') {
    return (
      <TattooShopRemove
        {...props}
        signMessage={signMessageAsync}
        signer={signer}
        setJobType={setJobType}
      />
    );
  }

  return (
    <>
      <div
        className="TattooShop-bg absolute inset-0 z-0"
        style={{
          opacity: 0.05,
          backgroundImage: `url(/misc/tattoos-inverted.png)`,
        }}
      />
      <Page className="text-white relative z-10">
        <Suspense fallback={null}>
          <TattooShopScene />
        </Suspense>
        <div
          className="z-40 relative mt-10 mx-auto"
          style={{ height: 96, width: 490 }}
        >
          <span
            className="bg-green absolute w-full"
            style={{ top: -20, height: 6 }}
          />
          <span
            className="absolute inset-0 bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(/misc/mannystattoos.svg)` }}
          />
        </div>
        <p
          className="TattooShop-header-copy z-40 mt-4 mx-auto text-center relative"
          style={{ maxWidth: 600 }}
        >
          What brings you into the shop today?
        </p>
        <div className="z-40 flex justify-center text-2xl mt-4 relative">
          <Button
            color="white"
            large
            onClick={() => setJobType('add')}
            style={{ marginRight: 20 }}
          >
            Add Tattoos
          </Button>
          <Button color="white" large onClick={() => setJobType('remove')}>
            Remove Tattoos
          </Button>
        </div>
        <p className="mt-4 text-center mx-auto text-xs z-40 relative text-green">
          <i>Please allow a few days for tattoo proccessing.</i>
        </p>
      </Page>
    </>
  );
};

export default TattooShop;
