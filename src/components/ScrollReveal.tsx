import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, animate } from 'motion/react';

export function useHasUserScrolled(threshold = 12): boolean {
  const [hasScrolled, setHasScrolled] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.scrollY > threshold : false
  );

  useEffect(() => {
    if (hasScrolled) return;
    const check = () => {
      if (window.scrollY > threshold) {
        setHasScrolled(true);
      }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [hasScrolled, threshold]);

  return hasScrolled;
}

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
  afterScroll?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.42,
  direction = 'up',
  afterScroll = false,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 'some',
    margin: afterScroll ? '0px 0px -55px 0px' : '0px 0px -30px 0px',
  });
  const hasScrolled = useHasUserScrolled(12);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const initialStates: Record<
    RevealDirection,
    { opacity: number; x?: number; y?: number; scale?: number }
  > = {
    up: { opacity: 0, y: 22, x: 0 },
    down: { opacity: 0, y: -18, x: 0 },
    left: { opacity: 0, x: 24, y: 0 },
    right: { opacity: 0, x: -24, y: 0 },
    fromLeft: { opacity: 0, x: -28, y: 4 },
    fromRight: { opacity: 0, x: 28, y: 4 },
    zoom: { opacity: 0, scale: 0.95, y: 12 },
    none: { opacity: 0 },
  };

  const shouldReveal = afterScroll ? inView && hasScrolled : inView;

  return (
    <motion.div
      ref={ref}
      initial={initialStates[direction]}
      animate={
        shouldReveal
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : initialStates[direction]
      }
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

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  ready?: boolean;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = '',
  duration = 0.85,
  ready = true,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 'some' });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState<number>(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(target);
      return;
    }
    if (!inView || !ready) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, ready, target, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
};
