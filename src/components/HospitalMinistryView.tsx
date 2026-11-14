import React from 'react';
import { DetailRoute, SectionId } from '../types/fellowship';
import { MINISTRY_SPOTLIGHTS } from '../data/fellowshipData';
import { CheckCircle2, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface HospitalMinistryViewProps {
  onScrollToSection: (section: SectionId) => void;
  onOpenDetail: (detail: DetailRoute) => void;
}

export const HospitalMinistryView: React.FC<HospitalMinistryViewProps> = ({
  onScrollToSection,
  onOpenDetail,
}) => {
  return (
    <section
      id="hospital"
      className="py-16 md:py-24 bg-[#0B0B0C] text-[#FAF6EE] border-b border-[#27272C]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#FB923C] mb-2">
            Healthcare &amp; ICU Ministry
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#FAF6EE] text-balance">
            Adult ICU &amp; Hospital Ward Care
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#E2D6C3]/85 leading-relaxed">
            As students and future physicians, nurses, pharmacists, and medical laboratory specialists, we unite clinical precision with the healing compassion of Jesus Christ. Click any ministry card to read its full story.
          </p>
        </ScrollReveal>

        {/* Interactive Clickable Ministry Cards */}
        <div className="space-y-8 mb-14">
          {MINISTRY_SPOTLIGHTS.map((ministry, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <ScrollReveal
                key={ministry.id}
                delay={idx * 0.08}
                direction={idx % 2 === 0 ? 'fromLeft' : 'fromRight'}
              >
                <button
                  type="button"
                  onClick={() =>
                    onOpenDetail({ kind: 'ministry', id: ministry.id, returnSection: 'hospital' })
                  }
                  className="w-full text-left rounded-3xl overflow-hidden bg-[#141417] border border-[#27272C] hover:border-[#EA580C] transition-all shadow-xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
                >
                  <div className="grid md:grid-cols-12 items-stretch">
                    <div
                      className={`md:col-span-6 relative h-72 sm:h-96 md:h-auto min-h-[300px] overflow-hidden bg-black ${
                        reverse ? 'md:order-2' : ''
                      }`}
                    >
                      <img
                        src={ministry.image}
                        alt={ministry.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 text-xs font-semibold text-[#FB923C]">
                        {ministry.badge}
                      </div>
                    </div>

                    <div
                      className={`md:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-5 ${
                        reverse ? 'md:order-1' : ''
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="text-xs font-semibold text-[#E2D6C3]/80">
                          {ministry.category} · {ministry.subtitle}
                        </div>
                        <h3 className="font-display font-black text-xl sm:text-2xl text-[#FAF6EE] group-hover:text-[#FB923C] transition-colors text-balance">
                          {ministry.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#E2D6C3]/85 leading-relaxed">
                          {ministry.summary}
                        </p>

                        <div className="space-y-2 pt-2 text-xs sm:text-sm text-[#FAF6EE]/90">
                          {ministry.keyPoints.slice(0, 3).map((pt) => (
                            <div key={pt} className="flex items-center gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-[#FB923C] shrink-0" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#27272C] flex items-center justify-between text-xs font-bold text-[#FB923C]">
                        <span>Open Ministry Details</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Biblical Foundation Banner in Cream & Orange */}
        <ScrollReveal>
          <div className="rounded-3xl p-6 sm:p-10 bg-[#FAF6EE] text-[#0B0B0C] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                Christian Medical Calling
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-[#0B0B0C] text-balance">
                &quot;He sent them out to proclaim the kingdom of God and to heal the sick.&quot;
              </h3>
              <p className="text-xs sm:text-sm text-[#524C44] leading-relaxed">
                Luke 9:2 — In every clinical assessment, bedside prayer, and patient care shift, we serve as instruments of Christ&apos;s healing love in Addis Ababa.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onScrollToSection('register')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0"
            >
              <span>Join Outreach Team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
