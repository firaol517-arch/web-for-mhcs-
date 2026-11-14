import React from 'react';
import { SectionId } from '../types/fellowship';
import {
  TELEGRAM_REGISTRATION_BOT,
  TELEGRAM_REGISTRATION_BOT_HANDLE,
  TELEGRAM_CHANNEL,
} from '../data/fellowshipData';
import { Send, ArrowUpRight, ArrowRight, Bot, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

interface RegisterViewProps {
  onScrollToSection: (section: SectionId) => void;
  onRegistered?: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onScrollToSection }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="register"
      className="py-16 md:py-24 bg-[#F2EBE0] text-[#0B0B0C] border-b border-[#E2D6C3]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] font-display block mb-2">
            Official Telegram Bot Registration
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#0B0B0C] text-balance">
            Register on Our Bot
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#524C44] leading-relaxed">
            Member registration for MCSF at Dagmawi Menelik Health Science College takes place directly inside our official Telegram bot — no website form required.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-white rounded-3xl p-7 sm:p-10 border border-[#E2D6C3] shadow-lg text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#0B0B0C] text-[#FB923C] mx-auto flex items-center justify-center shadow-md">
              <Bot className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <div className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                {TELEGRAM_REGISTRATION_BOT_HANDLE}
              </div>
              <h3 className="text-2xl font-black font-display text-[#0B0B0C]">
                Continue to MCSF Registration Bot
              </h3>
              <p className="text-xs sm:text-sm text-[#524C44] leading-relaxed">
                Tap below to open <strong>{TELEGRAM_REGISTRATION_BOT_HANDLE}</strong> in Telegram and press <strong>Start</strong> to enroll in seconds.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 text-left max-w-xl mx-auto">
              {[
                '1. Open the bot on Telegram',
                '2. Tap Start to begin',
                '3. Follow the quick prompts',
              ].map((step) => (
                <div
                  key={step}
                  className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF6EE] border border-[#E2D6C3] text-xs font-semibold text-[#0B0B0C]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.a
                href={TELEGRAM_REGISTRATION_BOT}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm transition-colors shadow-[0_10px_28px_-6px_rgba(234,88,12,0.55)]"
              >
                <Send className="w-4 h-4" />
                <span>Open {TELEGRAM_REGISTRATION_BOT_HANDLE}</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>

              <a
                href={TELEGRAM_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#FAF6EE] hover:bg-[#F2EBE0] text-[#0B0B0C] border border-[#E2D6C3] text-xs sm:text-sm font-semibold transition-colors"
              >
                <span>Channel (@lursuesz)</span>
              </a>
            </div>

            <div className="pt-4 border-t border-[#F2EBE0] flex flex-wrap justify-center gap-4 text-xs text-[#524C44]">
              <button
                type="button"
                onClick={() => onScrollToSection('family')}
                className="inline-flex items-center gap-1 font-semibold text-[#0B0B0C] hover:text-[#EA580C] transition-colors"
              >
                <span>Explore Family Circles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => onScrollToSection('contact')}
                className="inline-flex items-center gap-1 font-semibold text-[#0B0B0C] hover:text-[#EA580C] transition-colors"
              >
                <span>Contact Coordinators</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
