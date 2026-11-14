import React from 'react';
import { DetailRoute, SectionId } from '../types/fellowship';
import {
  GALLERY_PHOTOS,
  TELEGRAM_REGISTRATION_BOT,
  TELEGRAM_REGISTRATION_BOT_HANDLE,
} from '../data/fellowshipData';
import { Bot, Send, ArrowUpRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

interface FamilyViewProps {
  onScrollToSection: (section: SectionId) => void;
  onOpenDetail: (detail: DetailRoute) => void;
  onRequestSubmitted?: () => void;
}

export const FamilyView: React.FC<FamilyViewProps> = ({
  onScrollToSection,
  onOpenDetail,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const familyShowcaseIds = [
    'family-day-arts-room',
    'family-day-trio-glow',
    'first-year-anniversary',
    'crown-fellowship-joy',
    'crown-ceremony-sisters',
    'menelik-wednesday-dialogue',
  ];

  const familyMoments = GALLERY_PHOTOS.filter((p) => familyShowcaseIds.includes(p.id));

  return (
    <section
      id="family"
      className="py-16 md:py-24 bg-[#F2EBE0] text-[#0B0B0C] border-b border-[#E2D6C3]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] font-display block mb-2">
            MCSF Family Day &amp; Milestones
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#0B0B0C] text-balance">
            Small-Group Fellowship Families
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#524C44] leading-relaxed">
            In MCSF Family circles, 5 to 8 health science students gather weekly for deep prayer, anniversary thanksgiving, Crown Days, and clinical study encouragement. Click any celebration card to read its story.
          </p>
        </ScrollReveal>

        {/* Clickable Family Day, Anniversary & Crown Celebration Photo Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {familyMoments.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 0.06}>
              <button
                type="button"
                onClick={() =>
                  onOpenDetail({ kind: 'photo', id: item.id, returnSection: 'family' })
                }
                className="w-full text-left rounded-2xl overflow-hidden bg-white border border-[#E2D6C3] hover:border-[#EA580C] shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
              >
                <div className="relative h-64 w-full overflow-hidden bg-[#0B0B0C]">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={item.src}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#FAF6EE]">
                    <span className="font-semibold text-[#FB923C]">{item.tag}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#FAF6EE] group-hover:text-[#FB923C]" />
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#0B0B0C] group-hover:text-[#EA580C] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#524C44] mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#F2EBE0] text-xs font-semibold text-[#6C6358]">
                    {item.subtitle}
                  </div>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {/* Direct Telegram Bot Registration for Family Circles (Zero On-Site Form) */}
        <ScrollReveal>
          <div className="rounded-3xl p-7 sm:p-10 bg-white border border-[#E2D6C3] shadow-lg max-w-2xl mx-auto text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0B0B0C] text-[#FB923C] mx-auto flex items-center justify-center shadow-md">
              <Bot className="w-7 h-7" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] block">
                Family Placement via Telegram Bot
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-[#0B0B0C]">
                Join an MCSF Family Circle
              </h3>
              <p className="text-xs sm:text-sm text-[#524C44] leading-relaxed">
                All Family Circle sign-ups are handled directly inside{' '}
                <strong>{TELEGRAM_REGISTRATION_BOT_HANDLE}</strong> — no website form to fill out.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 text-left max-w-xl mx-auto">
              {[
                'Department & year matching',
                'Clinical shift-friendly groups',
                'Instant bot confirmation',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF6EE] border border-[#E2D6C3] text-xs font-semibold text-[#0B0B0C]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.a
                href={TELEGRAM_REGISTRATION_BOT}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs sm:text-sm transition-colors shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Register Family on {TELEGRAM_REGISTRATION_BOT_HANDLE}</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>

              <button
                type="button"
                onClick={() => onScrollToSection('gallery')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl bg-[#0B0B0C] hover:bg-[#EA580C] text-[#FAF6EE] font-bold text-xs sm:text-sm transition-colors"
              >
                <span>Browse Full Gallery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
