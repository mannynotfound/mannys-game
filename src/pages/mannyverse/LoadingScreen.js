import { Fade } from 'react-reveal';
import useRandomGif from './useRandomGif';
import useLoadingDots from './useLoadingDots';

const LoadingScreen = ({ loading }) => {
  const randomGif = useRandomGif();
  const dots = useLoadingDots();

  const loadingClasses = [
    'fixed inset-0 z-20',
    'flex items-center justify-center',
    'text-white',
    loading ? '' : 'pointer-events-none',
  ];

  return (
    <div className={loadingClasses.join(' ')}>
      <Fade duration={1000} when={loading}>
        <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
          {randomGif && (
            <img
              style={{ height: 300, width: 'auto' }}
              alt="loading manny gif"
              src={randomGif}
            />
          )}
          <div className="text-5xl">
            loading
            {dots}
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default LoadingScreen;
