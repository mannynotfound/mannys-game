import { ConnectKitButton } from 'connectkit';
import { Page, Button } from 'components';

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
        <ConnectKitButton.Custom>
          {({ show }) => (
            <Button onClick={show} large>
              <span className="text-white">connect</span>
            </Button>
          )}
        </ConnectKitButton.Custom>
      </p>
    </div>
  </Page>
);

export default WalletConnect;
