import React, { useState } from 'react';
import { FeedbackRecord } from '../types/fellowship';
import { FELLOWSHIP_LEADERS, TELEGRAM_CHANNEL } from '../data/fellowshipData';
import { CheckCircle2, ArrowRight, Share2, MapPin, Phone, MessageCircle } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface ContactViewProps {
  onFeedbackSubmitted?: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onFeedbackSubmitted }) => {
  const [feedbackType, setFeedbackType] = useState<FeedbackRecord['type']>('prayer-request');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Please provide your message or prayer request.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const record: FeedbackRecord = {
      id: 'fb-' + Date.now(),
      type: feedbackType,
      message: message.trim(),
      name: name.trim() || undefined,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('mcsf_feedbacks') || '[]');
      existing.unshift(record);
      localStorage.setItem('mcsf_feedbacks', JSON.stringify(existing));
    } catch {}

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onFeedbackSubmitted) onFeedbackSubmitted();
    }, 400);
  };

  const handleReset = () => {
    setMessage('');
    setName('');
    setEmail('');
    setPhone('');
    setSubmitted(false);
    setError('');
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-[#0B0B0C] text-[#FAF6EE] border-b border-[#27272C]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FB923C] font-display block mb-2">
            Connect &amp; Prayer Desk
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#FAF6EE] text-balance">
            Contact Coordinators &amp; Prayer Desk
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#E2D6C3]/85 leading-relaxed">
            Reach out to our student coordinators for hospital ICU patient visitation requests, clinical exam prayer coverage, or direct fellowship inquiries.
          </p>
        </ScrollReveal>

        {/* Dedicated Coordinator Contacts Banner */}
        <ScrollReveal className="mb-10">
          <div className="bg-[#141417] rounded-3xl p-6 sm:p-8 border border-[#27272C] shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#27272C]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FB923C]">
                  Direct Contacts
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-display text-[#FAF6EE] mt-0.5">
                  Fellowship Coordinators
                </h3>
              </div>
              <a
                href={TELEGRAM_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EA580C] text-white hover:bg-[#C2410C] text-xs font-bold transition-colors shadow-sm whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Official Telegram (@lursuesz)</span>
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {FELLOWSHIP_LEADERS.map((leader, idx) => (
                <div
                  key={leader.name}
                  className="p-5 rounded-2xl bg-[#0B0B0C] border border-[#27272C] hover:border-[#EA580C] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-[#E2D6C3]/80 mb-2">
                      <span className="font-bold text-[#FB923C]">Coordinator {idx + 1}</span>
                      <span>{leader.role}</span>
                    </div>
                    <h4 className="text-lg font-bold text-[#FAF6EE] font-display">
                      {leader.name}
                    </h4>
                    <p className="text-xs text-[#E2D6C3]/75 mt-1 leading-relaxed">
                      {leader.bio || leader.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#27272C] space-y-2">
                    <a
                      href={`tel:${leader.phone.replace(/\s+/g, '')}`}
                      className="flex items-center gap-2 text-xs font-semibold text-[#FAF6EE] hover:text-[#FB923C] transition-colors tabular-nums"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#FB923C]" />
                      <span>{leader.phone}</span>
                    </a>
                    <a
                      href={`https://t.me/${leader.telegramUsername.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-xs font-bold text-[#FAF6EE] hover:text-[#FB923C] transition-colors bg-[#141417] px-3 py-2 rounded-lg border border-[#27272C]"
                    >
                      <span className="flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5 text-[#FB923C]" />
                        <span>@{leader.telegramUsername}</span>
                      </span>
                      <span className="text-[11px] font-semibold text-[#FB923C]">
                        Chat on Telegram &rarr;
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Channels & Location */}
          <ScrollReveal className="md:col-span-5 space-y-6">
            <div className="bg-[#141417] rounded-3xl p-6 border border-[#27272C] shadow-lg">
              <h3 className="font-display font-extrabold text-base sm:text-lg text-[#FAF6EE] mb-4">
                Official Telegram &amp; Community
              </h3>
              <div className="space-y-3">
                <a
                  href={TELEGRAM_CHANNEL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0B0B0C] border border-[#27272C] hover:border-[#EA580C] transition-colors group"
                >
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-[#FAF6EE]">
                      Official Telegram Channel
                    </div>
                    <div className="text-[11px] text-[#FB923C]">t.me/lursuesz</div>
                  </div>
                  <Share2 className="w-4 h-4 text-[#FB923C] group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href="https://t.me/Gedion98"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0B0B0C] border border-[#27272C] hover:border-[#EA580C] transition-colors group"
                >
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-[#FAF6EE]">
                      Gedion (Registration Desk)
                    </div>
                    <div className="text-[11px] text-[#E2D6C3]">@Gedion98 · +251 93 614 0719</div>
                  </div>
                  <Share2 className="w-4 h-4 text-[#FB923C] group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href="https://t.me/Bemnet1961"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0B0B0C] border border-[#27272C] hover:border-[#EA580C] transition-colors group"
                >
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-[#FAF6EE]">
                      Bemnet (Coordinator)
                    </div>
                    <div className="text-[11px] text-[#E2D6C3]">@Bemnet1961 · +251 93 232 2734</div>
                  </div>
                  <Share2 className="w-4 h-4 text-[#FB923C] group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            <div className="bg-[#141417] rounded-3xl p-6 border border-[#27272C] shadow-lg space-y-3">
              <h3 className="font-display font-extrabold text-sm sm:text-base text-[#FAF6EE]">
                Campus &amp; Fellowship Locations
              </h3>
              <div className="space-y-2.5 text-xs text-[#E2D6C3]/85">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#FB923C] mt-0.5 shrink-0" />
                  <span>
                    Dagmawi Menelik Health Science College (Piyassa) · Semen Muluwengel Church &amp; Genet Church, Addis Ababa
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Cream Prayer & Feedback Box */}
          <ScrollReveal delay={0.08} className="md:col-span-7">
            <div className="bg-[#FAF6EE] text-[#0B0B0C] rounded-3xl p-6 sm:p-10 border border-[#E2D6C3] shadow-2xl">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#FFF1E6] text-[#EA580C] mx-auto flex items-center justify-center mb-4 border border-[#EA580C]/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black font-display text-[#0B0B0C]">
                    Message Received!
                  </h3>
                  <p className="mt-2 text-sm text-[#524C44] max-w-md mx-auto leading-relaxed">
                    Thank you! Your prayer request or message has reached the fellowship coordinator team. We will remember your petition in our bedside and weekly intercessions.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl bg-[#0B0B0C] hover:bg-[#EA580C] text-[#FAF6EE] font-bold text-xs sm:text-sm transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-6 pb-4 border-b border-[#E2D6C3]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                      Prayer &amp; Encouragement
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0B0B0C] mt-1">
                      Prayer Requests &amp; Student Voice
                    </h3>
                    <p className="text-xs text-[#524C44] mt-1">
                      Need hospital prayer for a patient, clinical exam intercession, or have suggestions for the fellowship?
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                      <label htmlFor="m-fb-type" className="block text-xs font-semibold text-[#0B0B0C] mb-1">
                        Category <span className="text-[#EA580C]">*</span>
                      </label>
                      <select
                        id="m-fb-type"
                        value={feedbackType}
                        onChange={(e) => setFeedbackType(e.target.value as FeedbackRecord['type'])}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E2D6C3] bg-white text-[#0B0B0C] text-xs sm:text-sm focus:outline-none focus:border-[#EA580C]"
                      >
                        <option value="prayer-request">Prayer Request (ICU, Exam, Personal Healing)</option>
                        <option value="hospital-visit">Hospital Patient Visit Request</option>
                        <option value="testimony">Praise &amp; Testimony</option>
                        <option value="suggestion">Suggestion for Fellowship</option>
                        <option value="other">Other Inquiries</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="m-fb-msg" className="block text-xs font-semibold text-[#0B0B0C] mb-1">
                        Your Message / Prayer Details <span className="text-[#EA580C]">*</span>
                      </label>
                      <textarea
                        id="m-fb-msg"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please share patient details, hospital ward number, or your personal prayer petition..."
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white text-[#0B0B0C] focus:outline-none transition-all resize-y ${
                          error ? 'border-rose-500' : 'border-[#E2D6C3] focus:border-[#EA580C]'
                        }`}
                      />
                      {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="m-fb-name" className="block text-xs font-semibold text-[#0B0B0C] mb-1">
                          Name <span className="text-[#6C6358] font-normal">(optional)</span>
                        </label>
                        <input
                          id="m-fb-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full px-4 py-2 rounded-xl border border-[#E2D6C3] bg-white text-[#0B0B0C] text-sm focus:outline-none focus:border-[#EA580C]"
                        />
                      </div>

                      <div>
                        <label htmlFor="m-fb-phone" className="block text-xs font-semibold text-[#0B0B0C] mb-1">
                          Phone / Telegram <span className="text-[#6C6358] font-normal">(optional)</span>
                        </label>
                        <input
                          id="m-fb-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+251 9... or @username"
                          className="w-full px-4 py-2 rounded-xl border border-[#E2D6C3] bg-white text-[#0B0B0C] text-sm focus:outline-none focus:border-[#EA580C]"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <span>Sending...</span>
                        ) : (
                          <>
                            <span>Send Prayer Request &amp; Message</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
