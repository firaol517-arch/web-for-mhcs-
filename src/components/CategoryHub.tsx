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
import { McsfLogo } from './McsfLogo';

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
    image: string;
    imageClass?: string;
    icon: React.ComponentType<{ className?: string }>;
    accent?: boolean;
  }[] = [
    {
      id: 'worship',
      title: 'Worship & Mezmur',
      subtitle: 'Ethiopian mezmur YouTube links (Guzo & Efeligihalehu) and our campus worship reel.',
      meta: 'Mezmur Playlist & Video',
      image: '/assets/aistudio/photo_2026-11-12_22-11-52_872f12c6.jpg',
      imageClass: 'object-[center_35%]',
      icon: Music,
      accent: true,
    },
    {
      id: 'events',
      title: 'Wednesday Program',
      subtitle: 'Every Wednesday at 6:00 LT (12:00 PM) at Semen Muluwengel & Genet Church.',
      meta: 'Schedule (Wednesday Only)',
      image: '/assets/aistudio/photo_2026-11-12_22-12-38_ba551819.jpg',
      imageClass: 'object-[center_82%]',
      icon: Calendar,
    },
    {
      id: 'hospital',
      title: 'Adult ICU & Ward Care',
      subtitle: 'Medical trainees & nurses bringing compassionate bedside prayer and patient relief.',
      meta: '3 Ministry Spotlights',
      image: '/assets/aistudio/photo_2026-11-12_18-05-48_2da4c305.jpg',
      imageClass: 'object-[center_30%]',
      icon: HeartPulse,
    },
    {
      id: 'family',
      title: 'Family Day & Circles',
      subtitle: 'Small-group circles, Crown celebrations, First Year Anniversary, and placement form.',
      meta: '6 Family Stories + Join Form',
      image: '/assets/aistudio/photo_2026-11-12_17-45-19_2ed7927b.jpg',
      imageClass: 'object-[center_35%]',
      icon: Users,
    },
    {
      id: 'gallery',
      title: 'Photo Gallery',
      subtitle: 'Browse all 15 campus, outreach, ICU, and anniversary photographs with full stories.',
      meta: '15 Fellowship Photos',
      image: '/assets/aistudio/photo_2026-11-12_17-40-29_01ace01c.jpg',
      imageClass: 'object-[center_45%]',
      icon: Camera,
    },
    {
      id: 'about',
      title: 'About, Vision & FAQs',
      subtitle: 'Who we are at Dagmawi Menelik Health Science College, mission, and common answers.',
      meta: 'Calling & Vision',
      image: '/assets/aistudio/photo_2026-11-12_22-14-56_caf9d87a.jpg',
      imageClass: 'object-[center_35%]',
      icon: Info,
    },
    {
      id: 'publications',
      title: 'Devotionals & Ethics',
      subtitle: 'Healthcare reflections, poetry, and spiritual articles written by MCSF students.',
      meta: '3 Articles',
      image: '/assets/aistudio/photo_2026-11-12_22-15-05_66dd196d.jpg',
      imageClass: 'object-[center_55%]',
      icon: BookOpen,
    },
    {
      id: 'contact',
      title: 'Contact & Prayer Desk',
      subtitle: 'Reach coordinators Bemnet & Gedion, join @lursuesz, or submit a prayer request.',
      meta: 'Bemnet · Gedion · @lursuesz',
      image: '/assets/aistudio/photo_2026-11-12_17-45-11_660624f9.jpg',
      imageClass: 'object-[center_35%]',
      icon: PhoneCall,
    },
  ];

  return (
    <section id="hero" className="py-7 md:py-10 bg-[#FAF6EE] text-[#0B0B0C] border-b border-[#E2D6C3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* All Categories Visual Banner Header with Logo & Fellowship Picture */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-[#0B0B0C] text-[#FAF6EE] border border-[#27272C] shadow-xl"
        >
          {/* Visible Fellowship Picture Backdrop */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <motion.img
              src="/assets/aistudio/photo_2026-11-12_17-40-29_01ace01c.jpg"
              alt=""
              referrerPolicy="no-referrer"
              initial={prefersReducedMotion ? false : { scale: 1.08 }}
              animate={prefersReducedMotion ? undefined : { scale: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover object-center opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C]/90 via-[#0B0B0C]/55 to-[#0B0B0C]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/85 via-transparent to-[#0B0B0C]/30" />
          </div>

          <div className="relative z-10 p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <McsfLogo size="lg" className="shadow-lg" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FB923C] font-display block mb-0.5">
                  All Categories · MCSF Fellowship
                </span>
                <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-[#FAF6EE]">
                  Explore MCSF Fellowship Pages
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              <button
                type="button"
                onClick={() =>
                  onOpenDetail({ kind: 'photo', id: 'hero-group', returnSection: 'hero' })
                }
                className="inline-flex items-center gap-2.5 pr-3.5 pl-1.5 py-1.5 rounded-xl bg-[#141417]/90 hover:bg-[#27272C] text-[#FAF6EE] border border-white/15 hover:border-[#EA580C] transition-colors backdrop-blur-sm"
              >
                <img
                  src="/assets/aistudio/photo_2026-11-12_17-40-29_01ace01c.jpg"
                  alt="MCSF Group Photo"
                  referrerPolicy="no-referrer"
                  className="w-10 h-8 rounded-lg object-cover"
                />
                <span className="text-xs font-bold whitespace-nowrap">Campus Portrait</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FB923C]" />
              </button>

              <button
                type="button"
                onClick={() => onSelectCategory('register')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shadow-md"
              >
                <span>Member Registration</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Category Cards Grid — Pictures on every card + animate one after another */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.38,
                  delay: prefersReducedMotion ? 0 : 0.06 + idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full"
              >
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full text-left rounded-2xl overflow-hidden border transition-all h-full flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] ${
                    cat.accent
                      ? 'bg-[#0B0B0C] text-[#FAF6EE] border-[#27272C] hover:border-[#EA580C] shadow-lg'
                      : 'bg-white text-[#0B0B0C] border-[#E2D6C3] hover:border-[#EA580C] hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Category Card Photo */}
                    <div className="relative h-32 w-full overflow-hidden bg-[#0B0B0C]">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover ${cat.imageClass || 'object-center'} group-hover:scale-105 transition-transform duration-500`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                        <span
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shadow ${
                            cat.accent
                              ? 'bg-[#EA580C] text-white'
                              : 'bg-[#0B0B0C]/85 text-[#FB923C] border border-white/15 backdrop-blur-sm'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#FB923C] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                    <div className="p-4 pb-2">
                      <h2 className="font-display font-bold text-base sm:text-lg group-hover:text-[#EA580C] transition-colors">
                        {cat.title}
                      </h2>
                      <p
                        className={`mt-1 text-xs leading-relaxed ${
                          cat.accent ? 'text-[#E2D6C3]/80' : 'text-[#524C44]'
                        }`}
                      >
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`mx-4 mb-4 mt-2 pt-2.5 border-t text-[11px] font-bold ${
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
