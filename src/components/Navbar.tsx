import React, { useState } from 'react';
import { SectionId } from '../types/fellowship';
import { Menu, X } from 'lucide-react';
import { McsfLogo } from './McsfLogo';
import { AnimatePresence, motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { TELEGRAM_REGISTRATION_BOT } from '../data/fellowshipData';

interface NavbarProps {
  activeSection: SectionId;
  onScrollToSection: (section: SectionId) => void;
  isSubView: boolean;
  onReturnHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onScrollToSection,
  isSubView,
  onReturnHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.002,
  });

  const navLinks: { section: SectionId; label: string }[] = [
    { section: 'about', label: 'About' },
    { section: 'worship', label: 'Mezmur' },
    { section: 'hospital', label: 'Ministry' },
    { section: 'events', label: 'Schedule' },
    { section: 'family', label: 'Family' },
    { section: 'gallery', label: 'Gallery' },
  ];

  const handleLinkClick = (section: SectionId) => {
    setMobileMenuOpen(false);
    onScrollToSection(section);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0B0C]/98 text-[#FAF6EE] border-b border-white/10">
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: smoothProgress }}
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#EA580C] via-[#FB923C] to-[#EA580C] pointer-events-none"
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 md:gap-4 lg:gap-8">
        {/* Zone 1: Clean single-line brand wordmark with emblem */}
        <motion.button
          type="button"
          whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
          onClick={() => (isSubView ? onReturnHome() : handleLinkClick('hero'))}
          className="inline-flex items-center gap-2.5 font-display text-lg sm:text-xl font-black tracking-tight text-[#FAF6EE] hover:text-[#FB923C] transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] rounded"
        >
          <McsfLogo size="sm" />
          <span>MCSF Fellowship</span>
        </motion.button>

        {/* Zone 2: Concise single-line category links with shared layoutId underline */}
        <nav
          className="hidden md:flex items-center gap-3.5 lg:gap-7 text-sm font-medium text-[#E2D6C3]"
          aria-label="Primary Navigation"
        >
          {navLinks.map((link) => {
            const isActive = !isSubView && activeSection === link.section;
            return (
              <button
                key={link.section}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleLinkClick(link.section)}
                className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors ${
                  isActive ? 'text-[#FB923C] font-semibold' : 'hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ type: 'spring', stiffness: 480, damping: 34 }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#EA580C]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary CTA + Mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.a
            href={TELEGRAM_REGISTRATION_BOT}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.03, y: -1 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 shadow-[0_6px_18px_-4px_rgba(234,88,12,0.5)] inline-flex items-center"
          >
            Register
          </motion.a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#FAF6EE] hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-[#141417] border-b border-[#27272C] px-4 py-3 space-y-1"
          >
            <button
              type="button"
              onClick={() => handleLinkClick('hero')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-[#FB923C] hover:bg-[#27272C] transition-colors"
            >
              Home &amp; Categories
            </button>
            {navLinks.map((link) => (
              <button
                key={link.section}
                type="button"
                onClick={() => handleLinkClick(link.section)}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-[#FAF6EE] hover:bg-[#27272C] hover:text-[#FB923C] transition-colors"
              >
                {link.label === 'Mezmur' ? 'Worship & Mezmur' : link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleLinkClick('publications')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-[#FAF6EE] hover:bg-[#27272C] hover:text-[#FB923C] transition-colors"
            >
              Devotionals &amp; Ethics
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-[#FAF6EE] hover:bg-[#27272C] hover:text-[#FB923C] transition-colors"
            >
              Contact &amp; Prayer
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
