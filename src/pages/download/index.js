import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSignMessage } from 'wagmi';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import b64ToBlob from 'b64-to-blob';
import fileSaver from 'file-saver';

import { Version, License, Stars, Sponsors } from 'components/Svg';
import { Button } from 'components';
import { Manny, Lighting } from 'components/three';

const overviewCode = `
~~~js
import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import manny from "manny";

const App = () => (
  <div style={{ height: "100vh", width: "100%" }}>
    <Canvas camera={{ position: [0, 0, 300] }} flat>
      {/* manny has to be called inside @react-three/fiber canvas context */}
      <Suspense fallback={null}>
        <group position={[0, -85, 0]}>
          <primitive object={manny()} dispose={null} />
        </group>
      </Suspense>
      <hemisphereLight groundColor={0x444444} />
      <directionalLight intensity={0.25} position={[0, 200, 100]} />
    </Canvas>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
~~~
`;

const WalletConnect = () => (
  <div className="flex items-center relative z-50 pb-10">
    <p className="text-xl" style={{ maxWidth: 680 }}>
      Connect your wallet see if you have any mannys...
      <ConnectButton.Custom>
        {({ openConnectModal }) => (
          <Button className="ml-4" onClick={openConnectModal} large>
            <span className="text-white">connect</span>
          </Button>
        )}
      </ConnectButton.Custom>
    </p>
  </div>
);

const NoMannys = () => (
  <div className="flex pb-10">
    <p className="text-xl">
      Looks like you dont have any mannys, try getting some on the{' '}
      <a
        href="https://opensea.io/collection/mannys-game"
        target="_blank"
        className="text-green"
        rel="noopener noreferrer"
      >
        secondary market
      </a>
      .
    </p>
  </div>
);

const S3_URL = 'https://mannys-game.s3.us-east-1.amazonaws.com/images';

const DownloadToken = ({ account, mannys }) => {
  const [downloading, setDownloading] = useState(false);

  const { signMessageAsync } = useSignMessage();
  // const { data: signer } = useSigner();

  if (!account || account?.isConnecting) {
    return null;
  }

  if (!account.isConnecting && !account?.address) {
    return <WalletConnect />;
  }

  if (!account.isConnecting && Array.isArray(mannys) && !mannys.length) {
    return <NoMannys />;
  }

  const onRequestToken = async (tokenId) => {
    if (downloading) return;

    setDownloading(true);
    const signature = await signMessageAsync({
      message: `Downloading token for manny #${tokenId}`,
    }).catch(console.error);

    if (!signature) {
      alert('Invalid Signature');
    }

    const fetchUrl = window.location.host.includes('localhost')
      ? 'http://localhost:3001'
      : 'https://mannys-game-server.herokuapp.com';

    fetch(`${fetchUrl}/api/download-token/${tokenId}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sig: signature,
        token: tokenId,
      }),
    })
      .then((resp) => resp.text())
      .then((zipAsBase64) => {
        const blob = b64ToBlob(zipAsBase64, 'application/zip');
        fileSaver.saveAs(blob, `manny-${tokenId}.zip`);
        setDownloading(false);
      })
      .catch((error) => {
        alert(error);
        setDownloading(false);
      });

    console.log('REQUESTING ', tokenId);
  };

  return (
    <div className="flex flex-wrap mt-6 pb-10">
      {(mannys ?? [])
        .sort((a, b) => a.id - b.id)
        .map((ym) => (
          <div
            className="hover:border-green border-gray-light cursor-pointer border border-dashed m-1"
            onClick={() => {
              onRequestToken(ym.id);
            }}
            key={ym.id}
            style={{
              width: 150,
              height: 180,
            }}
          >
            <img
              alt="manny token option"
              src={`${S3_URL}/${ym.id}.png`}
              className="w-full h-auto"
            />
            <p className="text-xl font-bold text-center mb-0">{ym.id}</p>
          </div>
        ))}
    </div>
  );
};

const Download = (props) => {
  const getStartedRef = useRef();
  const downloadRef = useRef();

  return (
    <div
      className="mx-auto max-w-screen-2xl text-white"
      style={{ paddingTop: 80 }}
    >
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex-1 flex items-center">
          <div className="px-8 flex flex-col">
            <h1 className="text-8xl text-green font-bold">Download Manny</h1>
            <p className="text-xl">
              manny is a free, open-source model for use in media, video games,
              and cross-platform virtual or augmented reality.
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
                  <div className="flex justify-center items-center bg-gray-code rounded-lg text-center h-16 mt-4">
                    <code>npm i manny</code>
                  </div>
                  <div className="text-center mt-4">
                    <span
                      onClick={() => {
                        getStartedRef.current.scrollIntoView();
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
                <div className="flex-1 flex-col md:pl-4 text-center border-t border-gray-blue md:border-none pt-4 mt-4 md:pt-0 md:mt-0">
                  <span className="whitespace-nowrap">
                    Or download as a model:
                  </span>
                  <a
                    href="https://d2tm2f4d5v0kas.cloudfront.net/Manny.fbx"
                    download
                    className="flex justify-center items-center bg-gray-code rounded-lg text-center h-16 mt-4"
                  >
                    <img
                      className="h-12 w-auto mr-2"
                      alt="archive icon"
                      src="/misc/icon-archive.png"
                    />{' '}
                    <span>Manny.fbx</span>
                  </a>
                  <div className="text-center mt-4">
                    <span
                      onClick={() => {
                        downloadRef.current.scrollIntoView();
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
        </div>
        <div className="flex-1 flex items-center">
          <div
            className="relative w-full h-0"
            style={{ paddingBottom: '100%' }}
          >
            <div className="absolute inset-0">
              <Canvas
                linear
                camera={{
                  fov: 45,
                  near: 1,
                  far: 2000,
                  position: [0, 0, 300],
                }}
                gl={{ antialias: true, alpha: true }}
                onCreated={({ gl }) => {
                  gl.toneMapping = THREE.NoToneMapping;
                  gl.outputEncoding = THREE.sRGBEncoding;
                }}
              >
                <Suspense fallback={null}>
                  <Manny position={[0, -85, 0]} animation="waving" />
                </Suspense>
                <Lighting />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
      <div
        id="get-started"
        ref={getStartedRef}
        className="border-t border-gray-blue"
      >
        <div className="px-8">
          <h2 className="text-4xl mt-10 mb-5 text-green">Overview</h2>
          <div style={{ maxWidth: 800 }}>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {overviewCode}
            </ReactMarkdown>
          </div>
          <div className="mt-4 mb-10">
            For full documentation and usage, visit the{' '}
            <a
              className="text-yellow underline"
              href="https://github.com/mannynotfound/manny"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repository.
            </a>
          </div>
        </div>
        <div
          id="download-your-token"
          ref={downloadRef}
          className="border-t border-gray-blue"
        >
          <div className="px-8">
            <h2 className="text-4xl text-green mt-10 mb-5">
              Download Your Manny
            </h2>
            <DownloadToken {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
