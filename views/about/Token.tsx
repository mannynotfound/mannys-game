import { twMerge } from 'tailwind-merge';

type Props = {
  srcKey: string;
  title: string;
  description: string;
  total: number;
  onClick: () => void;
};

const calculatePercentage = (amount: number) =>
  ((100 / 1616) * amount).toFixed(2);

export default function AboutToken({
  srcKey,
  title,
  description,
  total,
  onClick,
}: Props) {
  return (
    <div
      className={twMerge(
        'group inline-block border-gray-light border border-dashed',
        'p-2 w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 h-auto cursor-pointer'
      )}
      onClick={onClick}
    >
      <div className="flex items-end relative mb-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-full"
          alt={srcKey}
          src={`/tokens/${srcKey}.png`}
        />
        <div
          className={twMerge(
            'group-hover:opacity-100 transition',
            'opacity-0 absolute inset-0 pointer-events-none'
          )}
        >
          <div className="absolute bg-gray-dark inset-0 opacity-80" />
          <div className="flex flex-col w-full h-full justify-center relative">
            <p className="text-xs mb-2 leading-tight relative">{description}</p>
            {srcKey !== 'mystery' && (
              <h5 className="text-white text-sm leading-tight w-full text-center mb-0">
                <div
                  className="text-lg text-yellow leading-none font-bold"
                  title="total supply"
                >
                  {total}
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
        <h3 className="my-1 text-green leading-none truncate font-bold">
          {title}
        </h3>
      </div>
    </div>
  );
}
