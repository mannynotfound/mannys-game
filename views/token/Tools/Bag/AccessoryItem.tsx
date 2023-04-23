import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import type { Accessory } from '@/fixtures/accessories';
import type { SetTooltipArgs } from '@/views/token/Tools/Bag/Tooltip';

type Props = {
  accessory: Accessory;
  imageUrl: string;
  className: string;
  isActive: boolean;
  isEnabled: boolean;
  onClick: () => void;
  setTooltip: (args: SetTooltipArgs) => void;
};

export default function AccessoryItem({
  accessory,
  imageUrl,
  className,
  isActive,
  isEnabled,
  onClick,
  setTooltip,
}: Props) {
  // tracks position of item for sticky tooltip
  const itemRef = useRef<HTMLDivElement>(null);
  const [distanceFromEdge, setDistanceFromEdge] = useState(0);
  useEffect(() => {
    const itemRect = itemRef.current?.getBoundingClientRect();
    if (itemRect === undefined) return;
    setDistanceFromEdge(window.innerWidth - itemRect.right);
  }, [itemRef]);

  // default to green bg. rare = cyan, legendary = magenta
  const bgColor =
    accessory.rarity === 'rare'
      ? 'bg-cyan'
      : accessory.rarity === 'legendary'
      ? 'bg-magenta'
      : 'bg-green';

  const tooltip = useMemo(
    () => ({
      ...accessory,
      bgColor,
      distanceFromEdge,
    }),
    [accessory, bgColor, distanceFromEdge]
  );

  const itemClasses = twMerge(
    className,
    'h-[40px] w-[40px] relative inline-block',
    'p-1 rounded-md hover:border-white',
    isActive ? 'border-2 border-white' : 'border border-green',
    isEnabled ? 'cursor-pointer' : 'opacity-25'
  );

  const onMouseEnter = useCallback(
    () => setTooltip(tooltip),
    [tooltip, setTooltip]
  );
  const onClickHandler = useCallback(() => {
    if (isEnabled) {
      onClick();
    }
  }, [onClick, isEnabled]);

  return (
    <div
      ref={itemRef}
      className={itemClasses}
      onMouseEnter={onMouseEnter}
      onClick={onClickHandler}
    >
      <div className="absolute inset-0 opacity-50 highlight" />
      <div className={`absolute inset-0 opacity-50 ${bgColor}`} />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
}
