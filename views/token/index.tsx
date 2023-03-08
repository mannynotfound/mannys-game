import { useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import useLocalStorage from 'use-local-storage';
import { getTokenProps } from '@/utils';
import { AppProps } from '@/utils/types';
import reducer, { initialState } from '@/views/token/reducer';
import Scene from '@/views/token/Scene';
import Footer from '@/views/token/Footer';
import ImageUpload from '@/views/token/Tools/ImageUpload';
import CameraTools from '@/views/token/Tools/Camera';
import BagTools from '@/views/token/Tools/Bag';
import ToadzGame from '@/views/token/Quests/ToadzGame';
import { TokenPageState } from '@/views/token/types';
import { MANNY_TEXTURE_DEFAULT } from '@/utils/constants';

const storageKey = 'mg-token-state';

function Token(props: { tokenId: number } & AppProps) {
  const tokenId = props.tokenId;
  const tokenMatch = getTokenProps(tokenId);
  const textureUrl = tokenMatch?.textureUrl ?? MANNY_TEXTURE_DEFAULT;

  const [lastState, setLastState] = useLocalStorage<TokenPageState | undefined>(
    storageKey,
    undefined
  );
  const [state, dispatch] = useReducer(reducer, lastState ?? {});

  useEffect(() => {
    setLastState(state);
  }, [state]);

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
        dispatch={dispatch}
      />
      {bagOpen && (
        <BagTools
          account={props.web3.account}
          tokenId={tokenId}
          accessories={accessories}
          dispatch={dispatch}
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
          dispatch={dispatch}
        />
      )}
      {questMode === 'toadz' && <ToadzGame />}
      {imageUploadOpen && <ImageUpload tokenId={tokenId} dispatch={dispatch} />}
    </>
  );
}

export default function TokenCheck(props: AppProps) {
  const router = useRouter();
  const tokenStr = router.query.tokenId?.toString() ?? '0';
  const tokenMatch = getTokenProps(parseInt(tokenStr, 10));
  const tokenId = tokenMatch?.tokenId;
  if (tokenId === undefined) {
    return null;
  }

  return <Token tokenId={tokenId} {...props} />;
}
