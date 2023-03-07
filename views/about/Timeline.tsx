import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TimelineItemProps = {
  title: string;
  className?: string;
  children: ReactNode;
  direction?: string;
};

const TimelineItem = ({
  title,
  className = '',
  children,
  direction = 'right',
}: TimelineItemProps) => (
  <div
    className={twMerge(
      'w-full flex',
      direction === 'right' ? 'justify-start' : 'justify-end',
      className
    )}
  >
    <div className="w-1/2 px-8">
      <div
        className={twMerge(
          'flex w-full',
          direction === 'right' ? 'justify-end' : 'justify-start'
        )}
      >
        <span className="flag bg-green text-black pt-1 px-2 rounded-sm relative">
          <h3 className="font-bold text-2xl">{title}</h3>
          <div
            className={twMerge(
              'absolute z-10 bg-gray-dark',
              direction === 'right' ? 'right-0' : 'left-0',
              'rounded-full h-[20px] w-[20px] top-[8px]',
              direction === 'right' ? 'right-[-42px]' : 'left-[-42px]',
              'border-white border-4'
            )}
          />
          <span
            className={twMerge(
              'caret absolute top-1/2 h-0 w-0 pointer-events-none',
              'mt-[-8px]',
              'border-8 border-y-transparent',
              direction === 'right'
                ? 'border-r-transparent border-l-green'
                : 'border-l-transparent border-r-green',
              direction === 'right' ? 'right-[-16px]' : 'left-[-16px]'
            )}
          />
        </span>
      </div>
      <p className="mt-3 italic">{children}</p>
    </div>
  </div>
);

type LinkProps = {
  children: ReactNode;
  href: string;
};

const TimelineLink = ({ children, href }: LinkProps) => (
  <a
    target="_blank"
    rel="noreferrer noopener"
    className="text-yellow underline"
    href={href}
  >
    {children}
  </a>
);

export default function Timeline() {
  return (
    <div className="flex flex-col justify-center md:w-1/2 relative pb-[30vh]">
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
        Overwhelmed by positive feedback, manny continues developing the game.
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
        <TimelineLink href="https://mannys.game/dao">MannyDAO</TimelineLink> is
        established, becoming a slush fund for collective purchasing and
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
        minds in Web3 have joined the mannyverse, sharing resources and alpha
        while climbing the leaderboard ranks.
      </TimelineItem>
      <div className="absolute top-0 h-full left-1/2 ml-[-20px] w-[40px]">
        <div className="w-[4px] h-[calc(100%-20px)] bg-white ml-[18px]" />
        <div className="rounded-full bottom-0 h-[20px] w-[20px] ml-[10px] border-white border-4" />
      </div>
    </div>
  );
}
