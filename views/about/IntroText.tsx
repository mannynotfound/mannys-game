import { useRef } from 'react';

type Props = {
  text: string;
};

export default function HoverText({ text }: Props) {
  const delayIndex = useRef(0);

  return (
    <div className="flex items-center justify-center float">
      <h1 className="flex flex-wrap items-center justify-left tilt text-[64px] leading-none">
        {/* eslint-disable react/no-array-index-key */}
        {text.split(' ').map((word, i, arr) => (
          <span className="flex" key={`${word}-${i}`}>
            {word.split('').map((letter, j) => {
              const delay = 0 + delayIndex.current;
              delayIndex.current =
                delayIndex.current + 1 > 3 ? 0 : delayIndex.current + 1;
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
}
