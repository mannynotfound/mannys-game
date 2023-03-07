import { useRef } from 'react';
import { AppProps } from '@/utils/types';
import Intro from '@/views/download/Intro';
import DownloadToken from '@/views/download/Token';
import Overview from '@/views/download/Overview';
import Scene from '@/views/download/Scene';
import useHasMounted from '@/hooks/useHasMounted';

export default function Download({ web3, mannys }: AppProps) {
  const getStartedRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const hasMounted = useHasMounted();

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex-1 flex items-center">
          <Intro getStartedRef={getStartedRef} downloadRef={downloadRef} />
        </div>
        <div className="flex-1 flex items-center">
          {hasMounted && typeof window !== 'undefined' && <Scene />}
        </div>
      </div>
      <div
        id="get-started"
        ref={getStartedRef}
        className="border-t border-gray-blue"
      >
        {hasMounted && typeof window !== 'undefined' && <Overview />}
      </div>
      <div
        id="download-your-token"
        ref={downloadRef}
        className="border-t border-gray-blue"
      >
        {hasMounted && typeof window !== 'undefined' && (
          <DownloadToken account={web3.account} mannys={mannys} />
        )}
      </div>
    </>
  );
}
