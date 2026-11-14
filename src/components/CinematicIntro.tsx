import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { McsfLogo } from './McsfLogo';

export type IntroPhase = 'loading' | 'docking' | 'done';

interface CinematicIntroProps {
  phase: IntroPhase;
  onStartDocking: () => void;
  onComplete: () => void;
}

interface DockTarget {
  x: number;
  y: number;
  scale: number;
}

const INTRO_LOGO_PX = 96; // matches w-24 h-24 (6rem)

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  phase,
  onStartDocking,
  onComplete,
}) => {
  const [dockTarget, setDockTarget] = useState<DockTarget>({
    x: 0,
    y: 0,
    scale: 0.375,
  });

  const startDockingRef = useRef(onStartDocking);
  const completeRef = useRef(onComplete);
  startDockingRef.current = onStartDocking;
  completeRef.current = onComplete;

  // Lock page scroll only while intro overlay is active
  useEffect(() => {
    if (phase === 'done') return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [phase]);

  // Sequence timer: loading -> docking
  useEffect(() => {
    if (phase !== 'loading') return;

    const dockTimer = window.setTimeout(() => {
      const anchor = document.getElementById('navbar-logo-anchor');
      if (anchor) {
        const rect = anchor.getBoundingClientRect();
        const targetCenterX = rect.left + rect.width / 2;
        const targetCenterY = rect.top + rect.height / 2;
        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;

        setDockTarget({
          x: targetCenterX - viewportCenterX,
          y: targetCenterY - viewportCenterY,
          scale: rect.width > 0 ? rect.width / INTRO_LOGO_PX : 0.375,
        });
      }
      startDockingRef.current();
    }, 950);

    return () => window.clearTimeout(dockTimer);
  }, [phase]);

  // Sequence timer: docking -> done
  useEffect(() => {
    if (phase !== 'docking') return;

    const completeTimer = window.setTimeout(() => {
      completeRef.current();
    }, 560);

    return () => window.clearTimeout(completeTimer);
  }, [phase]);

  if (phase === 'done') return null;

  const isDocking = phase === 'docking';

  return (
    <div
      id="cinematic-intro-overlay"
      aria-hidden="true"
      className="fixed inset-0 z-[100] pointer-events-auto overflow-hidden select-none"
    >
      {/* Pure #000000 Cinematic Backdrop */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isDocking ? 0 : 1 }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-[#000000]"
      />

      {/* Centered Logo Stage -> Docks smoothly to Header Logo Anchor */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.78, x: 0, y: 0 }}
          animate={
            isDocking
              ? {
                  opacity: 1,
                  x: dockTarget.x,
                  y: dockTarget.y,
                  scale: dockTarget.scale,
                }
              : {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                }
          }
          transition={
            isDocking
              ? { duration: 0.52, ease: [0.22, 1, 0.36, 1] }
              : { duration: 0.46, ease: [0.16, 1, 0.3, 1] }
          }
          className="relative flex items-center justify-center w-24 h-24 will-change-transform"
        >
          {/* Soft Ambient Radial Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isDocking
                ? { opacity: 0, scale: 0.9 }
                : { opacity: [0.3, 0.85, 0.45, 0.78], scale: [0.95, 1.15, 1.02, 1.08] }
            }
            transition={
              isDocking
                ? { duration: 0.2 }
                : { duration: 0.92, ease: 'easeInOut' }
            }
            className="absolute -inset-8 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(234,88,12,0.36)_0%,rgba(251,146,60,0.1)_48%,transparent_72%)]"
          />

          {/* Refined Blinking Optical Ring */}
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isDocking
                ? { opacity: 0, scale: 1.05 }
                : { opacity: [0, 0.75, 0.15, 0.72, 0], scale: [0.96, 1.12, 1.04, 1.18, 1.24] }
            }
            transition={
              isDocking
                ? { duration: 0.18 }
                : { duration: 0.92, ease: 'easeInOut' }
            }
            className="absolute inset-0 rounded-full border border-[#FB923C]/55 pointer-events-none"
          />

          {/* Actual Project Logo Asset */}
          <McsfLogo
            size="lg"
            className="!w-24 !h-24 relative z-10 shadow-[0_0_32px_rgba(234,88,12,0.38)]"
          />
        </motion.div>

        {/* Sophisticated Thin Progress Indicator Beneath Centered Logo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={
            isDocking
              ? { opacity: 0, y: 6 }
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: isDocking ? 0.18 : 0.3, delay: isDocking ? 0 : 0.12 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-[72px] flex flex-col items-center gap-2.5"
        >
          <div className="w-40 sm:w-52 h-[2px] rounded-full bg-white/15 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.86, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#EA580C] via-[#FB923C] to-white"
            />
          </div>

          {/* Subtle refined status beacon */}
          <motion.span
            animate={
              isDocking
                ? { opacity: 0 }
                : { opacity: [0.25, 1, 0.3, 0.95] }
            }
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-[#FB923C] shadow-[0_0_8px_rgba(251,146,60,0.85)]"
          />
        </motion.div>
      </div>
    </div>
  );
};
