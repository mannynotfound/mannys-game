import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { twMerge } from 'tailwind-merge';
import { useAppSelector } from '@/views/token/hooks';
import { getTokenProps } from '@/utils';
import { MANNY_TEXTURE_DEFAULT } from '@/utils/constants';
import { AppProps, TokenId } from '@/utils/types';
import Footer from '@/views/token/Footer';
import Scene from '@/views/token/Scene';
import BagTools from '@/views/token/Tools/Bag';
import CameraTools from '@/views/token/Tools/Camera';
import ImageUpload from '@/views/token/Tools/ImageUpload';
import { initialState } from '@/views/token/reducer';
import store, { persistor } from '@/views/token/store';

interface Props extends AppProps {
  tokenId: TokenId;
}

function Token(props: Props) {
  const tokenId = props.tokenId;
  const tokenMatch = getTokenProps(tokenId);
  const textureUrl = tokenMatch?.textureUrl ?? MANNY_TEXTURE_DEFAULT;
  const state = useAppSelector((state) => state.tokens);
  const tokenState = state[tokenId] ?? initialState;

  const {
    camera: { zoomedIn, paused, bgColor },
    bagOpen,
    cameraOpen,
    imageUploadOpen,
    accessories,
    mood,
    textureHD,
  } = tokenState;

  const toolsClasses = 'fixed right-0 bottom-[140px] select-none text-green';

  return (
    <>
      <Scene
        accessories={accessories}
        tokenId={tokenId}
        textureUrl={textureUrl}
        mood={mood}
        bgColor={bgColor}
        paused={paused}
        textureHD={textureHD}
        zoomedIn={zoomedIn}
      />
      <Footer
        account={props.web3.account}
        mannys={props.mannys ?? []}
        tokenId={tokenId}
        zoomedIn={zoomedIn}
        bagOpen={bagOpen}
        cameraOpen={cameraOpen}
      />
      <div className={twMerge(toolsClasses, cameraOpen && 'hidden')}>
        <BagTools
          bagOpen={bagOpen}
          account={props.web3.account}
          tokenId={tokenId}
          accessories={accessories}
        />
      </div>
      <div className={twMerge(toolsClasses, bagOpen && 'hidden')}>
        <CameraTools
          cameraOpen={cameraOpen}
          account={props.web3.account}
          mood={mood}
          bgColor={bgColor}
          zoomedIn={zoomedIn}
          paused={paused}
          textureHD={textureHD}
          tokenId={tokenId}
        />
      </div>
      {imageUploadOpen && <ImageUpload tokenId={tokenId} />}
    </>
  );
}

export default function TokenCheck(props: AppProps & { tokenId: TokenId }) {
  if (props.tokenId === undefined) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Token {...props} />
      </PersistGate>
    </Provider>
  );
}
