import { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import useSWR from 'swr';
import { twMerge } from 'tailwind-merge';
import Loader from '@/components/Loader';
import { defaultCameraPosition } from '@/components/three/CameraZoom';
import { MannyProps } from '@/components/three/Manny';
import { useAppDispatch, useAppSelector } from '@/views/token/hooks';
import { fetcher, getTokenProps, usePrevious } from '@/utils';
import { API_URL, MANNY_TEXTURE_DEFAULT } from '@/utils/constants';
import { AppProps, TokenId, TokenUserMetadata } from '@/utils/types';
import Footer from '@/views/token/Footer';
import Scene from '@/views/token/Scene';
import BagTools from '@/views/token/Tools/Bag';
import CameraTools from '@/views/token/Tools/Camera';
import ImageUpload from '@/views/token/Tools/ImageUpload';
import { hydrateUserState, initialTokenState } from '@/views/token/reducer';
import store from '@/views/token/store';

interface Props extends AppProps {
  tokenId: TokenId;
}

function Token(props: Props) {
  const tokenId = props.tokenId;
  const tokenMatch = getTokenProps(tokenId);
  const textureUrl = tokenMatch?.textureUrl ?? MANNY_TEXTURE_DEFAULT;
  const [initialCameraPosition, setInitialCameraPosition] = useState<{
    x: number;
    y: number;
    z: number;
  }>();
  const [loading, setLoading] = useState(true);
  const [mannyLoaded, setMannyLoaded] = useState<MannyProps>();
  const state = useAppSelector((state) => state.tokens);
  const dispatch = useAppDispatch();
  const tokenState = state.tokens[tokenId] ?? initialTokenState;
  const { data: userMetadata, error: userMetadataError } = useSWR<
    Partial<TokenUserMetadata>
  >(`${API_URL}/nft/metadata/${tokenId}`, fetcher);

  useEffect(() => {
    if (userMetadata !== undefined && state.tokens[tokenId] === undefined) {
      dispatch(
        hydrateUserState({
          tokenId,
          value: userMetadata,
        })
      );
    }
  }, [tokenId, userMetadata, dispatch, state]);

  useEffect(() => {
    if (!loading) return;
    if (userMetadata !== undefined) {
      if (initialCameraPosition === undefined) {
        setInitialCameraPosition(
          userMetadata?.camera?.position ?? defaultCameraPosition
        );
      }
      if (mannyLoaded !== undefined) {
        setLoading(false);
      }
    }
    if (userMetadataError !== undefined) {
      console.error(userMetadataError);
      setLoading(false);
    }
  }, [
    loading,
    userMetadata,
    userMetadataError,
    mannyLoaded,
    initialCameraPosition,
  ]);

  const previousToken = usePrevious(tokenId, tokenId);
  useEffect(() => {
    if (previousToken !== tokenId && !loading) {
      setLoading(true);
    }
  }, [tokenId, previousToken, loading]);

  const { bagOpen, cameraOpen, imageUploadOpen, camera } = state;
  const { zoomedIn, paused, bgColor, accessories, mood, textureHD } =
    tokenState;

  const onMannyLoad = useCallback((mannyProps: MannyProps) => {
    setMannyLoaded(mannyProps);
  }, []);

  const saveUserMetadata = useCallback(
    async (sig: `0x${string}`) => {
      setLoading(true);
      const userMetadata: TokenUserMetadata = {
        camera: {
          position: camera.position,
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

      const response = await fetch(
        `${API_URL}/nft/metadata/update/${tokenId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify({
            sig,
            ...userMetadata,
          }),
        }
      ).catch((error) => {
        // TODO: handle error
        setLoading(false);
        alert('Somethings fucked up, please bug Manny to fix.');
        console.error(error);
      });

      setLoading(false);
      return response;
    },
    [
      tokenId,
      zoomedIn,
      camera.position,
      mood,
      paused,
      accessories,
      bgColor,
      textureHD,
    ]
  );

  const toolsClasses = 'fixed right-0 bottom-[140px] select-none text-green';

  return (
    <>
      <Scene
        initialCameraPosition={initialCameraPosition}
        accessories={accessories}
        tokenId={tokenId}
        textureUrl={textureUrl}
        mood={mood}
        bgColor={bgColor}
        paused={paused}
        textureHD={textureHD}
        zoomedIn={zoomedIn}
        onMannyLoad={onMannyLoad}
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
      {imageUploadOpen && (
        <ImageUpload tokenId={tokenId} saveUserMetadata={saveUserMetadata} />
      )}
      {loading && <Loader />}
    </>
  );
}

export default function TokenCheck(props: AppProps & { tokenId: TokenId }) {
  if (props.tokenId === undefined) {
    return null;
  }

  return (
    <Provider store={store}>
      <Token {...props} />
    </Provider>
  );
}
