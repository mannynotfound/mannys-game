import { Suspense, useState } from 'react';
import { useSignMessage, useSigner } from 'wagmi';

import IntroScene from 'pages/tattoo-shop/IntroScene';
import TattooAdd from 'pages/tattoo-shop/TattooAdd';
import TattooRemove from 'pages/tattoo-shop/TattooRemove';
import TattooParty from 'pages/tattoo-shop/TattooParty';
import { Page, Button } from 'components';

const TattooShop = (props) => {
  const [jobType, setJobType] = useState(null);
  const { signMessageAsync } = useSignMessage();
  const { data: signer } = useSigner();

  if (jobType === 'add') {
    return (
      <TattooAdd
        {...props}
        signMessage={signMessageAsync}
        signer={signer}
        setJobType={setJobType}
      />
    );
  }
  if (jobType === 'remove') {
    return (
      <TattooRemove
        {...props}
        signMessage={signMessageAsync}
        signer={signer}
        setJobType={setJobType}
      />
    );
  }
  if (jobType === 'party') {
    return (
      <TattooParty
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
          <IntroScene />
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
        <div className="z-40 flex justify-center text-2xl mt-4 relative">
          <Button
            className="party-btn"
            large
            onClick={() => setJobType('party')}
          >
            PARTY TAT
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
