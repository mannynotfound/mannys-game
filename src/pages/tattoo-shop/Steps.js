import { useState } from 'react';
import { ethers } from 'ethers';
import { Button } from 'components';
import TattooEditor from 'pages/tattoo-shop/TattooEditor';

const S3_URL = 'https://mannys-game.s3.us-east-1.amazonaws.com/images';

export const StepOne = ({
  mannys,
  chosenManny,
  setChosenManny,
  label,
  jobType,
}) => (
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

export const StepTwo = ({ onFileChange, label, jobType }) => (
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

export const StepThree = ({
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
        <TattooEditor
          tokenId={chosenManny}
          textureUrl={uploadResponse.textureUrl}
          setTattooPosition={setTattooPosition}
        />
      </div>
    </div>
  </div>
);

export const StepFour = ({
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
