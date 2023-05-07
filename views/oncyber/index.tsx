import { useState } from 'react';
import logo from '@/public/logo.png';
import onCyberLogo from '@/public/logos/oncyber.png';
import { ConnectKitButton } from '@jmoxey/connectkit';
import fileSaver from 'file-saver';
import Image from 'next/image';
import { useSignMessage } from 'wagmi';
import Button from '@/components/Button';
import { AWS_BASE } from '@/utils/constants';
import { AppProps } from '@/utils/types';

const NoMannys = () => (
  <p>
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
);

const WalletConnect = () => (
  <>
    <p>Connect your wallet see if you have any mannys:</p>
    <div className="flex justify-center text-yellow">
      <span className="border border-green rounded-lg">
        <ConnectKitButton />
      </span>
    </div>
  </>
);

const DownloadModel = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <p>
        Click the button below to verify ownership of a manny and download your
        own copy of manny's gamer gallery to use with OnCyber's{' '}
        <a
          className="text-yellow underline"
          href="https://oncyber.io/uploader"
          target="_blank"
          rel="noopener noreferrer"
        >
          uploader
        </a>
        .
      </p>
      <div className="flex items-center justify-center mt-2">
        <Button color="white" className="py-[6px] px-[18px]" onClick={onClick}>
          Download Now
        </Button>
      </div>
    </>
  );
};

export default function OnCyber(props: AppProps) {
  const {
    web3: { account },
    mannys,
  } = props;
  const [downloading, setDownloading] = useState(false);
  const { signMessageAsync } = useSignMessage();

  const noAccount = !account.isConnecting && !account.address;
  const noMannys =
    !account.isConnecting && mannys !== undefined && !mannys.length;

  const onRequestModel = async () => {
    if (downloading) return;

    setDownloading(true);
    const signature = await signMessageAsync({
      message: 'Downloading mannys.game OnCyber space',
    }).catch(console.error);

    if (!signature) {
      alert('Invalid Signature');
    }

    fetch(`${AWS_BASE}/oncyber/mannys_game_oncyber.glb`)
      .then((resp) => resp.blob())
      .then((blob) => {
        fileSaver.saveAs(blob, 'mannys_game_oncyber.glb');
        setDownloading(false);
      })
      .catch((error) => {
        alert(error);
        setDownloading(false);
      });
  };

  return (
    <div className="p-8 rounded-xl bg-black bg-opacity-75">
      <div className="flex items-center justify-center mb-10">
        <Image
          className="mr-4 h-[80px] w-auto"
          alt="mannys game logo"
          src={logo}
        />{' '}
        <span className="text-3xl opacity-50">X</span>{' '}
        <Image
          className="ml-4 h-[70px] w-auto"
          alt="oncyber logo"
          src={onCyberLogo}
        />
      </div>
      <div className="flex flex-col gap-y-4">
        <p>
          mannys' gamer gallery is a custom world for the{' '}
          <a
            className="text-yellow underline"
            href="https://oncyber.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            OnCyber
          </a>{' '}
          platform that allows gamers to showcase their NFT collection in a
          natural habitat. The upstairs suite has everything a gamer needs - a
          workstation PC and a mattress on the floor. Downstairs, gamers can
          rinse a bagel in the kitchen, hang work on the walls, or enjoy a
          soylent with guests in the conversation pit.
        </p>
        <p>
          Thanks to support from the OnCyber team, you can now import your
          mannys as a 3D object into your cyber worlds. Place a manny in the
          middle of your conversation pit and fill the rest of the space's 26
          display slots with NFTs of your choice.
        </p>
        {noMannys && <NoMannys />}
        {noAccount && <WalletConnect />}
        {!noAccount && !noMannys && <DownloadModel onClick={onRequestModel} />}
      </div>
    </div>
  );
}
