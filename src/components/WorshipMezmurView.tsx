import React, { useState } from 'react';
import { MEZMUR_SONGS, FELLOWSHIP_VIDEO, GALLERY_PHOTOS } from '../data/fellowshipData';
import { DetailRoute, SectionId } from '../types/fellowship';
import { Music, ExternalLink, Play, Pause, ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

interface WorshipMezmurViewProps {
  onOpenDetail: (detail: DetailRoute) => void;
  onNavigateCategory: (section: SectionId) => void;
}

const EqualizerBars: React.FC<{ active: boolean; reducedMotion: boolean | null }> = ({
  active,
  reducedMotion,
}) => {
  const heights = [
    [0.35, 0.95, 0.45, 0.85, 0.35],
    [0.75, 0.35, 1.0, 0.45, 0.75],
    [0.45, 0.85, 0.35, 0.95, 0.45],
    [0.9, 0.4, 0.75, 0.35, 0.9],
  ];

  return (
    <span className="inline-flex items-end gap-0.5 h-3.5" aria-hidden="true">
      {heights.map((keyframes, barIdx) => (
        <motion.span
          key={barIdx}
          className="w-0.5 rounded-full bg-[#FB923C] origin-bottom"
          style={{ height: '14px' }}
          animate={
            active && !reducedMotion
              ? { scaleY: keyframes }
              : { scaleY: active ? 0.85 : 0.35 + (barIdx % 2) * 0.2 }
          }
          transition={
            active && !reducedMotion
              ? {
                  duration: 0.9 + barIdx * 0.14,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : { duration: 0.25 }
          }
        />
      ))}
    </span>
  );
};

export const WorshipMezmurView: React.FC<WorshipMezmurViewProps> = ({
  onOpenDetail,
  onNavigateCategory,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeEmbedId, setActiveEmbedId] = useState<string | null>(null);

  const worshipPhotos = GALLERY_PHOTOS.filter((p) =>
    ['wednesday-prayer-flyer', 'one-week-piyassa', 'menelik-wednesday-dialogue'].includes(p.id)
  );

  return (
    <section id="worship" className="py-12 md:py-16 bg-[#FAF6EE] text-[#0B0B0C]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Category Header */}
        <ScrollReveal className="max-w-2xl space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#EA580C] font-display">
            Worship &amp; Mezmur Playlist
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#0B0B0C] text-balance">
            Praise, Acoustic Worship &amp; Ethiopian Mezmur
          </h1>
          <p className="text-sm sm:text-base text-[#524C44] leading-relaxed">
            Listen to anointed Ethiopian Christian mezmur tracks shared in our Wednesday 6:00 LT fellowships, or watch our live campus worship highlight reel. Click any song button to play or open directly on YouTube.
          </p>
        </ScrollReveal>

        {/* YouTube Mezmur Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {MEZMUR_SONGS.map((song, idx) => {
            const isPlayingInline = activeEmbedId === song.id;
            const thumbUrl = `https://img.youtube.com/vi/${song.youtubeId}/hqdefault.jpg`;

            return (
              <ScrollReveal
                key={song.id}
                delay={idx * 0.08}
                direction={idx % 2 === 0 ? 'fromLeft' : 'fromRight'}
              >
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl overflow-hidden bg-[#0B0B0C] text-[#FAF6EE] border border-[#27272C] hover:border-[#EA580C]/60 transition-colors shadow-xl flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="relative aspect-video w-full bg-black overflow-hidden">
                      <AnimatePresence mode="wait">
                        {isPlayingInline ? (
                          <motion.iframe
                            key="iframe"
                            initial={prefersReducedMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            src={`https://www.youtube.com/embed/${song.youtubeId}?autoplay=1&rel=0`}
                            title={`${song.title} — ${song.artist}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full border-0"
                          />
                        ) : (
                          <motion.div
                            key="thumb"
                            initial={prefersReducedMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                            transition={{ duration: 0.16 }}
                            className="relative w-full h-full"
                          >
                            <img
                              loading="lazy"
                              decoding="async"
                              src={thumbUrl}
                              alt={`${song.title} — ${song.artist}`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                            <button
                              type="button"
                              onClick={() => setActiveEmbedId(song.id)}
                              aria-label={`Play ${song.title} inline`}
                              className="absolute inset-0 flex items-center justify-center group"
                            >
                              <motion.span
                                whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
                                whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                                className="w-16 h-16 rounded-full bg-[#EA580C] group-hover:bg-[#C2410C] text-white flex items-center justify-center shadow-2xl transition-colors"
                              >
                                <Play className="w-7 h-7 fill-white ml-1" />
                              </motion.span>
                            </button>
                            <div className="absolute bottom-3 left-4 text-xs font-semibold text-[#FB923C]">
                              {song.tag}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="p-6 space-y-2.5">
                      <div className="flex items-center justify-between gap-2 text-xs text-[#FB923C] font-semibold">
                        <div className="flex items-center gap-2">
                          <Music className="w-4 h-4" />
                          <span>{song.artist}</span>
                        </div>
                        <EqualizerBars active={isPlayingInline} reducedMotion={prefersReducedMotion} />
                      </div>
                      <h2 className="font-display font-black text-xl sm:text-2xl text-[#FAF6EE]">
                        {song.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#E2D6C3]/85 leading-relaxed">
                        {song.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-[#27272C] flex flex-wrap items-center gap-3">
                    <motion.a
                      whileHover={prefersReducedMotion ? undefined : { y: -1, scale: 1.02 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                      href={song.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap"
                    >
                      <span>Listen on YouTube</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>

                    <motion.button
                      type="button"
                      whileHover={prefersReducedMotion ? undefined : { y: -1, scale: 1.02 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                      onClick={() => setActiveEmbedId(isPlayingInline ? null : song.id)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141417] hover:bg-[#27272C] text-[#FAF6EE] border border-[#27272C] text-xs font-semibold transition-colors whitespace-nowrap"
                    >
                      {isPlayingInline ? (
                        <>
                          <Pause className="w-3.5 h-3.5 text-[#FB923C]" />
                          <span>Close Player</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-[#FB923C]" />
                          <span>Play Here</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* MCSF Uploaded Worship Reel */}
        <ScrollReveal>
          <div className="rounded-3xl p-6 sm:p-8 bg-[#0B0B0C] text-[#FAF6EE] border border-[#27272C] shadow-xl">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FB923C]">
                  MCSF Campus Highlight Reel
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FAF6EE]">
                  {FELLOWSHIP_VIDEO.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#E2D6C3]/85 leading-relaxed">
                  {FELLOWSHIP_VIDEO.description}
                </p>
                <div className="pt-2">
                  <motion.button
                    type="button"
                    whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                    onClick={() => onNavigateCategory('events')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs sm:text-sm font-bold transition-colors"
                  >
                    <span>See Wednesday Worship Time</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden border border-[#27272C] bg-black shadow-lg">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={FELLOWSHIP_VIDEO.poster}
                    className="w-full max-h-[360px] object-contain bg-black"
                  >
                    <source src={FELLOWSHIP_VIDEO.src} type="video/mp4" />
                    Your browser does not support embedded video playback.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Wednesday Worship Visual Moments */}
        <div className="space-y-4">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0B0B0C]">
            Wednesday Fellowship &amp; Piyassa Gatherings
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {worshipPhotos.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  onOpenDetail({ kind: 'photo', id: item.id, returnSection: 'worship' })
                }
                className="text-left group rounded-2xl overflow-hidden bg-white border border-[#E2D6C3] hover:border-[#EA580C] transition-all shadow-sm flex flex-col justify-between"
              >
                <div className="h-52 w-full bg-[#0B0B0C] overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src={item.src}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <div className="text-xs font-semibold text-[#EA580C]">{item.date}</div>
                  <h3 className="font-display font-bold text-sm text-[#0B0B0C] group-hover:text-[#EA580C]">
                    {item.title}
                  </h3>
                  <div className="pt-2 text-xs font-bold text-[#EA580C] inline-flex items-center gap-1">
                    <span>Open Story</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
