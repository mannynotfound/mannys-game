import { useState } from 'react';
import b64ToBlob from 'b64-to-blob';
import { ConnectKitButton } from 'connectkit';
import fileSaver from 'file-saver';
import { twMerge } from 'tailwind-merge';
import { useSignMessage } from 'wagmi';
import { API_URL } from '@/utils/constants';
import { Account, Token } from '@/utils/types';

const WalletConnect = () => (
  <div className="flex items-center relative z-50 pb-10">
    <p className="text-xl max-w-[680px]">
      Connect your wallet see if you have any mannys...
      <span className="border border-white">
        <ConnectKitButton />
      </span>
    </p>
  </div>
);

const NoMannys = () => (
  <div className="flex pb-10">
    <p className="text-xl">
      Looks like you dont have any mannys, try getting some on the{' '}
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
);

const S3_URL = 'https://mannys-game.s3.us-east-1.amazonaws.com/images';

type Props = {
  account: Account;
  mannys: Token[] | undefined;
};

export default function DownloadToken({ account, mannys }: Props) {
  const [downloading, setDownloading] = useState(false);

  const { signMessageAsync } = useSignMessage();
  const hasntFetchedMannys =
    account.address !== undefined && mannys === undefined;

  if (account.isConnecting || hasntFetchedMannys) {
    return null;
  }

  if (!account.isConnecting && !account.address) {
    return <WalletConnect />;
  }

  if (!account.isConnecting && mannys !== undefined && !mannys.length) {
    return <NoMannys />;
  }

  const onRequestToken = async (tokenId: number) => {
    if (downloading) return;

    setDownloading(true);
    const signature = await signMessageAsync({
      message: `Downloading token for manny #${tokenId}`,
    }).catch(console.error);

    if (!signature) {
      alert('Invalid Signature');
    }

    fetch(`${API_URL}/download/token/${tokenId}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sig: signature,
        token: tokenId,
      }),
    })
      .then((resp) => resp.text())
      .then((zipAsBase64) => {
        const blob = b64ToBlob(zipAsBase64, 'application/zip');
        fileSaver.saveAs(blob, `manny-${tokenId}.zip`);
        setDownloading(false);
      })
      .catch((error) => {
        alert(error);
        setDownloading(false);
      });
  };

  return (
    <div className="px-8">
      <h2 className="text-4xl text-green mt-10 mb-5">Download Your Manny</h2>
      <div className="flex flex-wrap mt-6 pb-10">
        {(mannys ?? [])
          .sort((a, b) => a.tokenId - b.tokenId)
          .map((ym) => (
            <div
              className={twMerge(
                'cursor-pointer m-1 w-[150px] h-[180px]',
                'hover:border-green border-gray-light border-dashed'
              )}
              onClick={() => {
                onRequestToken(ym.tokenId);
              }}
              key={ym.tokenId}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="manny token option"
                src={`${S3_URL}/${ym.tokenId}.png`}
                className="w-full h-auto"
              />
              <p className="text-xl font-bold text-center mb-0">{ym.tokenId}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
