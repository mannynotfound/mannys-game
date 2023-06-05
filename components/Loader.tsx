import { SVGAttributes } from 'react';
import { SVGMotionProps, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

type PathProps = {
  className?: string;
  duration?: number;
  reversed?: boolean;
};

function AnimatedPath(
  props: Partial<SVGMotionProps<SVGPathElement>> & PathProps
) {
  const { duration, className, ...restProps } = props;

  return (
    <motion.path
      {...restProps}
      fill="none"
      className={twMerge('stroke-current', className)}
      initial={{ pathLength: 0, pathOffset: 0 }}
      animate={{
        pathLength: [0, 1, 1],
        pathOffset: [0, 0, 1],
        transition: {
          duration: duration ?? 4,
          repeat: Infinity,
        },
      }}
    />
  );
}

function MannyHead(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="343.08"
      height="500.69"
      viewBox="0 0 343.08 500.69"
      {...props}
    >
      <AnimatedPath
        duration={1.5}
        stroke="#000"
        strokeMiterlimit="10"
        strokeWidth="18"
        d="M11.82 255.79l.81-30.15S10 211.72 17 211.91c7 .19 11.02-.7 9.27-9.75-1.76-9.05-10.08-71.3 6.88-106.85C50.12 59.75 82.49 9.6 171.53 9c89.05-.6 127.08 59.26 135.5 87.59 11 37-.83 95.49 13.16 112.5 2.93 3.56 17.84-5.5 13.67 12.37 0 0-.32 12-1.38 13.97s-3.3 12.92-2.48 18.44 3.13 31.6-.22 44.51c-3.35 12.91-1.57 20.97-1.57 20.97s.54 17.02-16.48 17.56c0 0-6.37 50.85-35.44 90.08-29.07 39.23-64.31 66.55-99.27 64.61s-58.39-11.72-105-64c0 0-28.11-26.88-36.27-95.13 0 0-22.33 1.54-26.01-23.64 0 0 1.68-11.83.58-21.46s-2.94-15.69 1.49-31.57z"
      />
    </svg>
  );
}

export default function Loader() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="flex items-center justify-center absolute inset-0">
        <MannyHead className="w-20 h-auto text-yellow" />
      </div>
    </div>
  );
}
