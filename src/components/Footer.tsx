import React from 'react';
import { SectionId } from '../types/fellowship';
import { FELLOWSHIP_LEADERS, TELEGRAM_CHANNEL } from '../data/fellowshipData';
import { ShieldCheck, MessageCircle } from 'lucide-react';
import { McsfLogo } from './McsfLogo';
import { ScrollReveal } from './ScrollReveal';

interface FooterProps {
  onScrollToSection: (section: SectionId) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection, onOpenAdmin }) => {
  return (
    <footer className="bg-[#070708] text-[#FAF6EE] pt-14 pb-12 border-t border-[#27272C]">
      <ScrollReveal afterScroll className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 pb-12 border-b border-[#27272C]">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <McsfLogo size="lg" variant="full" />
              <div>
                <span className="font-display font-black text-lg text-[#FAF6EE] block">
                  MCSF Fellowship
                </span>
                <span className="text-xs text-[#FB923C] font-semibold block">
                  Dagmawi Menelik Health Science College
                </span>
              </div>
            </div>

            <p className="text-xs text-[#E2D6C3]/80 max-w-sm leading-relaxed">
              Menelik Christian Students Fellowship — Disciples of Jesus Christ pursuing medical excellence, bedside compassion, and active clinical intercession together.
            </p>

            <div className="pt-1">
              <a
                href={TELEGRAM_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141417] hover:bg-[#EA580C] text-[#FAF6EE] text-xs font-bold transition-colors border border-[#27272C]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#FB923C]" />
                <span>Join Telegram: @lursuesz</span>
              </a>
            </div>

            <div className="pt-2 space-y-1 text-xs text-[#E2D6C3]/80">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#FB923C]">
                Fellowship Coordinators:
              </div>
              {FELLOWSHIP_LEADERS.map((leader) => (
                <div key={leader.name} className="flex items-center gap-2 tabular-nums">
                  <span className="font-semibold text-[#FAF6EE]">{leader.name}:</span>
                  <a
                    href={`tel:${leader.phone.replace(/\s+/g, '')}`}
                    className="hover:text-[#FB923C] transition-colors"
                  >
                    {leader.phone}
                  </a>
                  <span>·</span>
                  <a
                    href={`https://t.me/${leader.telegramUsername.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FB923C] hover:underline font-medium"
                  >
                    @{leader.telegramUsername}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div className="col-span-1 md:col-span-4 space-y-3">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-[#FB923C]">
              Sections
            </h3>
            <ul className="space-y-2 text-xs text-[#E2D6C3]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('hero')}
                  className="hover:text-[#FB923C] transition-colors"
                >
                  Home &amp; Categories
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('about')}
                  className="hover:text-[#FB923C] transition-colors"
                >
                  About &amp; Vision
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('worship')}
                  className="hover:text-[#FB923C] transition-colors"
                >
                  Worship &amp; Mezmur (YouTube)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('hospital')}
                  className="hover:text-[#FB923C] transition-colors"
                >
                  Adult ICU &amp; Ward Care
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('events')}
                  className="hover:text-[#FB923C] transition-colors"
                >
                  Wednesday Schedule
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('family')}
                  className="hover:text-[#FB923C] transition-colors"
                >
                  Family Day &amp; Circles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('gallery')}
                  className="hover:text-[#FB923C] transition-colors"
                >
                  Photo Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Get Involved Links */}
          <div className="col-span-1 md:col-span-3 space-y-3">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-[#FB923C]">
              Get Involved
            </h3>
            <ul className="space-y-2 text-xs text-[#E2D6C3]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('publications')}
                  className="hover:text-[#FB923C] transition-colors"
                >
                  Devotionals &amp; Ethics
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('register')}
                  className="hover:text-[#FB923C] transition-colors font-bold text-[#FAF6EE]"
                >
                  Register as Member
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('contact')}
                  className="hover:text-[#FB923C] transition-colors"
                >
                  Contact &amp; Prayer Desk
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="hover:text-[#FB923C] transition-colors inline-flex items-center gap-1.5 text-[#E2D6C3]/60"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FB923C]" />
                  <span>Coordinator Records</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E2D6C3]/60">
          <div>
            Disciples of Jesus Christ · Dagmawi Menelik Health Science College, Addis Ababa
          </div>
          <div>&copy; 2026 MCSF Fellowship. All rights reserved.</div>
        </div>
      </ScrollReveal>
    </footer>
  );
};
