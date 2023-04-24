import { RefObject } from 'react';
import archiveIcon from '@/public/misc/icon-archive.png';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { License, Sponsors, Stars, Version } from '@/components/Svg';

type Props = {
  getStartedRef: RefObject<HTMLDivElement>;
  downloadRef: RefObject<HTMLDivElement>;
};

export default function Intro({ getStartedRef, downloadRef }: Props) {
  return (
    <div className="px-8 flex flex-col">
      <h1 className="text-8xl text-green font-bold">Download Manny</h1>
      <p className="text-xl">
        manny is a free, open-source model for use in media, video games, and
        cross-platform virtual or augmented reality.
      </p>
      <div className="mt-6">
        <Version className="inline-block mr-2" />
        <License className="inline-block mr-2" />
        <Stars className="inline-block mr-2" />
        <Sponsors className="inline-block" />
      </div>
      <div className="mt-10 py-5 border-t border-b border-gray-blue">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 flex-col md:pr-4 text-center">
            <span className="whitespace-nowrap">
              Use with{' '}
              <span className="bg-gray-blue p-1 rounded-md">
                <code>react-three-fiber</code>
              </span>{' '}
              app:
            </span>
            <div
              className={twMerge(
                'flex justify-center items-center text-center',
                'bg-gray-code rounded-lg h-16 mt-4'
              )}
            >
              <code>npm i manny</code>
            </div>
            <div className="text-center mt-4">
              <span
                onClick={() => {
                  getStartedRef.current?.scrollIntoView();
                }}
                className="text-yellow underline cursor-pointer"
              >
                Get Started
              </span>{' '}
              ·{' '}
              <a
                href="https://codepen.io"
                target="_blank"
                rel="noreferrer noopener"
                className="text-yellow underline"
              >
                Example
              </a>{' '}
              ·{' '}
              <a
                href="https://github.com/mannynotfound/manny"
                target="_blank"
                rel="noreferrer noopener"
                className="text-yellow underline"
              >
                GitHub
              </a>
            </div>
          </div>
          <div
            className={twMerge(
              'flex-1 flex-col md:pl-4 text-center',
              'border-t border-gray-blue md:border-none',
              'pt-4 mt-4 md:pt-0 md:mt-0'
            )}
          >
            <span className="whitespace-nowrap">Or download as a model:</span>
            <a
              href="https://d2tm2f4d5v0kas.cloudfront.net/Manny.fbx"
              download
              className={twMerge(
                'flex justify-center items-center',
                'bg-gray-code rounded-lg text-center h-16 mt-4'
              )}
            >
              <Image
                className="h-12 w-auto mr-2"
                alt="archive icon"
                src={archiveIcon}
              />{' '}
              <span>Manny.fbx</span>
            </a>
            <div className="text-center mt-4">
              <span
                onClick={() => {
                  downloadRef.current?.scrollIntoView();
                }}
                className="text-yellow underline cursor-pointer"
              >
                Download Your Manny NFT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
