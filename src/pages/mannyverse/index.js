import { Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import { Physics } from '@react-three/cannon';

import { CanvasWrapper } from 'components/three';
import { useBestTweets } from 'hooks';
import { parseToken } from 'utils';
import MannyThirdPerson from './MannyThirdPerson';
import LoadingScreen from './LoadingScreen';
import GamerGallery from './GamerGallery';
import useLoaded from './useLoaded';

const Mannyverse = (props) => {
  const { textureUrl } = parseToken(props);
  // stuff that needs to be loaded before showing scene
  const registerKeys = ['manny', 'animations', 'gallery'];
  const { loading, registers } = useLoaded(registerKeys);
  const {
    data: bestTweets,
    load: loadBestTweets,
    loading: loadingBestTweets,
  } = useBestTweets();

  return (
    <>
      <LoadingScreen loading={loading} />
      <CanvasWrapper>
        <Physics gravity={[0, -35, 0]}>
          <Suspense fallback={null}>
            <MannyThirdPerson
              textureUrl={textureUrl}
              onLoadManny={registers.manny}
              onLoadAnimations={registers.animations}
            />
            <GamerGallery
              onLoad={registers.gallery}
              bestTweets={bestTweets}
              loadBestTweets={loadBestTweets}
              loadingBestTweets={loadingBestTweets}
            />
          </Suspense>
        </Physics>
      </CanvasWrapper>
    </>
  );
};

export default withRouter((props) => <Mannyverse {...props} />);
