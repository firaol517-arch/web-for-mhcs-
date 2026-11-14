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

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#0B0B0C] text-[#FAF6EE] border-b border-[#27272C]"
    >
      {/* Clearly Visible Fellowship Background Image */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="/assets/aistudio/photo_2026-11-12_17-40-29_01ace01c.jpg"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C]/90 via-[#0B0B0C]/55 to-[#0B0B0C]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-[#0B0B0C]/35" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-7 pb-8 md:pt-9 md:pb-10">
        {/* Split Grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Typography & Primary Action */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 flex flex-col justify-center space-y-4"
          >
            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#FB923C] tracking-wide">
              <McsfLogo size="md" />
              <span>MCSF · Dagmawi Menelik Health Science College · Addis Ababa</span>
            </div>

            <div>
              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.08] text-[#FAF6EE] text-balance">
                Menelik Christian <span className="text-[#FB923C]">Students Fellowship</span>
              </h1>
              <p className="mt-2 text-sm sm:text-lg font-display font-semibold text-[#E2D6C3] leading-snug max-w-2xl">
                Disciples of Christ in Medicine, Nursing, Pharmacy &amp; Healthcare Sciences
              </p>
            </div>

            {/* Primary CTA + Secondary Links */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => onScrollToSection('register')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs sm:text-sm transition-colors whitespace-nowrap shadow-lg"
              >
                <span>Enroll as a Member</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onScrollToSection('worship')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141417]/90 hover:bg-[#27272C] text-[#FAF6EE] border border-[#27272C] font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap"
              >
                <span>Worship &amp; Mezmur</span>
              </button>

              <button
                type="button"
                onClick={() => onScrollToSection('hospital')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141417]/90 hover:bg-[#27272C] text-[#FAF6EE] border border-[#27272C] font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap"
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
            </div>

            {/* Compact Fellowship Highlights Row */}
            <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#E2D6C3]/90">
              <span>
                <strong className="text-[#FB923C]">150+</strong> Alumni in Healthcare
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>
                <strong className="text-[#FAF6EE]">Wed 6:00 LT</strong> Weekly Fellowship Program
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>
                <strong className="text-[#FAF6EE]">Adult ICU</strong> Hospital Intercession
              </span>
            </div>
          </motion.div>

          {/* Right Column: Compact Primary Photo Card (Card-to-Detail) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex"
          >
            <button
              type="button"
              onClick={() =>
                onOpenDetail({ kind: 'photo', id: 'hero-group', returnSection: 'hero' })
              }
              className="w-full text-left group rounded-2xl overflow-hidden bg-[#141417] border border-[#27272C] hover:border-[#EA580C] transition-all flex flex-col justify-between shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
            >
              <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-black">
                <img
                  src="/assets/aistudio/photo_2026-11-12_17-40-29_01ace01c.jpg"
                  alt="MCSF Fellowship Gathering at Dagmawi Menelik Health Science College"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-semibold text-[#FB923C]">
                      JESUS: The Way, The Truth, The Life
                    </div>
                    <h2 className="font-display font-bold text-sm sm:text-base text-[#FAF6EE] mt-0.5">
                      Campus Fellowship Portrait
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EA580C] text-white text-xs font-bold shrink-0 whitespace-nowrap">
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
