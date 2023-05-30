import { ConnectKitButton } from 'connectkit';

export default function WalletConnect() {
  return (
    <div className="w-full h-auto overflow-y-auto p-8">
      <div className="mx-auto relative h-[96px] w-[490px]">
        <span className="bg-green absolute w-full top-[-20px] h-[6px]" />
        <span
          className="absolute inset-0 bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(/misc/mannystattoos.svg)` }}
        />
      </div>
      <p className="mx-auto text-center text-white max-w-[680px]">
        Connect your wallet and upload your own desired art. <br />
        Please allow up to a week for tattoo metadata to update.
      </p>
      <p className="text-lg mt-4 text-center">
        <span className="border border-white">
          <ConnectKitButton />
        </span>
      </p>
    </div>
  );
}
