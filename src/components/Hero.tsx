import React from 'react';
import { DetailRoute, SectionId } from '../types/fellowship';
import { TELEGRAM_CHANNEL } from '../data/fellowshipData';
import { ArrowRight, Send, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { McsfLogo } from './McsfLogo';

interface HeroProps {
  onScrollToSection: (section: SectionId) => void;
  onOpenDetail: (detail: DetailRoute) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToSection, onOpenDetail }) => {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.78, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#0B0B0C] text-[#FAF6EE] border-b border-[#27272C] min-h-[calc(100svh-4rem)] lg:min-h-[min(calc(100svh-4rem),680px)] flex items-center"
    >
      {/* Full-Width Fellowship Photograph with Cinematic Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.img
          src="/assets/aistudio/photo_2026-11-12_17-40-29_01ace01c.jpg"
          alt=""
          referrerPolicy="no-referrer"
          initial={prefersReducedMotion ? false : { scale: 1.08, opacity: 0.55 }}
          animate={prefersReducedMotion ? { opacity: 0.78 } : { scale: 1, opacity: 0.78 }}
          transition={{ duration: 1.75, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C]/92 via-[#0B0B0C]/58 to-[#0B0B0C]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/95 via-transparent to-[#0B0B0C]/35" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        {/* Responsive Split Grid */}
        <div className="grid lg:grid-cols-12 gap-7 lg:gap-9 items-center">
          {/* Left Column: Brand Eyebrow, Two-Line Headline, Actions & Stats */}
          <div className="lg:col-span-8 flex flex-col justify-center space-y-5">
            <motion.div
              {...fadeUp(0.02)}
              className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#FB923C] tracking-wide"
            >
              <McsfLogo size="sm" />
              <span>MCSF · Dagmawi Menelik Health Science College · Addis Ababa</span>
            </motion.div>

            <motion.div {...fadeUp(0.08)}>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-[3.5rem] tracking-tight leading-[1.04] text-[#FAF6EE] text-balance">
                Menelik Christian
                <br />
                <span className="text-[#FB923C]">Students Fellowship</span>
              </h1>
              <p className="mt-3 text-sm sm:text-lg font-display font-semibold text-[#E2D6C3] leading-snug max-w-2xl">
                Disciples of Christ in Medicine, Nursing, Pharmacy &amp; Healthcare Sciences
              </p>
            </motion.div>

            {/* Primary CTA + Secondary Dark Glass Actions */}
            <motion.div {...fadeUp(0.14)} className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              <button
                type="button"
                onClick={() => onScrollToSection('register')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs sm:text-sm transition-all whitespace-nowrap shadow-[0_10px_28px_-6px_rgba(234,88,12,0.55)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FB923C]"
              >
                <span>Enroll as a Member</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onScrollToSection('worship')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141417]/85 backdrop-blur-md hover:bg-[#27272C] text-[#FAF6EE] border border-white/15 hover:border-[#EA580C]/70 font-semibold text-xs sm:text-sm transition-all whitespace-nowrap"
              >
                <span>Worship &amp; Mezmur</span>
              </button>

              <button
                type="button"
                onClick={() => onScrollToSection('hospital')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141417]/85 backdrop-blur-md hover:bg-[#27272C] text-[#FAF6EE] border border-white/15 hover:border-[#EA580C]/70 font-semibold text-xs sm:text-sm transition-all whitespace-nowrap"
              >
                <span>Adult ICU Ministry</span>
              </button>

              <a
                href={TELEGRAM_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[#FAF6EE] hover:text-[#FB923C] font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap"
              >
                <Send className="w-4 h-4 text-[#FB923C]" />
                <span>t.me/lursuesz</span>
              </a>
            </motion.div>

            {/* Fellowship Statistics & Key Information Row */}
            <motion.div
              {...fadeUp(0.2)}
              className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs sm:text-[13px] text-[#E2D6C3]/90"
            >
              <span>
                <strong className="text-[#FB923C]">150+</strong> Alumni in Healthcare
              </span>
              <span aria-hidden="true">·</span>
              <span>
                <strong className="text-[#FAF6EE]">Wed 6:00 LT</strong> Weekly Fellowship Program
              </span>
              <span aria-hidden="true">·</span>
              <span>
                <strong className="text-[#FAF6EE]">Adult ICU</strong> Hospital Intercession
              </span>
            </motion.div>
          </div>

          {/* Right Column: Floating Story Portrait Card (Card-to-Detail) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 flex lg:justify-end"
          >
            <button
              type="button"
              onClick={() =>
                onOpenDetail({ kind: 'photo', id: 'hero-group', returnSection: 'hero' })
              }
              className="w-full max-w-[420px] text-left group rounded-2xl overflow-hidden bg-[#141417] border border-white/15 hover:border-[#EA580C] transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between shadow-[0_24px_55px_-12px_rgba(0,0,0,0.85)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
            >
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-black">
                <img
                  src="/assets/aistudio/photo_2026-11-12_17-40-29_01ace01c.jpg"
                  alt="MCSF Fellowship Gathering at Dagmawi Menelik Health Science College"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-semibold text-[#FB923C]">
                      JESUS: The Way, The Truth, The Life
                    </div>
                    <h2 className="font-display font-bold text-sm sm:text-base text-[#FAF6EE] mt-0.5">
                      Campus Fellowship Portrait
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EA580C] text-white text-xs font-bold shrink-0 whitespace-nowrap shadow-md">
                    <span>Story</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
