import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type RevealDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'fromLeft'
  | 'fromRight'
  | 'zoom'
  | 'none';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: RevealDirection;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.45,
  direction = 'up',
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const initialStates: Record<
    RevealDirection,
    { opacity: number; x?: number; y?: number; scale?: number }
  > = {
    up: { opacity: 0, y: 26, x: 0 },
    down: { opacity: 0, y: -24, x: 0 },
    left: { opacity: 0, x: 24, y: 0 },
    right: { opacity: 0, x: -24, y: 0 },
    fromLeft: { opacity: 0, x: -34, y: 6 },
    fromRight: { opacity: 0, x: 34, y: 6 },
    zoom: { opacity: 0, scale: 0.92, y: 12 },
    none: { opacity: 0 },
  };

  return (
    <motion.div
      initial={initialStates[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 'some', margin: '100px 0px 60px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
