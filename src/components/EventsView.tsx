import React, { useState } from 'react';
import { MCSF_EVENTS } from '../data/fellowshipData';
import { DetailRoute } from '../types/fellowship';
import { formatEthiopianTimeGuide } from '../utils/fellowship';
import { Clock, MapPin, Bookmark, ArrowUpRight, Check } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface EventsViewProps {
  onOpenDetail: (detail: DetailRoute) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ onOpenDetail }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [savedEvents, setSavedEvents] = useState<string[]>(['evt-wednesday-prayer']);
  const [interactiveEthHour, setInteractiveEthHour] = useState<number>(6);

  const categories = [
    { id: 'all', label: 'All Gatherings' },
    { id: 'Main Fellowship', label: 'Weekly Worship' },
    { id: 'Hospital & Ward Prayer', label: 'ICU & Ward Prayer' },
    { id: 'Family Circle', label: 'Family Circles' },
    { id: 'Annual Retreat', label: 'Retreats' },
  ];

  const filteredEvents =
    selectedCategory === 'all'
      ? MCSF_EVENTS
      : MCSF_EVENTS.filter((e) => e.category === selectedCategory);

  const toggleSaveEvent = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedEvents((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const timeGuide = formatEthiopianTimeGuide(interactiveEthHour);

  return (
    <section
      id="events"
      className="py-16 md:py-24 bg-[#FAF6EE] text-[#0B0B0C] border-b border-[#E2D6C3]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] font-display block mb-2">
            MCSF Gatherings &amp; Shifts
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#0B0B0C] text-balance">
            Fellowship &amp; Hospital Schedule
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#524C44] leading-relaxed">
            Our main weekly fellowship meets every Wednesday at 6:00 LT (12:00 PM) at Semen Muluwengel and Genet Church, alongside hospital ward prayer and Family Circles. Click any event card for details.
          </p>
        </ScrollReveal>

        {/* Ethiopian Time Conversion Helper */}
        <ScrollReveal className="mb-10">
          <div className="rounded-2xl p-5 sm:p-6 bg-white border border-[#E2D6C3] shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#0B0B0C] text-[#FB923C]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-[#0B0B0C]">
                    Ethiopian Local Time Reference
                  </h3>
                  <p className="text-xs text-[#524C44]">
                    Gatherings follow Ethiopian local time (main program Wednesday <strong>6:00 LT</strong> = 12:00 PM; ICU prayer <strong>11:00 LT</strong> = 5:00 PM).
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 bg-[#FAF6EE] px-3.5 py-2.5 rounded-xl border border-[#E2D6C3] w-full sm:w-auto justify-between sm:justify-start">
                <label htmlFor="eth-hour-select" className="text-xs font-semibold text-[#524C44] shrink-0">
                  Local Time:
                </label>
                <select
                  id="eth-hour-select"
                  value={interactiveEthHour}
                  onChange={(e) => setInteractiveEthHour(Number(e.target.value))}
                  className="min-w-0 max-w-full flex-1 sm:flex-initial text-xs font-bold text-[#0B0B0C] bg-white border border-[#E2D6C3] rounded px-2 py-1 focus:outline-none focus:border-[#EA580C]"
                >
                  <option value={1}>1:00 LT (7:00 AM)</option>
                  <option value={2}>2:00 LT (8:00 AM)</option>
                  <option value={6}>6:00 LT (12:00 PM - Wed Worship)</option>
                  <option value={8}>8:00 LT (2:00 PM - Afternoon)</option>
                  <option value={11}>11:00 LT (5:00 PM - ICU Prayer)</option>
                </select>
                <span className="text-xs font-bold text-[#EA580C] sm:pl-2 sm:border-l border-[#E2D6C3] tabular-nums whitespace-nowrap">
                  = {timeGuide.standardTimeString}
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#0B0B0C] text-[#FAF6EE] font-bold shadow-sm'
                  : 'bg-white text-[#524C44] border border-[#E2D6C3] hover:border-[#EA580C] hover:text-[#0B0B0C]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Clickable Events Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredEvents.map((evt, idx) => {
            const isSaved = savedEvents.includes(evt.id);
            return (
              <ScrollReveal key={evt.id} delay={idx * 0.06}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    onOpenDetail({ kind: 'event', id: evt.id, returnSection: 'events' })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenDetail({ kind: 'event', id: evt.id, returnSection: 'events' });
                    }
                  }}
                  className="bg-white rounded-3xl overflow-hidden border border-[#E2D6C3] shadow-sm hover:border-[#EA580C] hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
                >
                  {evt.image && (
                    <div className="relative h-44 w-full bg-[#0B0B0C] overflow-hidden">
                      <img
                        src={evt.image}
                        alt={evt.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <button
                        type="button"
                        onClick={(e) => toggleSaveEvent(e, evt.id)}
                        className={`absolute top-3 right-3 p-2 rounded-lg border transition-colors ${
                          isSaved
                            ? 'bg-[#EA580C] text-white border-[#EA580C]'
                            : 'bg-black/60 text-white hover:bg-black border-white/20'
                        }`}
                        title={isSaved ? 'Bookmarked' : 'Bookmark this event'}
                        aria-label={`Bookmark ${evt.title}`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#6C6358] mb-2">
                        <span className="font-bold text-[#EA580C]">{evt.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{evt.status}</span>
                      </div>

                      <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#0B0B0C] group-hover:text-[#EA580C] transition-colors">
                        {evt.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-[#524C44] leading-relaxed">
                        {evt.description}
                      </p>

                      <div className="mt-4 space-y-2 border-t border-[#F2EBE0] pt-4 text-xs text-[#524C44]">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#EA580C] shrink-0" />
                          <span>
                            <strong className="text-[#0B0B0C]">{evt.schedule}</strong> ·{' '}
                            {evt.ethiopianTime} ({evt.standardTime})
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#EA580C] shrink-0" />
                          <span>{evt.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#F2EBE0] flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold text-[#0B0B0C] inline-flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#EA580C]" />
                        <span>Open for all departments</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#EA580C] group-hover:translate-x-0.5 transition-transform whitespace-nowrap">
                        <span>Full Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
