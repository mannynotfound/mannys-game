import MouseTooltip from 'react-sticky-mouse-tooltip';
import { twMerge } from 'tailwind-merge';

export type BagTooltip = {
  distanceFromEdge: number;
  bgColor: string;
  label: string;
  description: string;
  level?: number;
  stats?: Record<string, number>;
  slot?: string;
  requirement?: string;
};

export type SetTooltipArgs =
  | {
      bgColor: string;
      distanceFromEdge: number;
      label: string;
      description: string;
    }
  | undefined;

type Props = {
  tooltip: BagTooltip | undefined;
};

export default function Tooltip({ tooltip }: Props) {
  const { bgColor } = tooltip ?? {};
  const closeToEdge =
    tooltip?.distanceFromEdge !== undefined && tooltip?.distanceFromEdge < 269;

  const tooltipClasses = twMerge(
    'bg-black border border-green rounded-md w-[280px]',
    'absolute bottom-0 p-2 text-white leading-tight text-sm',
    closeToEdge ? 'right-0' : 'left-0'
  );

  const visible = tooltip !== undefined;

  const textClass =
    bgColor === 'bg-magenta'
      ? 'text-magenta'
      : bgColor === 'bg-cyan'
      ? 'text-cyan'
      : 'text-green';

  return (
    <MouseTooltip
      visible={visible}
      offsetY={-10}
      offsetX={closeToEdge ? -10 : 10}
    >
      {visible && (
        <div className={tooltipClasses}>
          <h3 className={`${textClass}`}>{tooltip.label}</h3>
          {tooltip.level && (
            <p className="text-yellow">Item Level {tooltip.level}</p>
          )}
          {tooltip.slot && <p>{tooltip.slot}</p>}
          {tooltip.stats !== undefined &&
            Object.entries(tooltip.stats).map(([k, v]) => (
              <p key={k} className={v < 0 ? 'text-red' : ''}>
                {v > 0 && '+'}
                {v} {k}
              </p>
            ))}
          {tooltip.requirement && <p>{tooltip.requirement}</p>}
          <p className="text-yellow">"{tooltip.description}"</p>
        </div>
      )}
    </MouseTooltip>
  );
}
