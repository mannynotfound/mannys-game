import { useState } from 'react';
import { Html } from '@react-three/drei';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import useLoadingDots from '../useLoadingDots';

const Dots = () => useLoadingDots();

const PaginationButton = ({ onClick, direction }) => {
  const posClass = direction === 'next' ? 'right-0' : 'left-0';
  const marginStyle = {
    marginTop: -40,
    [`margin${direction === 'next' ? 'Right' : 'Left'}`]: -100,
  };

  return (
    <div
      className={`absolute ${posClass} text-8xl text-yellow cursor-pointer`}
      style={{
        top: '50%',
        ...marginStyle,
      }}
      onClick={() => onClick(direction)}
    >
      <b>{direction === 'next' ? '🠒' : '🠐'}</b>
    </div>
  );
};

const TweetViewer = ({ tweets, visible }) => {
  const [tweetIdx, setTweetIdx] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const onPaginate = (direction) => {
    setLoading(true);
    setError(null);
    if (direction === 'next') {
      setTweetIdx((idx) => {
        const next = idx + 1;
        return next > tweets.length - 1 ? 0 : next;
      });
    } else {
      setTweetIdx((idx) => {
        const previous = idx - 1;
        return previous < 0 ? tweets.length - 1 : previous;
      });
    }
  };

  const currentTweet = tweets[tweetIdx];
  const { screen_name: screenName, id_str: idStr } = currentTweet;

  return (
    <Html
      position={[-8.35, 5.5, 15.75]}
      rotation={[0, Math.PI, 0]}
      distanceFactor={5}
      transform
      style={{
        width: 550,
        opacity: visible ? 1 : 0,
      }}
    >
      <PaginationButton onClick={onPaginate} direction="previous" />
      <PaginationButton onClick={onPaginate} direction="next" />
      <TwitterTweetEmbed
        options={{ width: 550 }}
        key={idStr}
        tweetId={idStr}
        onLoad={(el) => {
          setLoading(false);
          if (!el) {
            setError(
              <div>
                Tweet{' '}
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`https://twitter.com/${screenName}/status/${idStr}`}
                  className="text-yellow underline"
                >
                  {idStr}
                </a>{' '}
                failed to load...
              </div>
            );
          }
        }}
      />
      {(error || loading) && (
        <div className="absolute inset-0 flex justify-center items-center text-white">
          {error || (
            <>
              {`loading ${idStr}`}
              <Dots />
            </>
          )}
        </div>
      )}
    </Html>
  );
};
export default TweetViewer;
