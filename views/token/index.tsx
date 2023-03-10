import { Provider } from 'react-redux';
import { useAppSelector } from '@/views/token/hooks';
import { initialState } from '@/views/token/reducer';
import store, { persistor } from '@/views/token/store';
import { PersistGate } from 'redux-persist/integration/react';
import { getTokenProps } from '@/utils';
import { AppProps, TokenId } from '@/utils/types';
import Scene from '@/views/token/Scene';
import Footer from '@/views/token/Footer';
import ImageUpload from '@/views/token/Tools/ImageUpload';
import CameraTools from '@/views/token/Tools/Camera';
import BagTools from '@/views/token/Tools/Bag';
import ToadzGame from '@/views/token/Quests/ToadzGame';
import { MANNY_TEXTURE_DEFAULT } from '@/utils/constants';

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
    questMode,
    mood,
    textureHD,
  } = tokenState;

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
        questMode={questMode}
      />
      <Footer
        account={props.web3.account}
        mannys={props.mannys ?? []}
        mannyContract={props.web3.mannyContract}
        tokenId={tokenId}
        zoomedIn={zoomedIn}
        bagOpen={bagOpen}
        cameraOpen={cameraOpen}
      />
      {bagOpen && (
        <BagTools
          account={props.web3.account}
          tokenId={tokenId}
          accessories={accessories}
        />
      )}
      {cameraOpen && (
        <CameraTools
          account={props.web3.account}
          mood={mood}
          bgColor={bgColor}
          zoomedIn={zoomedIn}
          paused={paused}
          textureHD={textureHD}
          tokenId={tokenId}
        />
      )}
      {questMode === 'toadz' && <ToadzGame />}
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
