import { useState } from 'react';
import Button from '@/components/Button';
import { AppProps } from '@/utils/types';
import IntroScene from '@/views/tattoo-shop/IntroScene';
import TattooAdd from '@/views/tattoo-shop/TattooAdd';
import TattooRemove from '@/views/tattoo-shop/TattooRemove';

const TattooShop = ({ web3, mannys }: AppProps) => {
  const [jobType, setJobType] = useState('');

  if (jobType === 'add') {
    return (
      <TattooAdd
        account={web3.account}
        mannys={mannys}
        setJobType={setJobType}
      />
    );
  }
  if (jobType === 'remove') {
    return (
      <TattooRemove
        account={web3.account}
        mannys={mannys}
        setJobType={setJobType}
      />
    );
  }

  return (
    <>
      <div
        className="TattooShop-bg absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url(/misc/tattoos-inverted.png)`,
        }}
      />
      <IntroScene />
      <div className="z-40 relative mt-10 mx-auto h-[96px] w-[490px]">
        <span className="bg-green absolute w-full top-[-20px] h-[6px]" />
        <span
          className="absolute inset-0 bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(/misc/mannystattoos.svg)` }}
        />
      </div>
      <p className="TattooShop-header-copy z-40 mt-4 mx-auto text-center relative max-w-[600px]">
        What brings you into the shop today?
      </p>
      <div className="z-40 flex justify-center text-2xl mt-4 relative gap-x-4">
        <Button
          className="py-[6px] px-[18px]"
          color="white"
          onClick={() => setJobType('add')}
        >
          Add Tattoos
        </Button>
        <Button
          className="py-[6px] px-[18px]"
          color="white"
          onClick={() => setJobType('remove')}
        >
          Remove Tattoos
        </Button>
      </div>
      <p className="mt-4 text-center mx-auto text-xs z-40 relative text-green">
        <i>Please allow a few days for tattoo proccessing.</i>
      </p>
    </>
  );
};

export default TattooShop;
