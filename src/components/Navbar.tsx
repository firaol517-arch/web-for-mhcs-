import React, { useState } from 'react';
import { SectionId } from '../types/fellowship';
import { Menu, X } from 'lucide-react';
import { McsfLogo } from './McsfLogo';

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
    <header className="sticky top-0 z-50 bg-[#0B0B0C]/95 backdrop-blur-md text-[#FAF6EE] border-b border-[#27272C]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Clean single-line brand wordmark with emblem */}
        <button
          type="button"
          onClick={() => (isSubView ? onReturnHome() : handleLinkClick('hero'))}
          className="inline-flex items-center gap-2.5 font-display text-lg sm:text-xl font-black tracking-tight text-[#FAF6EE] hover:text-[#FB923C] transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] rounded"
        >
          <McsfLogo size="sm" />
          <span>MCSF Fellowship</span>
        </button>

        {/* Zone 2: Concise single-line category links */}
        <nav
          className="hidden md:flex items-center gap-5 text-sm font-medium text-[#E2D6C3]"
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
                className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                  isActive
                    ? 'text-[#FB923C] border-[#EA580C] font-semibold'
                    : 'border-transparent hover:text-white hover:border-[#EA580C]/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary CTA + Mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('register')}
            className="px-4 py-2 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Register
          </button>

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
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#141417] border-b border-[#27272C] px-4 py-3 space-y-1">
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
        </div>
      )}
    </header>
  );
};
