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
  duration = 0.85,
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
    up: { opacity: 0, y: 36, x: 0 },
    down: { opacity: 0, y: -32, x: 0 },
    left: { opacity: 0, x: 36, y: 0 },
    right: { opacity: 0, x: -36, y: 0 },
    fromLeft: { opacity: 0, x: -48, y: 10 },
    fromRight: { opacity: 0, x: 48, y: 10 },
    zoom: { opacity: 0, scale: 0.92, y: 20 },
    none: { opacity: 0 },
  };

  return (
    <motion.div
      initial={initialStates[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 'some', margin: '0px 0px -90px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
