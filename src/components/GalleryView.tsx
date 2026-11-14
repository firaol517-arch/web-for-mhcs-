import React, { useState } from 'react';
import { GALLERY_PHOTOS } from '../data/fellowshipData';
import { DetailRoute } from '../types/fellowship';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface GalleryViewProps {
  onOpenDetail: (detail: DetailRoute) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onOpenDetail }) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const tags = [
    'all',
    'Main Fellowship',
    'Worship & Events',
    'Hospital Ministry',
    'Family Day',
    'Anniversary & Milestones',
    'Outreach & Relief',
  ];

  const filteredPhotos =
    selectedTag === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.tag === selectedTag);

  return (
    <section
      id="gallery"
      className="py-16 md:py-24 bg-[#0B0B0C] text-[#FAF6EE] border-b border-[#27272C]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FB923C] font-display block mb-2">
            MCSF Community Archive
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#FAF6EE] text-balance">
            Fellowship Life in Pictures
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#E2D6C3]/85 leading-relaxed">
            From Wednesday worship at Semen Muluwengel and hospital Adult ICU prayer to First Year Anniversary celebrations and Family Day frames. Click any photo card to open its dedicated story page.
          </p>
        </ScrollReveal>

        {/* Interactive Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-4 mb-8">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-[#EA580C] text-white shadow-md font-bold'
                  : 'bg-[#141417] text-[#E2D6C3] border border-[#27272C] hover:border-[#EA580C] hover:text-white'
              }`}
            >
              {tag === 'all' ? `All Moments (${GALLERY_PHOTOS.length})` : tag}
            </button>
          ))}
        </div>

        {/* Clickable Media Grid (Card-to-Detail) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <ScrollReveal key={photo.id} delay={(idx % 3) * 0.05}>
              <button
                type="button"
                onClick={() =>
                  onOpenDetail({ kind: 'photo', id: photo.id, returnSection: 'gallery' })
                }
                className="w-full text-left group cursor-pointer rounded-2xl overflow-hidden bg-[#141417] border border-[#27272C] hover:border-[#EA580C] transition-all duration-300 shadow-lg flex flex-col justify-between h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
                  <img loading="lazy" decoding="async"
                    src={photo.src}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#FB923C]">{photo.tag}</span>
                    {photo.date && <span className="text-[#E2D6C3]/80">{photo.date}</span>}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-[#FAF6EE] group-hover:text-[#FB923C] transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-xs font-medium text-[#E2D6C3]/80 mt-0.5">
                      {photo.subtitle}
                    </p>
                    <p className="text-xs text-[#E2D6C3]/65 mt-2 line-clamp-2 leading-relaxed">
                      {photo.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#27272C] flex items-center justify-between text-xs text-[#FB923C] font-bold">
                    <span>Open Story &amp; Photo</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
