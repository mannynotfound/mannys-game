import { useState, useRef, useEffect } from 'react';
import MouseTooltip from 'react-sticky-mouse-tooltip';

import { accessoryMap } from 'fixtures/accessories';
import { useFWB, useNounish, useLoot } from 'hooks';
import { createFrogger } from './Frogger';

const QuestItem = (props) => {
  const { className, quest, setTooltip, dispatch, isEnabled, tokenId } = props;

  const itemRef = useRef();

  const [distanceFromEdge, setDistanceFromEdge] = useState(0);
  useEffect(() => {
    const itemRect = itemRef.current?.getBoundingClientRect();
    setDistanceFromEdge(window.innerWidth - itemRect.right);
  }, []);

  const itemClasses = [
    className,
    'border border-green hover:border-white',
    'relative inline-block rounded-md p-1',
    isEnabled ? 'cursor-pointer' : 'opacity-25',
  ];

  return (
    <div
      ref={itemRef}
      className={itemClasses.join(' ')}
      onMouseEnter={() => {
        setTooltip({
          ...quest,
          bgColor: 'magenta',
          distanceFromEdge,
        });
      }}
      style={{
        width: 40,
        height: 40,
      }}
      onClick={() => {
        if (isEnabled) {
          dispatch({
            type: 'SET_QUEST_MODE',
            payload: {
              tokenId,
              quest,
            },
          });

          if (quest.id === 'toadz') {
            setTimeout(() => {
              const froggerGame = createFrogger(5958);
              froggerGame.observer.publish('game-load');

              const endGame = (isWin) => {
                setTimeout(() => {
                  dispatch({
                    type: 'SET_QUEST_MODE',
                    payload: {
                      tokenId,
                      quest: {},
                    },
                  });
                  dispatch({
                    type: 'SET_MOOD',
                    payload: {
                      tokenId,
                      mood: isWin ? 'cheering' : 'agony',
                    },
                  });
                }, 2500);
              };

              froggerGame.observer.subscribe('game-over', () => {
                endGame(false);
              });
              froggerGame.observer.subscribe('game-won', () => {
                endGame(true);
              });
            }, 100);
          }
        }
      }}
    >
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url(/accessories/quests/${quest?.id}.png)`,
          backgroundSize: 'cover',
          bacgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-0 opacity-50 highlight" />
      <div className="absolute inset-0 z-0 opacity-50 bg-magenta" />
    </div>
  );
};

const BagItem = (props) => {
  const {
    category,
    className,
    accessory,
    state,
    dispatch,
    setTooltip,
    isEnabled,
    tokenId,
  } = props;
  const itemRef = useRef();

  const [distanceFromEdge, setDistanceFromEdge] = useState(0);
  useEffect(() => {
    const itemRect = itemRef.current?.getBoundingClientRect();
    setDistanceFromEdge(window.innerWidth - itemRect.right);
  }, []);

  const slotAccessories =
    state?.accessories?.[tokenId]?.[accessory?.slot] ?? [];
  const isActive = slotAccessories.includes(accessory.id);
  const itemClasses = [
    className,
    'hover:border-white',
    'relative inline-block rounded-md p-1',
    isActive ? 'border-2 border-white' : 'border border-green',
    isEnabled ? 'cursor-pointer' : 'opacity-25',
  ];
  let bgColor = 'green';
  if (accessory.rarity === 'rare') {
    bgColor = 'cyan';
  } else if (accessory.rarity === 'legendary') {
    bgColor = 'magenta';
  }

  const imageUrl = accessory.mystery
    ? 'mystery.png'
    : `${category}/${accessory.id}.png`;

  const tooltip = accessory.mystery
    ? {
        label: '???',
        description: 'Coming soon...',
        id: 'mystery',
        bgColor,
        distanceFromEdge,
      }
    : {
        ...accessory,
        bgColor,
        distanceFromEdge,
      };

  return (
    <div
      ref={itemRef}
      className={itemClasses.join(' ')}
      onMouseEnter={() => {
        setTooltip(tooltip);
      }}
      style={{
        width: 40,
        height: 40,
      }}
      onClick={() => {
        if (isEnabled) {
          dispatch({
            type: 'TOGGLE_ACCESSORY',
            payload: {
              tokenId,
              ...accessory,
            },
          });
        }
      }}
    >
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url(/accessories/${imageUrl})`,
          backgroundSize: 'cover',
          bacgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-0 opacity-50 highlight" />
      <div className={`absolute inset-0 z-0 opacity-50 bg-${bgColor}`} />
    </div>
  );
};

const Bag = (props) => {
  const { account, provider, achievements } = props;
  const address = account?.address;

  useEffect(() => {
    if (!achievements.data?.[address] && !achievements.loading) {
      achievements.load(address);
    }
  }, [address, achievements]);

  const hasFWB = useFWB(provider, address);
  const hasNouns = useNounish(provider, address);
  const { lootBalance: hasLoot, mLootBalance: hasMLoot } = useLoot(
    provider,
    address
  );
  const [tooltip, setTooltip] = useState(null);
  const closeToEdge = tooltip?.distanceFromEdge < 269;
  const tooltipClasses = [
    'bg-black border border-green rounded-md',
    'absolute bottom-0 p-2',
    'text-white leading-tight text-sm',
    closeToEdge ? 'right-0' : 'left-0',
  ];
  const tooltipOffset = {
    offsetY: -10,
    offsetX: closeToEdge ? -10 : 10,
  };

  const getItemEnabled = (accessory) => {
    if (!accessory?.requirement) {
      return true;
    }

    if (accessory.mystery) {
      return false;
    }

    return accessory?.validator({
      achievements: achievements.data?.[address] ?? [],
      hasFWB,
      hasNouns,
      hasMLoot,
      hasLoot,
    });
  };

  return (
    <div
      className="absolute right-0 px-8 text-green select-none"
      style={{
        bottom: 200,
        width: '100%',
        maxWidth: 446,
      }}
    >
      <div className="border p-4 border-green rounded-md relative z-10">
        <div
          className="absolute top-0 right-0 text-yellow cursor-pointer z-0"
          onClick={() => {
            props.dispatch({ type: 'SET_BAG_OPEN', payload: false });
          }}
        >
          <div className="p-4 text-2xl">
            <b>X</b>
          </div>
        </div>
        <div className="text-white text-xl mb-2">
          <b>Bag</b>
        </div>
        {Object.keys(accessoryMap).map((category) => (
          <div key={category} className="mb-2">
            <div className="text-green text-lg capitalize mb-1">{category}</div>
            <div className="flex" onMouseLeave={() => setTooltip(null)}>
              {accessoryMap[category].map((acc, idx, arr) => (
                <BagItem
                  {...props}
                  isEnabled={getItemEnabled(acc)}
                  setTooltip={setTooltip}
                  key={acc.id}
                  category={category}
                  accessory={acc}
                  className={idx === arr.length - 1 ? '' : 'mr-1'}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="mb-2">
          <div className="text-green text-lg capitalize mb-1">quest items</div>
          <div className="flex" onMouseLeave={() => setTooltip(null)}>
            <QuestItem
              {...props}
              className="mr-2"
              setTooltip={setTooltip}
              quest={{
                id: 'toadz',
                label: 'CrypToadz Frogger',
                description:
                  "Play a reimagined version of the arcade classic 'Frogger' as mannyDAO's CrypToad.",
              }}
              isEnabled
            />
            <QuestItem
              {...props}
              setTooltip={setTooltip}
              quest={{
                id: 'corruption',
                label: 'Corruption(s*) Mode',
                description:
                  'Turn mannys.game into an ASCII based rendering in the style of Corruption(s*) NFT.',
              }}
              isEnabled
            />
          </div>
        </div>
      </div>
      <MouseTooltip
        visible={Boolean(tooltip)}
        className="z-50"
        {...tooltipOffset}
      >
        {Boolean(tooltip) && (
          <div className={tooltipClasses.join(' ')} style={{ width: 280 }}>
            <h3 className={`text-${tooltip?.bgColor}`}>{tooltip?.label}</h3>
            {tooltip?.level && (
              <p className="text-yellow">Item Level {tooltip.level}</p>
            )}
            {tooltip?.slot && <p>{tooltip.slot}</p>}
            {tooltip?.stats &&
              Object.keys(tooltip.stats).map((k) => (
                <p key={k} className={tooltip.stats[k] < 0 ? 'text-red' : ''}>
                  {tooltip.stats[k] > 0 && '+'}
                  {tooltip.stats[k]} {k}
                </p>
              ))}
            {tooltip.requirement && <p>{tooltip?.requirement}</p>}
            <p className="text-yellow">"{tooltip?.description}"</p>
          </div>
        )}
      </MouseTooltip>
    </div>
  );
};

export default Bag;
