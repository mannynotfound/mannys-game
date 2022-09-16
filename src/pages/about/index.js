import { useEffect, useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { Lighting } from 'components/three';
import { LinkOut } from 'components/Svg';
import mannyProjects from 'fixtures/projects';
import MannyAbout from './MannyAbout';

const calculatePercentage = (amount) => ((100 / 1616) * amount).toFixed(2);

const AboutProjects = () => {
  const sortedProjects = mannyProjects.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });

  return (
    <div className="p-4 flex justify-center flex-wrap">
      {sortedProjects.map((project) => (
        <div className="w-1/3 md:w-1/6">
          <div
            className="relative about-project"
            style={{
              paddingBottom: '66%',
              backgroundImage: `url(/logos/${project.logo})`,
              backgroundSize: project.logoSize ?? '80%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="about-project-overlay absolute inset-0">
              <div className="bg-gray-dark opacity-90 absolute inset-0 z-0" />
              <div className="relative h-full z-10 text-xs flex flex-col justify-center items-center text-center">
                <a
                  className="block text-yellow"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.name} <LinkOut className="ml-1 inline-block" />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AboutToken = ({ srcKey, title, description, total, onClick }) => (
  <div
    className="about-token inline-block border-gray-light border border-dashed p-2 w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 h-auto cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-end relative mb-2">
      <img
        className="w-full h-full"
        alt={srcKey}
        src={`/tokens/${srcKey}.png`}
      />
      <div className="about-token-overlay opacity-0 absolute inset-0 pointer-events-none">
        <div className="absolute bg-gray-dark inset-0 opacity-80 z-0" />
        <div className="flex flex-col w-full h-full justify-center relative z-10">
          <p className="text-xs mb-2 leading-tight relative">{description}</p>
          {srcKey !== 'mystery' && (
            <h5 className="text-white text-sm leading-tight w-full text-center mb-0">
              <div
                className="text-lg text-yellow leading-none"
                title="total supply"
              >
                <b>{total}</b>
              </div>
              <div title="percent of supply">
                ~{calculatePercentage(total)}%
              </div>
            </h5>
          )}
        </div>
      </div>
    </div>
    <div className="flex flex-1 flex-col relative text-white">
      <h3 className="my-1 text-green leading-none truncate">
        <b>{title}</b>
      </h3>
    </div>
  </div>
);

const AboutTokens = ({ setTokenId }) => (
  <>
    <AboutToken
      srcKey="base_common"
      title="Base Common"
      description="The most common manny, completely unmarked."
      total={1144}
      onClick={() => setTokenId(405)}
    />
    <AboutToken
      srcKey="base"
      title="Base Rare"
      description="Same as a base common, but serial numbered to 404."
      total={268}
      onClick={() => setTokenId(1)}
    />
    <AboutToken
      srcKey="albino"
      title="Albino"
      description="One of the rarer Mannys, inspired by albino animals."
      total={24}
      onClick={() => setTokenId(401)}
    />
    <AboutToken
      srcKey="holo"
      title="Holo"
      description="One of the rarer Mannys, a nod to holographic trading cards."
      total={24}
      onClick={() => setTokenId(42)}
    />
    <AboutToken
      srcKey="inverted"
      title="Inverted"
      description="One of the rarest Mannys, inspired by hitting ctrl+i in photoshop."
      total={16}
      onClick={() => setTokenId(144)}
    />
    <AboutToken
      srcKey="silver"
      title="Silver"
      description="One of the rarest Mannys, representing Manny's silver collection."
      total={16}
      onClick={() => setTokenId(66)}
    />
    <AboutToken
      srcKey="stone"
      title="Stone"
      description="One of the rarest Mannys, inspired by Manny's art school sculpture days."
      total={16}
      onClick={() => setTokenId(244)}
    />
    <AboutToken
      srcKey="zombie"
      title="Zombie"
      description="The second most rare Manny is an homage to cryptopunks."
      total={5}
      onClick={() => setTokenId(255)}
    />
    <AboutToken
      srcKey="gold"
      title="Gold"
      description="The holy grail of mannys.game, created by calling mintGoldManny()."
      total={1}
      onClick={() => setTokenId(404)}
    />
    <AboutToken
      srcKey="blitmap"
      title="Blitmap"
      description="A rare manny using cc0 artwork from the Blitmap universe."
      total={16}
      onClick={() => setTokenId(211)}
    />
    <AboutToken
      srcKey="burnt"
      title="Burnt"
      description="A rare manny that's been burnt by one too many crypto scams."
      total={16}
      onClick={() => setTokenId(147)}
    />
    <AboutToken
      srcKey="ecofriendly"
      title="Eco-Friendly"
      description="A rare manny celebrating nature, not backed by carbon offsets."
      total={16}
      onClick={() => setTokenId(1494)}
    />
    <AboutToken
      srcKey="mannydenza"
      title="Mannydenza"
      description="A rare manny generated by one of the most versatile algorithms to date."
      total={16}
      onClick={() => setTokenId(983)}
    />
    <AboutToken
      srcKey="rightclicked"
      title="Right-Clicked"
      description="A rare manny that's been right clicked and saved by too many NFT haters."
      total={16}
      onClick={() => setTokenId(910)}
    />
    <AboutToken
      srcKey="rugged"
      title="Rugged"
      description="A rare manny that's draped in the artwork from rugstore.exchange."
      total={16}
      onClick={() => setTokenId(299)}
    />
    <AboutToken
      srcKey="matrix"
      title="Matrix"
      description="A legendary manny that took the red pill."
      total={1}
      onClick={() => setTokenId(355)}
    />
    <AboutToken
      srcKey="skulltrooper"
      title="Skull Trooper"
      description="A legendary manny that started playing in season one."
      total={1}
      onClick={() => setTokenId(398)}
    />
    <AboutToken
      srcKey="pixelated"
      title="Pixelated"
      description="A legendary manny rendered as pixel art by artist Mykola Dosenko."
      total={1}
      onClick={() => setTokenId(903)}
    />
    <AboutToken
      srcKey="poorlydrawn"
      title="Poorly Drawn"
      description="A legendary manny hand drawn (poorly) by the artist himself."
      total={1}
      onClick={() => setTokenId(1248)}
    />
    <AboutToken
      srcKey="drmannyhattan"
      title="Dr. Mannyhattan"
      description="A legendary manny who's tired of Earth."
      total={1}
      onClick={() => setTokenId(1351)}
    />
    <AboutToken
      srcKey="ditto"
      title="Ditto"
      description="A legendary manny that can reconstitute its entire cellular structure."
      total={1}
      onClick={() => setTokenId(1429)}
    />
    <AboutToken
      srcKey="galaxy"
      title="Galaxy"
      description="A legendary manny as imagined by Mika."
      total={1}
      onClick={() => setTokenId(484)}
    />
    <AboutToken
      srcKey="captainmannypants"
      title="Cpt. Mannypants"
      description="A legendary manny as imagined by Neoboy."
      total={1}
      onClick={() => setTokenId(560)}
    />
    <AboutToken
      srcKey="mystery"
      title="???"
      description="Win new legendary mannys from discord giveaways"
      total={1}
      onClick={() => setTokenId(560)}
    />
  </>
);

const HoverText = ({ text }) => {
  let delayIndex = 0;

  return (
    <div className="flex items-center justify-center float">
      <h1
        className="flex flex-wrap items-center justify-left tilt"
        style={{ fontSize: 64, lineHeight: 1 }}
      >
        {/* eslint-disable react/no-array-index-key */}
        {text.split(' ').map((word, i, arr) => (
          <span className="flex" key={`${word}-${i}`}>
            {word.split('').map((letter, j) => {
              const delay = 0 + delayIndex;
              delayIndex = delayIndex + 1 > 3 ? 0 : delayIndex + 1;
              return (
                <span
                  className="float-secondary"
                  key={`${word}-${letter}-${j}`}
                  style={{
                    animationDelay: `${delay}s`,
                  }}
                >
                  {letter}
                </span>
              );
            })}
            {i < arr.length - 1 && <>&nbsp;</>}
          </span>
        ))}
      </h1>
    </div>
  );
};

const TimelineItem = ({
  title,
  className = '',
  children,
  direction = 'right',
}) => (
  <div
    className={`w-full flex justify-${
      direction === 'right' ? 'start' : 'end'
    } ${className}`}
  >
    <div className="w-1/2 px-8">
      <div
        className={`flex justify-${
          direction === 'right' ? 'end' : 'start'
        } w-full`}
      >
        <span className="flag bg-green text-black pt-1 px-2 rounded-sm relative">
          <h3 className="font-bold text-2xl">{title}</h3>
          <div
            className={`absolute ${direction}-0 z-10 bg-gray-dark`}
            style={{
              borderRadius: '50%',
              height: 20,
              width: 20,
              top: 8,
              [direction]: -42,
              border: '4px solid white',
            }}
          />
          <span
            className={`caret absolute ${direction}-0 top-1/2 h-0 w-0 pointer-events-none border-green`}
            style={{
              marginTop: -8,
              [direction]: -16,
              borderWidth: 8,
              borderTopColor: 'transparent',
              borderBottomColor: 'transparent',
              [`border${
                direction.charAt(0).toUpperCase() + direction.slice(1)
              }Color`]: 'transparent',
            }}
          />
        </span>
      </div>
      <p className="mt-3 italic">{children}</p>
    </div>
  </div>
);

const TimelineLink = ({ children, ...props }) => (
  <a
    target="_blank"
    rel="noreferrer noopener"
    className="text-yellow underline"
    {...props}
  >
    {children}
  </a>
);

const Podium = ({ positionY, positionZ }) => {
  const podiumRef = useRef();

  useFrame(() => {
    const vec = new THREE.Vector3(0, positionY, positionZ);
    // if y changes, just copy position, but if z changes lerp the position
    if (vec.y !== podiumRef.current.position.y) {
      podiumRef.current.position.copy(vec);
    } else if (vec.z !== podiumRef.current.position.z) {
      podiumRef.current.position.lerp(vec, 0.25);
    }
  });

  return (
    <mesh position={[0, -500, -10]} scale={[80, 20, 40]} ref={podiumRef}>
      <boxGeometry name="podium" />
      <meshStandardMaterial wireframe />
    </mesh>
  );
};

const About = () => {
  const [tokenId, setTokenId] = useState(1);
  const [scrollPos, setScrollPos] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const onScroll = useRef();

  useEffect(() => {
    onScroll.current = () => {
      const { innerHeight, scrollY } = window;

      if (scrollY !== scrollPos) setScrollPos(scrollY);
      if (innerHeight !== windowHeight) setWindowHeight(innerHeight);
    };

    window.addEventListener('scroll', onScroll.current);

    return () => {
      window.removeEventListener('scroll', onScroll.current);
    };
  }, []);

  // set animation + position
  let animation = 'float';
  let position = [0, -110, 0];

  const offset = 80;
  const timelineRef = useRef();
  const tokensRef = useRef();
  const communityRef = useRef();
  const sections = {
    intro: {
      animation: 'float',
      position: [0, -110, 0],
      start: () => 0,
    },
    timeline: {
      animation: 'teeter',
      position: [0, -145, 0],
      start: () => timelineRef.current?.offsetTop - windowHeight / 2,
    },
    tokens: {
      animation: 'idle',
      position: [0, -80, 0],
      start: () => tokensRef.current?.offsetTop - windowHeight / 3,
    },
    community: {
      animation: 'victory',
      position: [0, -80, 40],
      start: () => communityRef.current?.offsetTop - windowHeight / 3,
    },
  };

  Object.keys(sections).forEach((section, i, arr) => {
    const start = sections[section].start() - (i > 0 ? offset : 0);
    const hasMore = i !== arr.length - 1;
    const nextSection = hasMore ? sections[arr[i + 1]] : null;
    const end = hasMore ? nextSection.start() - offset : Infinity;

    if (scrollPos >= start && scrollPos < end) {
      animation = sections[section].animation;
      position = sections[section].position;
    }
  });

  // set opacities
  const starPercent = Math.min(
    Math.floor((100 / windowHeight) * scrollPos),
    100
  );
  const starOpacity = 1 - starPercent / 100;

  const introTextPercent = Math.min(
    Math.floor((100 / windowHeight) * 2 * scrollPos),
    100
  );
  const introTextOpacity = 1 - introTextPercent / 100;

  // set podium positions
  const podiumYDelta = scrollPos - sections.timeline.start();
  const podiumY = Math.min(-90, podiumYDelta);
  const podiumZ = ['idle', 'victory'].includes(animation) ? 10 : -10;

  return (
    <div
      className="mx-auto max-w-screen-2xl text-white"
      style={{ paddingTop: 80 }}
    >
      <div className="hidden md:flex fixed w-1/2 h-screen right-0 items-center">
        <div className="relative w-full h-0" style={{ paddingBottom: '100%' }}>
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
        className="h-screen relative"
        id="intro"
        style={{ height: 'calc(100vh - 80px)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: starOpacity, mixBlendMode: 'difference' }}
        >
          <div id="stars" />
          <div id="stars2" />
          <div id="stars3" />
        </div>
        <div className="h-full flex flex-col items-center justify-center md:w-1/2 overflow-x-hidden">
          <div className="flex-1" />
          <div className="pl-8" style={{ opacity: introTextOpacity }}>
            <HoverText
              text="mannys.game is a browser based 3D portal to an experiential community of artists,
              hackers and builders."
            />
          </div>
          <div className="flex-1 relative w-full">
            <div
              className="absolute pt-6 h-full left-1/2"
              style={{ marginLeft: -20, width: 40 }}
            >
              <div
                className="absolute h-full flex items-center whitespace-nowrap transform rotate-90"
                style={{
                  marginTop: -44,
                  opacity: introTextOpacity,
                }}
              >
                <span className="float-sideways">SCROLL DOWN</span>
              </div>
              <div
                style={{
                  borderRadius: '50%',
                  height: 20,
                  width: 20,
                  marginLeft: 10,
                  border: '4px solid white',
                }}
              />
              <div
                style={{
                  width: 4,
                  height: 'calc(100% - 20px)',
                  background: 'white',
                  marginLeft: 18,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div id="timeline" ref={timelineRef}>
        <div
          className="flex flex-col justify-center md:w-1/2 relative"
          style={{ paddingBottom: '30vh' }}
        >
          <TimelineItem title="September 2018" direction="right">
            Software artist{' '}
            <TimelineLink href="https://twitter.com/mannynotfound">
              @mannynotfound
            </TimelineLink>{' '}
            gets himself 3D body scanned to use in the metaverse.
          </TimelineItem>
          <TimelineItem title="September 2021" direction="left">
            Wanting to learn Solidity, manny makes an{' '}
            <TimelineLink href="https://twitter.com/mannynotfound/status/1438670320987160577">
              NFT game
            </TimelineLink>{' '}
            rewarding the first to collect a master set of 3D manny NFTs.
            Overwhelmed by positive feedback, manny continues developing the
            game.
          </TimelineItem>
          <TimelineItem title="October 2021" direction="right">
            <TimelineLink href="https://twitter.com/mannynotfound/status/1450263754864799746">
              Tattoo shop
            </TimelineLink>{' '}
            is launched, allowing manny holders to submit tattoos to be added to
            their manny's skin.
          </TimelineItem>
          <TimelineItem title="November 2021" direction="left">
            Manny continues to add{' '}
            <TimelineLink href="https://twitter.com/mannynotfound/status/1461026128940908549">
              NFT integrations
            </TimelineLink>{' '}
            based on other projects held by Manny owners.
          </TimelineItem>
          <TimelineItem title="January 2022" direction="right">
            <TimelineLink href="https://twitter.com/mannynotfound/status/1479909700959408131">
              Special edition mannys
            </TimelineLink>{' '}
            are released, finishing the mint process of all 1616 mannys.
          </TimelineItem>
          <TimelineItem title="February 2022" direction="left">
            <TimelineLink href="https://mannys.game/dao">MannyDAO</TimelineLink>{' '}
            is established, becoming a slush fund for collective purchasing and
            reinvesting.
          </TimelineItem>
          <TimelineItem title="March 2022" direction="right">
            <TimelineLink href="https://twitter.com/mannynotfound/status/1502446062937776130">
              Achievements
            </TimelineLink>{' '}
            are launched, celebrating the accomplishments of manny holders.
          </TimelineItem>
          <TimelineItem title="May 2022" direction="left">
            Manny contracts a 3D firm to add{' '}
            <TimelineLink href="https://twitter.com/mannynotfound/status/1522051242352123904">
              VTuber support
            </TimelineLink>{' '}
            to the manny model.
          </TimelineItem>
          <TimelineItem title="May 2022" direction="right">
            Work on a networked browser based{' '}
            <TimelineLink href="https://twitter.com/mannynotfound/status/1534550224382869506">
              mannyverse
            </TimelineLink>{' '}
            begins
          </TimelineItem>
          <TimelineItem title="2022 - Present" direction="left">
            Recognizing it's experimental boundary-pushing nature, the brightest
            minds in Web3 have joined the mannyverse, sharing resources and
            alpha while climbing the leaderboard ranks.
          </TimelineItem>
          <div
            className="absolute top-0 h-full left-1/2"
            style={{ marginLeft: -20, width: 40 }}
          >
            <div
              style={{
                width: 4,
                height: 'calc(100% - 20px)',
                background: 'white',
                marginLeft: 18,
              }}
            />
            <div
              style={{
                borderRadius: '50%',
                bottom: 0,
                height: 20,
                width: 20,
                marginLeft: 10,
                border: '4px solid white',
              }}
            />
          </div>
        </div>
      </div>
      <div id="tokens" ref={tokensRef}>
        <div className="flex flex-col md:w-1/2 relative px-8">
          <h2 className="text-green font-bold text-center py-4 my-10 text-5xl">
            Tokens
          </h2>
          <div className="text-center">
            <AboutTokens setTokenId={setTokenId} />
          </div>
        </div>
      </div>
      <div className="pb-10" id="community" ref={communityRef}>
        <div className="flex flex-col md:w-1/2 relative px-8">
          <h2 className="text-green font-bold text-center py-4 mt-10 text-5xl">
            Community
          </h2>
          <div>
            Manny holders are amongst the brightest and savviest of the web3
            landscape, representing talent from almost every major project.
            Token-gated discord channels offer industry secrets in{' '}
            <span className="text-yellow">#alpha</span>, allowlist spots from{' '}
            <span className="text-yellow">#giveaways</span>, or help on your
            project in <span className="text-yellow">#ask-manny</span>. Below
            are some of the projects manny holders work on:
          </div>
          <AboutProjects />
        </div>
      </div>
    </div>
  );
};

export default About;
