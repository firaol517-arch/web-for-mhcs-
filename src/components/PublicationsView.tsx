import React, { useState } from 'react';
import { MCSF_PUBLICATIONS } from '../data/fellowshipData';
import { DetailRoute } from '../types/fellowship';
import { filterPublicationsList } from '../utils/fellowship';
import { Heart, Search, Clock, MessageSquare, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface PublicationsViewProps {
  onOpenDetail: (detail: DetailRoute) => void;
}

export const PublicationsView: React.FC<PublicationsViewProps> = ({ onOpenDetail }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [likesMap] = useState<Record<string, { count: number; liked: boolean }>>(() => {
    try {
      const stored = localStorage.getItem('mcsf_pub_likes');
      if (stored) return JSON.parse(stored);
    } catch {}
    const defaults: Record<string, { count: number; liked: boolean }> = {};
    MCSF_PUBLICATIONS.forEach((p) => {
      defaults[p.id] = { count: p.likes, liked: false };
    });
    return defaults;
  });

  const [commentsMap] = useState<Record<string, unknown[]>>(() => {
    try {
      const stored = localStorage.getItem('mcsf_pub_comments');
      if (stored) return JSON.parse(stored);
    } catch {}
    return { 'pub-med-1': [{}] };
  });

  const categories = ['all', 'Medical Ethics', 'Devotional', 'Poem'];

  const filteredPubs = filterPublicationsList(MCSF_PUBLICATIONS, selectedCategory, searchQuery);

  return (
    <section
      id="publications"
      className="py-16 md:py-24 bg-[#FAF6EE] text-[#0B0B0C] border-b border-[#E2D6C3]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] font-display block mb-2">
            MCSF Publications &amp; Articles
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#0B0B0C] text-balance">
            Healthcare Reflections &amp; Devotionals
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#524C44] leading-relaxed">
            Spiritual devotionals, medical ethics insights, poetry, and testimonies written by Dagmawi Menelik Health Science College fellows. Click any reflection to open the full reading page.
          </p>
        </ScrollReveal>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0B0B0C] text-[#FAF6EE] font-bold shadow-sm'
                    : 'bg-white text-[#524C44] border border-[#E2D6C3] hover:border-[#EA580C] hover:text-[#0B0B0C]'
                }`}
              >
                {cat === 'all' ? 'All Reflections' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#EA580C] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, author, ward..."
              aria-label="Search publications"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#E2D6C3] text-xs text-[#0B0B0C] focus:outline-none focus:border-[#EA580C]"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPubs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#E2D6C3] text-sm text-[#524C44]">
            No matching reflections found. Try clearing your search filter.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredPubs.map((pub, idx) => {
              const likeInfo = likesMap[pub.id] || { count: pub.likes, liked: false };
              const commentsCount = (commentsMap[pub.id] || []).length;

              return (
                <ScrollReveal key={pub.id} delay={idx * 0.06}>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenDetail({
                        kind: 'publication',
                        id: pub.id,
                        returnSection: 'publications',
                      })
                    }
                    className="w-full text-left bg-white rounded-3xl overflow-hidden border border-[#E2D6C3] hover:border-[#EA580C] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group shadow-sm h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
                  >
                    <div>
                      {pub.coverImage && (
                        <div className="h-44 w-full bg-[#0B0B0C] overflow-hidden">
                          <img
                            src={pub.coverImage}
                            alt={pub.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      <div className="p-6 pb-2">
                        <div className="flex items-center gap-2 text-xs text-[#6C6358] mb-2">
                          <span className="font-bold text-[#EA580C]">{pub.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{pub.readTime}</span>
                          </span>
                        </div>

                        <h3 className="font-display font-extrabold text-base sm:text-lg text-[#0B0B0C] group-hover:text-[#EA580C] transition-colors line-clamp-2">
                          {pub.title}
                        </h3>

                        <p className="mt-2.5 text-xs text-[#524C44] leading-relaxed line-clamp-3">
                          {pub.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-4 mt-4 border-t border-[#F2EBE0] flex items-center justify-between text-xs w-full">
                      <div className="flex items-center gap-3 text-[#6C6358] tabular-nums">
                        <span className="inline-flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-[#EA580C]" />
                          <span>{likeInfo.count}</span>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{commentsCount}</span>
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 font-bold text-[#EA580C]">
                        <span>Read Article</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
