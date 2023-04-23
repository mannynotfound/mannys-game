import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { NoToneMapping, sRGBEncoding } from 'three';
import { Lighting, MannyAbout } from '@/components/three';
import type { TokenId } from '@/utils/types';
import Community from '@/views/about/Community';
import Intro from '@/views/about/Intro';
import Podium from '@/views/about/Podium';
import Timeline from '@/views/about/Timeline';
import Tokens from '@/views/about/Tokens';

type SectionsMap = {
  [key: string]: {
    animation: string;
    position: number[];
    start: () => number;
  };
};

export default function About() {
  const [tokenId, setTokenId] = useState<TokenId>(1);
  const [scrollPos, setScrollPos] = useState(0);
  const [windowHeight, setWindowHeight] = useState(100);
  const onScroll = useRef<() => void>();

  useEffect(() => {
    onScroll.current = () => {
      const { innerHeight, scrollY } = window;

      if (scrollY !== scrollPos) setScrollPos(scrollY);
      if (innerHeight !== windowHeight) setWindowHeight(innerHeight);
    };

    window.addEventListener('scroll', onScroll.current);

    return () => {
      if (onScroll.current !== undefined) {
        window.removeEventListener('scroll', onScroll.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // set animation + position
  let animation = 'float';
  let position = [0, -110, 0];

  const offset = 80;
  const timelineRef = useRef<HTMLDivElement>(null);
  const tokensRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const sections: SectionsMap = {
    intro: {
      animation: 'float',
      position: [0, -110, 0],
      start: () => 0,
    },
    timeline: {
      animation: 'teeter',
      position: [0, -145, 0],
      start: () => (timelineRef.current?.offsetTop ?? 0) - windowHeight / 2,
    },
    tokens: {
      animation: 'idle',
      position: [0, -80, 0],
      start: () => (tokensRef.current?.offsetTop ?? 0) - windowHeight / 3,
    },
    community: {
      animation: 'victory',
      position: [0, -80, 40],
      start: () => (communityRef.current?.offsetTop ?? 0) - windowHeight / 3,
    },
  };

  Object.values(sections).forEach((val, i, arr) => {
    const start = val.start() - (i > 0 ? offset : 0);
    const hasMore = i !== arr.length - 1;
    const nextKey = Object.keys(sections)[i + 1];
    const nextSection = hasMore ? sections[nextKey] : null;
    const end =
      hasMore && nextSection !== null ? nextSection.start() - offset : Infinity;

    if (scrollPos >= start && scrollPos < end) {
      animation = val.animation;
      position = val.position;
    }
  });

  // set opacities
  const starPercent =
    windowHeight > 0
      ? Math.min(Math.floor((100 / windowHeight) * scrollPos), 100)
      : 100;
  const starOpacity = 1 - starPercent / 100;

  const introTextPercent =
    windowHeight > 0
      ? Math.min(Math.floor((100 / windowHeight) * 2 * scrollPos), 100)
      : 100;
  const introTextOpacity = 1 - introTextPercent / 100;

  // set podium positions
  const podiumYDelta = scrollPos - sections.timeline.start();
  const podiumY = Math.min(-90, podiumYDelta);
  const podiumZ = ['idle', 'victory'].includes(animation) ? 10 : -10;

  return (
    <>
      <div className="hidden md:flex fixed w-1/2 h-screen right-0 items-center">
        <div className="relative w-full h-0 pb-[100%]">
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
                gl.toneMapping = NoToneMapping;
                gl.outputEncoding = sRGBEncoding;
              }}
            >
              <Suspense fallback={null}>
                <MannyAbout
                  position={position}
                  animation={animation}
                  tokenId={tokenId}
                />
              </Suspense>
              <Podium positionY={podiumY} positionZ={podiumZ} />
              <Lighting />
            </Canvas>
          </div>
        </div>
      </div>
      <div
        id="intro"
        className="h-screen relative h-[calc(100vh-theme(spacing.nav-height))]"
      >
        <Intro starOpacity={starOpacity} introTextOpacity={introTextOpacity} />
      </div>
      <div id="timeline" ref={timelineRef}>
        <Timeline />
      </div>
      <div id="tokens" ref={tokensRef}>
        <Tokens setTokenId={setTokenId} />
      </div>
      <div className="pb-10" id="community" ref={communityRef}>
        <Community />
      </div>
    </>
  );
}
