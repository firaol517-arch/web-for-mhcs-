import React, { useState, useEffect } from 'react';
import {
  DetailRoute,
  GalleryPhoto,
  EventItem,
  PublicationItem,
  MinistrySpotlight,
  SectionId,
} from '../types/fellowship';
import {
  GALLERY_PHOTOS,
  MCSF_EVENTS,
  MCSF_PUBLICATIONS,
  MINISTRY_SPOTLIGHTS,
  TELEGRAM_CHANNEL,
} from '../data/fellowshipData';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Heart,
  MessageSquare,
  Send,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface DetailViewProps {
  detail: DetailRoute;
  onBack: (section?: SectionId) => void;
  onSelectDetail: (detail: DetailRoute) => void;
  onNavigateToSection: (section: SectionId) => void;
}

interface CommentEntry {
  id: string;
  name: string;
  dept?: string;
  text: string;
  date: string;
}

export const DetailView: React.FC<DetailViewProps> = ({
  detail,
  onBack,
  onSelectDetail,
  onNavigateToSection,
}) => {
  const [likesMap, setLikesMap] = useState<Record<string, { count: number; liked: boolean }>>(() => {
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

  const [commentsMap, setCommentsMap] = useState<Record<string, CommentEntry[]>>(() => {
    try {
      const stored = localStorage.getItem('mcsf_pub_comments');
      if (stored) return JSON.parse(stored);
    } catch {}
    return {
      'pub-med-1': [
        {
          id: 'c1',
          name: 'Intern Nurse Bethlehem',
          dept: 'Nursing & Adult ICU',
          text: 'This encouraged our night shift team so deeply. Remembering that Christ is right there in the ICU gives us fresh strength.',
          date: 'Nov 10, 2026',
        },
      ],
    };
  });

  const [commentName, setCommentName] = useState('');
  const [commentDept, setCommentDept] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [detail.kind, detail.id]);

  const handleLike = (id: string) => {
    setLikesMap((prev) => {
      const current = prev[id] || { count: 0, liked: false };
      const next = {
        count: current.liked ? current.count - 1 : current.count + 1,
        liked: !current.liked,
      };
      const updated = { ...prev, [id]: next };
      try {
        localStorage.setItem('mcsf_pub_likes', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handlePostComment = (e: React.FormEvent, articleId: string) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment: CommentEntry = {
      id: 'c-' + Date.now(),
      name: commentName.trim(),
      dept: commentDept.trim() || 'Health Sciences Student',
      text: commentText.trim(),
      date: 'Just now',
    };

    setCommentsMap((prev) => {
      const list = prev[articleId] || [];
      const updated = { ...prev, [articleId]: [newComment, ...list] };
      try {
        localStorage.setItem('mcsf_pub_comments', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 3000);
  };

  // Resolve active entity & siblings for Next/Prev
  let backLabel = 'Back to Overview';
  if (detail.kind === 'photo') backLabel = 'Back to Gallery';
  if (detail.kind === 'event') backLabel = 'Back to Schedule';
  if (detail.kind === 'ministry') backLabel = 'Back to Hospital Ministry';
  if (detail.kind === 'publication') backLabel = 'Back to Reflections';

  const renderPhotoDetail = (photo: GalleryPhoto) => {
    const idx = GALLERY_PHOTOS.findIndex((p) => p.id === photo.id);
    const prev = idx > 0 ? GALLERY_PHOTOS[idx - 1] : GALLERY_PHOTOS[GALLERY_PHOTOS.length - 1];
    const next = idx < GALLERY_PHOTOS.length - 1 ? GALLERY_PHOTOS[idx + 1] : GALLERY_PHOTOS[0];
    const related = GALLERY_PHOTOS.filter((p) => p.id !== photo.id).slice(0, 3);

    return (
      <div className="space-y-12">
        {/* Hero Media Split on Obsidian Matte Stage */}
        <div className="rounded-3xl overflow-hidden bg-[#0B0B0C] text-[#FAF6EE] border border-[#27272C] shadow-2xl">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-7 bg-[#0B0B0C] flex items-center justify-center p-4 sm:p-6 overflow-hidden relative">
              <img
                src={photo.src}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[70vh] object-contain rounded-xl shadow-lg"
              />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-[#141417]">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#E2D6C3]">
                  <span className="text-[#EA580C] font-bold">{photo.tag}</span>
                  {photo.date && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{photo.date}</span>
                    </>
                  )}
                  {photo.location && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{photo.location}</span>
                    </>
                  )}
                </div>

                <h1 className="font-display font-black text-2xl sm:text-3xl text-[#FAF6EE] leading-tight text-balance">
                  {photo.title}
                </h1>
                <p className="text-sm font-medium text-[#FB923C]">{photo.subtitle}</p>
                <p className="text-sm text-[#FAF6EE]/85 leading-relaxed">{photo.description}</p>

                {photo.story && photo.story.length > 0 && (
                  <div className="pt-4 border-t border-[#27272C] space-y-3 text-sm text-[#E2D6C3]/85 leading-relaxed">
                    {photo.story.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-8 mt-6 border-t border-[#27272C] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectDetail({ kind: 'photo', id: prev.id, returnSection: detail.returnSection })}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0B0B0C] hover:bg-[#EA580C] text-[#FAF6EE] text-xs font-semibold border border-[#27272C] transition-colors whitespace-nowrap"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectDetail({ kind: 'photo', id: next.id, returnSection: detail.returnSection })}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0B0B0C] hover:bg-[#EA580C] text-[#FAF6EE] text-xs font-semibold border border-[#27272C] transition-colors whitespace-nowrap"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigateToSection('register')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold transition-colors whitespace-nowrap"
                >
                  <span>Join Fellowship</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Photos */}
        <div>
          <h2 className="font-display font-bold text-xl text-[#0B0B0C] mb-5">
            More Moments from MCSF
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {related.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectDetail({ kind: 'photo', id: item.id, returnSection: detail.returnSection })}
                className="text-left group rounded-2xl overflow-hidden bg-white border border-[#E2D6C3] hover:border-[#EA580C] transition-all shadow-sm"
              >
                <div className="h-48 w-full overflow-hidden bg-[#0B0B0C]">
                  <img
                    src={item.src}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-[#EA580C] font-semibold">{item.tag}</div>
                  <h3 className="font-display font-bold text-sm text-[#0B0B0C] mt-1 group-hover:text-[#EA580C] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderMinistryDetail = (ministry: MinistrySpotlight) => {
    const others = MINISTRY_SPOTLIGHTS.filter((m) => m.id !== ministry.id);

    return (
      <div className="space-y-12">
        <div className="rounded-3xl overflow-hidden bg-white border border-[#E2D6C3] shadow-lg">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[480px] bg-[#0B0B0C]">
              <img
                src={ministry.image}
                alt={ministry.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-[#6C6358]">
                  <span className="text-[#EA580C] font-bold">{ministry.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{ministry.subtitle}</span>
                </div>

                <h1 className="font-display font-black text-2xl sm:text-4xl text-[#0B0B0C] leading-tight text-balance">
                  {ministry.title}
                </h1>
                <p className="text-sm sm:text-base text-[#524C44] leading-relaxed">
                  {ministry.summary}
                </p>

                <div className="space-y-2.5 pt-2">
                  <h3 className="font-display font-bold text-sm text-[#0B0B0C]">
                    Ministry Activities & Care Protocols
                  </h3>
                  <ul className="space-y-2">
                    {ministry.keyPoints.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm text-[#524C44]">
                        <CheckCircle2 className="w-4 h-4 text-[#EA580C] mt-0.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E2D6C3] space-y-3 text-sm text-[#524C44] leading-relaxed">
                  {ministry.fullStory.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {ministry.scripture && (
                  <blockquote className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E2D6C3] text-sm font-medium text-[#0B0B0C] italic">
                    {ministry.scripture}
                  </blockquote>
                )}
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigateToSection('register')}
                  className="px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs sm:text-sm transition-colors inline-flex items-center gap-2"
                >
                  <span>Volunteer for This Ministry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateToSection('contact')}
                  className="px-5 py-2.5 rounded-xl bg-[#0B0B0C] hover:bg-[#27272C] text-[#FAF6EE] font-semibold text-xs sm:text-sm transition-colors"
                >
                  Submit Patient Prayer Request
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {others.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelectDetail({ kind: 'ministry', id: m.id, returnSection: detail.returnSection })}
              className="text-left flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#E2D6C3] hover:border-[#EA580C] transition-all group"
            >
              <img
                src={m.image}
                alt={m.title}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-xl object-cover shrink-0 bg-[#0B0B0C]"
              />
              <div>
                <div className="text-xs font-bold text-[#EA580C]">{m.category}</div>
                <h3 className="font-display font-bold text-base text-[#0B0B0C] group-hover:text-[#EA580C] transition-colors mt-0.5">
                  {m.title}
                </h3>
                <p className="text-xs text-[#524C44] line-clamp-2 mt-1">{m.summary}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderEventDetail = (evt: EventItem) => {
    const others = MCSF_EVENTS.filter((e) => e.id !== evt.id).slice(0, 2);

    return (
      <div className="space-y-12">
        <div className="rounded-3xl overflow-hidden bg-white border border-[#E2D6C3] shadow-lg">
          {evt.image && (
            <div className="relative h-64 sm:h-96 bg-[#0B0B0C] overflow-hidden">
              <img
                src={evt.image}
                alt={evt.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-[#FAF6EE]">
                <div className="text-xs font-semibold text-[#FB923C]">
                  {evt.category} · {evt.status}
                </div>
                <h1 className="font-display font-black text-2xl sm:text-4xl mt-1 text-balance">
                  {evt.title}
                </h1>
              </div>
            </div>
          )}

          <div className="p-6 sm:p-10 space-y-6">
            {!evt.image && (
              <div>
                <div className="text-xs font-semibold text-[#EA580C]">
                  {evt.category} · {evt.status}
                </div>
                <h1 className="font-display font-black text-2xl sm:text-4xl text-[#0B0B0C] mt-1">
                  {evt.title}
                </h1>
              </div>
            )}

            <div className="grid sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#FAF6EE] border border-[#E2D6C3] text-sm">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#EA580C] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-[#6C6358]">Schedule</div>
                  <div className="font-bold text-[#0B0B0C]">{evt.schedule}</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#EA580C] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-[#6C6358]">Time</div>
                  <div className="font-bold text-[#0B0B0C]">
                    {evt.ethiopianTime} ({evt.standardTime})
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#EA580C] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-[#6C6358]">Location</div>
                  <div className="font-bold text-[#0B0B0C]">{evt.location}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="font-display font-bold text-lg text-[#0B0B0C]">About This Gathering</h2>
              <p className="text-sm sm:text-base text-[#524C44] leading-relaxed">{evt.description}</p>
            </div>

            {evt.highlights && evt.highlights.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-display font-bold text-base text-[#0B0B0C]">What to Expect</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {evt.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#FAF6EE] border border-[#E2D6C3] text-sm text-[#0B0B0C]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#EA580C] mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 rounded-xl bg-[#0B0B0C] text-[#FAF6EE] text-xs sm:text-sm">
              <strong className="text-[#FB923C]">Healthcare Student Shift Note:</strong> If you are assigned to hospital ward or ICU duty during this gathering, reach out so our shift prayer partners can cover you in prayer.
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigateToSection('register')}
                className="px-6 py-3 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs sm:text-sm transition-colors inline-flex items-center gap-2"
              >
                <span>Register & Connect</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={TELEGRAM_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#FAF6EE] hover:bg-[#F2EBE0] text-[#0B0B0C] border border-[#E2D6C3] font-semibold text-xs sm:text-sm transition-colors"
              >
                Updates on Telegram (@lursuesz)
              </a>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {others.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => onSelectDetail({ kind: 'event', id: o.id, returnSection: detail.returnSection })}
              className="text-left p-5 rounded-2xl bg-white border border-[#E2D6C3] hover:border-[#EA580C] transition-all group"
            >
              <div className="text-xs font-bold text-[#EA580C]">
                {o.category} · {o.ethiopianTime}
              </div>
              <h3 className="font-display font-bold text-base text-[#0B0B0C] group-hover:text-[#EA580C] mt-1">
                {o.title}
              </h3>
              <p className="text-xs text-[#524C44] mt-1 line-clamp-2">{o.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderPublicationDetail = (pub: PublicationItem) => {
    const likeInfo = likesMap[pub.id] || { count: pub.likes, liked: false };
    const comments = commentsMap[pub.id] || [];
    const others = MCSF_PUBLICATIONS.filter((p) => p.id !== pub.id);

    return (
      <div className="space-y-12 max-w-4xl mx-auto">
        <article className="rounded-3xl overflow-hidden bg-white border border-[#E2D6C3] shadow-lg">
          {pub.coverImage && (
            <div className="h-64 sm:h-80 w-full bg-[#0B0B0C] overflow-hidden">
              <img
                src={pub.coverImage}
                alt={pub.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#6C6358] mb-3">
              <span className="font-bold text-[#EA580C]">{pub.category}</span>
              <span aria-hidden="true">·</span>
              <span>{pub.date}</span>
              <span aria-hidden="true">·</span>
              <span>{pub.readTime}</span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-4xl text-[#0B0B0C] leading-tight text-balance">
              {pub.title}
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-[#524C44]">
              By <strong className="text-[#0B0B0C]">{pub.author}</strong> ({pub.authorRole})
            </p>

            <div className="mt-8 pt-6 border-t border-[#E2D6C3] space-y-4 text-sm sm:text-base text-[#36312B] leading-relaxed">
              {pub.content.map((p, idx) =>
                p === '' ? <div key={idx} className="h-2" /> : <p key={idx}>{p}</p>
              )}
            </div>

            {/* Like Bar */}
            <div className="mt-8 pt-6 border-t border-[#E2D6C3] flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleLike(pub.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-colors ${
                  likeInfo.liked
                    ? 'bg-[#FFF1E6] text-[#EA580C] border-[#EA580C]'
                    : 'bg-[#FAF6EE] text-[#0B0B0C] border-[#E2D6C3] hover:border-[#EA580C]'
                }`}
              >
                <Heart className={`w-4 h-4 ${likeInfo.liked ? 'fill-[#EA580C] text-[#EA580C]' : ''}`} />
                <span>{likeInfo.count} Appreciations</span>
              </button>

              <span className="text-xs text-[#6C6358] inline-flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#EA580C]" />
                <span>{comments.length} Encouragements</span>
              </span>
            </div>

            {/* Comments Section */}
            <div className="mt-8 pt-6 border-t border-[#E2D6C3]">
              <h2 className="font-display font-bold text-base sm:text-lg text-[#0B0B0C] mb-4">
                Comments & Clinical Encouragements
              </h2>

              <form onSubmit={(e) => handlePostComment(e, pub.id)} className="space-y-3 mb-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="Your Name"
                    className="px-3.5 py-2.5 rounded-xl bg-[#FAF6EE] border border-[#E2D6C3] text-xs sm:text-sm text-[#0B0B0C] focus:outline-none focus:border-[#EA580C]"
                    required
                  />
                  <input
                    type="text"
                    value={commentDept}
                    onChange={(e) => setCommentDept(e.target.value)}
                    placeholder="Department (e.g. Clinical Medicine)"
                    className="px-3.5 py-2.5 rounded-xl bg-[#FAF6EE] border border-[#E2D6C3] text-xs sm:text-sm text-[#0B0B0C] focus:outline-none focus:border-[#EA580C]"
                  />
                </div>
                <div className="flex gap-2">
                  <textarea
                    rows={2}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share an encouragement, testimony, or prayer..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6EE] border border-[#E2D6C3] text-xs sm:text-sm text-[#0B0B0C] focus:outline-none focus:border-[#EA580C] resize-none"
                    required
                  />
                  <button
                    type="submit"
                    aria-label="Post encouragement"
                    className="px-4 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xl text-xs font-bold shrink-0 transition-colors flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                {commentSubmitted && (
                  <p className="text-xs text-[#EA580C] font-semibold">
                    Thank you! Your encouragement has been posted.
                  </p>
                )}
              </form>

              <div className="space-y-3">
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 bg-[#FAF6EE] rounded-xl text-xs sm:text-sm text-[#524C44] border border-[#E2D6C3]"
                  >
                    <div className="flex items-center justify-between font-semibold text-[#0B0B0C] mb-1">
                      <span>
                        {c.name}{' '}
                        {c.dept && <span className="text-xs text-[#EA580C] font-normal">({c.dept})</span>}
                      </span>
                      <span className="text-xs text-[#6C6358] font-normal">{c.date}</span>
                    </div>
                    <p>{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <div className="grid sm:grid-cols-2 gap-6">
          {others.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => onSelectDetail({ kind: 'publication', id: o.id, returnSection: detail.returnSection })}
              className="text-left p-5 rounded-2xl bg-white border border-[#E2D6C3] hover:border-[#EA580C] transition-all group"
            >
              <div className="text-xs font-bold text-[#EA580C]">
                {o.category} · {o.readTime}
              </div>
              <h3 className="font-display font-bold text-base text-[#0B0B0C] group-hover:text-[#EA580C] mt-1">
                {o.title}
              </h3>
              <p className="text-xs text-[#524C44] mt-1 line-clamp-2">{o.excerpt}</p>
            </button>
          ))}
        </div>
      </div>
    );
  };

  let content: React.ReactNode = null;
  if (detail.kind === 'photo') {
    const photo = GALLERY_PHOTOS.find((p) => p.id === detail.id) || GALLERY_PHOTOS[0];
    content = renderPhotoDetail(photo);
  } else if (detail.kind === 'ministry') {
    const ministry = MINISTRY_SPOTLIGHTS.find((m) => m.id === detail.id) || MINISTRY_SPOTLIGHTS[0];
    content = renderMinistryDetail(ministry);
  } else if (detail.kind === 'event') {
    const evt = MCSF_EVENTS.find((e) => e.id === detail.id) || MCSF_EVENTS[0];
    content = renderEventDetail(evt);
  } else if (detail.kind === 'publication') {
    const pub = MCSF_PUBLICATIONS.find((p) => p.id === detail.id) || MCSF_PUBLICATIONS[0];
    content = renderPublicationDetail(pub);
  }

  return (
    <div className="py-10 md:py-16 bg-[#FAF6EE] text-[#0B0B0C] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onBack(detail.returnSection)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#0B0B0C] text-[#0B0B0C] hover:text-[#FAF6EE] border border-[#E2D6C3] text-xs sm:text-sm font-bold transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => onBack('hero')}
            className="text-xs font-semibold text-[#524C44] hover:text-[#EA580C] transition-colors"
          >
            Full Fellowship Page
          </button>
        </div>

        {content}
      </div>
    </div>
  );
};
