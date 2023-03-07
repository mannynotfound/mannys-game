import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  color?: string;
};

export default function Button({
  onClick,
  children,
  className,
  color = 'green',
}: Props) {
  return (
    <span
      className={twMerge(
        'button cursor-pointer',
        `text-${color} hover:text-gray`,
        `border-2 border-${color}`,
        `hover:bg-${color}`,
        'py-0 px-[12px]',
        className
      )}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
