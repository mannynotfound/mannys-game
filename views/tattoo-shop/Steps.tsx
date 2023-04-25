import { ChangeEvent, Dispatch, useState } from 'react';
import { parseEther, stringToHex } from 'viem';
import { useWalletClient } from 'wagmi';
import Button from '@/components/Button';
import { Account, Token } from '@/utils/types';
import TattooEditor from '@/views/tattoo-shop/TattooEditor';
import { TattooCoordinates } from '@/views/tattoo-shop/types';

const S3_URL = 'https://mannys-game.s3.us-east-1.amazonaws.com/images';

const getTitle = (jobType: string) => {
  switch (jobType) {
    case 'add':
      return 'Add Tattoo';
    case 'remove':
      return 'Remove Tattoo';
    default:
      return '';
  }
};

type StepProps = {
  label: string;
  jobType: string;
};

type StepOneProps = StepProps & {
  chosenManny?: number;
  setChosenManny: Dispatch<number | undefined>;
  mannys: Token[];
};

export const StepOne = ({
  mannys,
  chosenManny,
  setChosenManny,
  label,
  jobType,
}: StepOneProps) => (
  <div className="TattooShop-step">
    <h2 className="text-green text-xl text-center mb-0">
      <b>{getTitle(jobType)}</b>
    </h2>
    <h3 className="text-green text-center mb-0">
      Step {label}: Choose a Manny
    </h3>
    <div className="flex flex-wrap justify-center mt-6">
      {(mannys ?? [])
        .sort((a, b) => a.tokenId - b.tokenId)
        .map((ym) => (
          <div
            className={
              (chosenManny === ym.tokenId ? 'text-green ' : 'text-white ') +
              (chosenManny === ym.tokenId
                ? 'border-green '
                : 'border-gray-light ') +
              [
                'cursor-pointer border border-dashed m-1 w-[150px] h-[180px]',
              ].join(' ')
            }
            onClick={() => {
              setChosenManny(ym.tokenId);
            }}
            key={ym.tokenId}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="manny tattoo option"
              src={`${S3_URL}/${ym.tokenId}.png`}
              className="w-full h-auto"
            />
            <p className="text-xl font-bold text-center mb-0">{ym.tokenId}</p>
          </div>
        ))}
    </div>
  </div>
);

type StepTwoProps = StepProps & {
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const StepTwo = ({ onFileChange, label, jobType }: StepTwoProps) => (
  <div className="TattooShop-step text-center">
    <h2 className="text-green text-xl">
      <b>{getTitle(jobType)}</b>
    </h2>
    <h3 className="text-green mb-4">Step {label}: Upload A Tattoo</h3>
    <p className="text-white mb-4">Upload a .png or .jpg under 1MB:</p>
    <div className="flex items-center justify-center mx-auto relative h-[60px] w-[300px]">
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

type StepThreeProps = StepProps & {
  chosenManny: number;
  textureUrl: string;
  setTattooCoords: Dispatch<TattooCoordinates | undefined>;
  showExisting?: boolean;
};

export const StepThree = ({
  chosenManny,
  textureUrl,
  setTattooCoords,
  label,
  jobType,
  showExisting,
}: StepThreeProps) => (
  <div className="TattooShop-step text-white">
    <h2 className="text-green text-xl text-center mb-0">
      <b>{getTitle(jobType)}</b>
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
      <div className="relative mx-auto h-[900px] w-[600px]">
        <TattooEditor
          showExisting={showExisting}
          tokenId={chosenManny}
          textureUrl={textureUrl}
          setTattooCoords={setTattooCoords}
        />
      </div>
    </div>
  </div>
);

type StepFourProps = StepProps & {
  account: Account;
  chosenManny?: number;
  onTattooSubmit: (voucher?: string) => void;
};

export const StepFour = ({
  account,
  chosenManny,
  onTattooSubmit,
  label,
  jobType,
}: StepFourProps) => {
  const { data: walletClient } = useWalletClient();
  const [tip, setTip] = useState('');
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

  const toggleTip = (choice: string) => {
    setTip(tip === choice ? '' : choice);
  };

  const onSetNote = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
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

  const onSetVoucherCode = (event: ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(event.target.value);
  };

  return (
    <div className="TattooShop-step text-white text-center">
      <h2 className="text-green text-xl text-center">
        <b>{getTitle(jobType)}</b>
      </h2>
      <h3 className="text-green text-center">Step {label}: Pay for Order</h3>
      <div className="inline-block mt-4 w-full max-w-[600px]">
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
                  className="px-1 text-white w-full bg-transparent border-2 border-white text-2xl text-center h-[56px] leading-[52px]"
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
                    className="w-full block py-[6px] px-[18px]"
                    onClick={async () => {
                      if (!walletClient) {
                        alert('Error getting account...');
                        return;
                      }
                      walletClient
                        .sendTransaction({
                          to: '0xEca3B7627DEef983A4D4EEE096B0B33A2D880429',
                          value: parseEther(`${total}`),
                          data: stringToHex(
                            `${code}:${chosenManny}${note ? `:${note}` : ''}`,
                            { size: 32 }
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
                className="text-white w-full bg-transparent border-2 border-white text-2xl text-center leading-[52px] h-[56px]"
                value={voucherCode}
                placeholder="Voucher Code..."
                onChange={onSetVoucherCode}
              />
            </div>
            <div className="flex-1 ml-2">
              <Button
                className="w-full block py-[6px] px-[18px]"
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
