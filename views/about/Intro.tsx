import IntroText from '@/views/about/IntroText';

type Props = {
  starOpacity: number;
  introTextOpacity: number;
};

export default function Intro({ starOpacity, introTextOpacity }: Props) {
  return (
    <>
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
          <IntroText
            text="mannys.game is a browser based 3D portal to an experiential community of artists,
              hackers and builders."
          />
        </div>
        <div className="flex-1 relative w-full">
          <div className="absolute pt-6 h-full left-1/2 ml-[-20px] w-[40px]">
            <div
              className="absolute h-full flex items-center whitespace-nowrap transform rotate-90 mt-[-44px]"
              style={{
                opacity: introTextOpacity,
              }}
            >
              <span className="float-sideways">SCROLL DOWN</span>
            </div>
            <div className="rounded-full h-[20px] w-[20px] ml-[10px] border-4 border-white" />
            <div className="w-[4px] h-[calc(100%-20px)] bg-white ml-[18px]" />
          </div>
        </div>
      </div>
    </>
  );
}
