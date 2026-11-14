import React from 'react';
import { MEZMUR_SONGS } from '../data/fellowshipData';
import { DetailRoute, SectionId } from '../types/fellowship';
import {
  Info,
  Music,
  HeartPulse,
  Calendar,
  Users,
  Camera,
  BookOpen,
  PhoneCall,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

interface CategoryHubProps {
  onSelectCategory: (section: SectionId) => void;
  onOpenDetail: (detail: DetailRoute) => void;
}

export const CategoryHub: React.FC<CategoryHubProps> = ({
  onSelectCategory,
  onOpenDetail,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const categories: {
    id: SectionId;
    title: string;
    subtitle: string;
    meta: string;
    icon: React.ComponentType<{ className?: string }>;
    accent?: boolean;
  }[] = [
    {
      id: 'worship',
      title: 'Worship & Mezmur',
      subtitle: 'Ethiopian mezmur YouTube links (Guzo & Efeligihalehu) and our campus worship reel.',
      meta: 'Mezmur Playlist & Video',
      icon: Music,
      accent: true,
    },
    {
      id: 'events',
      title: 'Wednesday Program',
      subtitle: 'Every Wednesday at 6:00 LT (12:00 PM) at Semen Muluwengel & Genet Church.',
      meta: 'Schedule (Wednesday Only)',
      icon: Calendar,
    },
    {
      id: 'hospital',
      title: 'Adult ICU & Ward Care',
      subtitle: 'Medical trainees & nurses bringing compassionate bedside prayer and patient relief.',
      meta: '3 Ministry Spotlights',
      icon: HeartPulse,
    },
    {
      id: 'family',
      title: 'Family Day & Circles',
      subtitle: 'Small-group circles, Crown celebrations, First Year Anniversary, and placement form.',
      meta: '6 Family Stories + Join Form',
      icon: Users,
    },
    {
      id: 'gallery',
      title: 'Photo Gallery',
      subtitle: 'Browse all 15 campus, outreach, ICU, and anniversary photographs with full stories.',
      meta: '15 Fellowship Photos',
      icon: Camera,
    },
    {
      id: 'about',
      title: 'About, Vision & FAQs',
      subtitle: 'Who we are at Dagmawi Menelik Health Science College, mission, and common answers.',
      meta: 'Calling & Vision',
      icon: Info,
    },
    {
      id: 'publications',
      title: 'Devotionals & Ethics',
      subtitle: 'Healthcare reflections, poetry, and spiritual articles written by MCSF students.',
      meta: '3 Articles',
      icon: BookOpen,
    },
    {
      id: 'contact',
      title: 'Contact & Prayer Desk',
      subtitle: 'Reach coordinators Bemnet & Gedion, join @lursuesz, or submit a prayer request.',
      meta: 'Bemnet · Gedion · @lursuesz',
      icon: PhoneCall,
    },
  ];

  return (
    <section id="categories" className="scroll-mt-16 py-10 md:py-14 bg-[#FAF6EE] text-[#0B0B0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Directory Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] font-display block mb-1">
              All Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-[#0B0B0C]">
              Explore MCSF Fellowship Pages
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onSelectCategory('register')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap self-start md:self-auto"
          >
            <span>Member Registration</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </ScrollReveal>

        {/* Category Cards Grid — Cards animate one after another */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some', margin: '0px 0px -85px 0px' }}
                transition={{
                  duration: 0.72,
                  delay: prefersReducedMotion ? 0 : (idx % 4) * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full"
              >
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full text-left rounded-2xl p-5 border transition-all h-full flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] ${
                    cat.accent
                      ? 'bg-[#0B0B0C] text-[#FAF6EE] border-[#27272C] hover:border-[#EA580C] shadow-lg'
                      : 'bg-white text-[#0B0B0C] border-[#E2D6C3] hover:border-[#EA580C] hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          cat.accent
                            ? 'bg-[#EA580C] text-white'
                            : 'bg-[#FAF6EE] text-[#EA580C] border border-[#E2D6C3]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <ArrowUpRight
                        className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                          cat.accent ? 'text-[#FB923C]' : 'text-[#EA580C]'
                        }`}
                      />
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg group-hover:text-[#EA580C] transition-colors">
                      {cat.title}
                    </h3>
                    <p
                      className={`mt-1.5 text-xs leading-relaxed ${
                        cat.accent ? 'text-[#E2D6C3]/80' : 'text-[#524C44]'
                      }`}
                    >
                      {cat.subtitle}
                    </p>
                  </div>
                  <div
                    className={`mt-4 pt-3 border-t text-[11px] font-bold ${
                      cat.accent
                        ? 'border-[#27272C] text-[#FB923C]'
                        : 'border-[#F2EBE0] text-[#EA580C]'
                    }`}
                  >
                    {cat.meta}
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Direct YouTube Mezmur Listen Strip */}
        <ScrollReveal>
          <div className="rounded-3xl p-6 sm:p-8 bg-[#0B0B0C] text-[#FAF6EE] border border-[#27272C] shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FB923C]">
                <Music className="w-4 h-4" />
                <span>YouTube Mezmur Worship Links</span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-[#FAF6EE]">
                Listen to Fellowship Mezmur Favorites
              </h3>
              <p className="text-xs sm:text-sm text-[#E2D6C3]/80 leading-relaxed">
                Tap a song button below to listen immediately on YouTube, or open the Worship &amp; Mezmur category to play inside the site.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {MEZMUR_SONGS.map((song) => (
                <a
                  key={song.id}
                  href={song.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap"
                >
                  <Music className="w-4 h-4" />
                  <span>{song.title}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
              <button
                type="button"
                onClick={() => onOpenDetail({ kind: 'photo', id: 'wednesday-prayer-flyer', returnSection: 'hero' })}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#141417] hover:bg-[#27272C] text-[#FAF6EE] border border-[#27272C] text-xs font-semibold transition-colors whitespace-nowrap"
              >
                <span>Wed 6:00 LT Flyer</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FB923C]" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
