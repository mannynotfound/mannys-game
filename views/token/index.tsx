import { useCallback, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import useSWR from 'swr';
import { twMerge } from 'tailwind-merge';
import { useSignMessage } from 'wagmi';
import { useAppDispatch, useAppSelector } from '@/views/token/hooks';
import { fetcher, getTokenProps } from '@/utils';
import { API_URL, MANNY_TEXTURE_DEFAULT } from '@/utils/constants';
import { AppProps, TokenId, TokenUserMetadata } from '@/utils/types';
import Footer from '@/views/token/Footer';
import Scene from '@/views/token/Scene';
import BagTools from '@/views/token/Tools/Bag';
import CameraTools from '@/views/token/Tools/Camera';
import ImageUpload from '@/views/token/Tools/ImageUpload';
import { hydrateUserState, initialState } from '@/views/token/reducer';
import store, { persistor } from '@/views/token/store';

interface Props extends AppProps {
  tokenId: TokenId;
}

function Token(props: Props) {
  const tokenId = props.tokenId;
  const tokenMatch = getTokenProps(tokenId);
  const textureUrl = tokenMatch?.textureUrl ?? MANNY_TEXTURE_DEFAULT;
  const { signMessageAsync } = useSignMessage();
  const state = useAppSelector((state) => state.tokens);
  const dispatch = useAppDispatch();
  const tokenState = state[tokenId] ?? initialState;
  const { data: userMetadata } = useSWR<Partial<TokenUserMetadata>>(
    `${API_URL}/nft/metadata/${tokenId}`,
    fetcher
  );

  useEffect(() => {
    if (userMetadata !== undefined) {
      console.log('GOT USER METADATA ', userMetadata);
      dispatch(
        hydrateUserState({
          tokenId,
          value: userMetadata,
        })
      );
    }
  }, [tokenId, userMetadata, dispatch]);

  const {
    camera: { zoomedIn, paused, bgColor },
    bagOpen,
    cameraOpen,
    imageUploadOpen,
    accessories,
    mood,
    textureHD,
  } = tokenState;

  const saveUserMetadata = useCallback(async () => {
    const sig = await signMessageAsync({
      message: `Updating metadata for manny #${tokenId}`,
    }).catch((error) => {
      console.error(error);
      return undefined;
    });

    // TODO: maybe show error if reject signature
    if (sig === undefined) {
      return;
    }

    const userMetadata: TokenUserMetadata = {
      camera: {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        pfp_mode: zoomedIn,
      },
      animation: {
        id: mood,
        paused,
        frame: 0,
      },
      accessories: accessories ?? {},
      scene: {
        background_color: bgColor,
        texture_hd: textureHD,
      },
    };

    fetch(`${API_URL}/nft/metadata/update/${tokenId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        sig,
        ...userMetadata,
      }),
    })
      .then(async (resp) => resp.json())
      .then((json) => {
        // TODO: handle success
        alert('metadata.saved!');
        console.log(json);
      })
      .catch((error) => {
        // TODO: handle error
        alert('metadata.fucked!');
        console.error(error);
      });
  }, [
    tokenId,
    zoomedIn,
    mood,
    paused,
    accessories,
    bgColor,
    textureHD,
    signMessageAsync,
  ]);

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
          saveUserMetadata={saveUserMetadata}
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
