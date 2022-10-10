import { useEffect, useState } from 'react';
import { Fade } from 'react-reveal';

const LoadingScreen = ({ loading }) => {
  const [dotAmount, setDotAmount] = useState(0);
  const [randomGif, setRandomGif] = useState();

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDotAmount((da) => (da + 1 > 3 ? 0 : da + 1));
    }, 100);

    const randomGifIdx = Math.floor(Math.random() * (10 - 1 + 1) + 1);
    setRandomGif(`/gifs/${randomGifIdx}.gif`);

    return () => {
      clearInterval(dotInterval);
    };
  }, []);

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
            {['dot1', 'dot2', 'dot3'].map((d, i) => (
              <span key={d} className={dotAmount > i ? '' : 'opacity-0'}>
                .
              </span>
            ))}
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default LoadingScreen;
