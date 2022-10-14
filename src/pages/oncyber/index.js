import { useState } from 'react';
import { ConnectKitButton } from 'connectkit';
import { useSignMessage } from 'wagmi';
import b64ToBlob from 'b64-to-blob';
import fileSaver from 'file-saver';

import { Button } from 'components';

const NoMannys = () => (
  <p className="mt-4">
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
    <p className="mt-4">Connect your wallet see if you have any mannys:</p>
    <p className="mt-4 text-center">
      <ConnectKitButton.Custom>
        {({ show }) => (
          <Button onClick={show} large>
            <span className="text-white">connect</span>
          </Button>
        )}
      </ConnectKitButton.Custom>
    </p>
  </>
);

const DownloadModel = ({ account, mannys }) => {
  const [downloading, setDownloading] = useState(false);
  const { signMessageAsync } = useSignMessage();

  const noAccount = !account.isConnecting && !account?.address;
  const noMannys =
    !account.isConnecting && Array.isArray(mannys) && !mannys.length;

  const onRequestModel = async () => {
    if (downloading) return;

    setDownloading(true);
    const signature = await signMessageAsync({
      message: 'Downloading mannys.game OnCyber space',
    }).catch(console.error);

    if (!signature) {
      alert('Invalid Signature');
    }

    const fetchUrl = window.location.host.includes('localhost')
      ? 'http://localhost:3001'
      : 'https://mannys-game-server.herokuapp.com';

    fetch(`${fetchUrl}/api/download/oncyber`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sig: signature,
      }),
    })
      .then((resp) => resp.text())
      .then((modelAsBase64) => {
        const blob = b64ToBlob(modelAsBase64);
        fileSaver.saveAs(blob, 'mannys_game_oncyber.glb');
        setDownloading(false);
      })
      .catch((error) => {
        alert(error);
        setDownloading(false);
      });
  };

  return (
    <div
      className="mx-auto max-w-xl text-white flex items-center relative z-50"
      style={{
        paddingTop: 80,
        minHeight: 'calc(100vh - 80px)',
      }}
    >
      <div
        className="p-8 rounded-xl"
        style={{
          background: 'rgba(0, 0, 0, 0.85)',
        }}
      >
        <div className="flex items-center justify-center mb-10">
          <img
            style={{ height: 80, width: 'auto' }}
            className="mr-4"
            alt="mannys game logo"
            src="/logo.png"
          />{' '}
          <span className="text-3xl opacity-50">X</span>{' '}
          <img
            className="ml-4"
            style={{ height: 70, width: 'auto' }}
            alt="oncyber logo"
            src="/logos/oncyber.png"
          />
        </div>
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
        <p className="mt-4">
          Thanks to support from the OnCyber team, you can now import your
          mannys as a 3D object into your cyber worlds. Place a manny in the
          middle of your conversation pit and fill the rest of the space's 26
          display slots with NFTs of your choice.
        </p>
        {noMannys && <NoMannys />}
        {noAccount && <WalletConnect />}
        {!noAccount && !noMannys && (
          <>
            <p className="mt-4">
              Click the button below to verify ownership of a manny and download
              your own copy of manny's gamer gallery to use with OnCyber's{' '}
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
            <div className="flex items-center justify-center mt-10">
              <Button onClick={onRequestModel} large>
                <span className="text-white">Download Now</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const OnCyber = (props) => (
  <>
    <div className="fixed inset-0 z-0 flex items-center">
      <video src="/videos/oncyberslideshow.mp4" autoPlay muted loop />
    </div>
    <DownloadModel {...props} />
  </>
);

export default OnCyber;
