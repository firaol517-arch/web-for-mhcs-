import React, { useState } from 'react';
import { DetailRoute, SectionId } from '../types/fellowship';
import {
  MCSF_FAQS,
  FELLOWSHIP_VIDEO,
  GALLERY_PHOTOS,
  TELEGRAM_CHANNEL,
} from '../data/fellowshipData';
import {
  Target,
  Compass,
  ChevronDown,
  CheckCircle2,
  Heart,
  Users,
  ArrowUpRight,
  ArrowRight,
  Play,
  Quote,
  Send,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

interface AboutSectionProps {
  onScrollToSection: (section: SectionId) => void;
  onOpenDetail: (detail: DetailRoute) => void;
}

const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Register & Connect',
    detail: 'Complete the Member Registration form and share your details directly to @Gedion98 on Telegram.',
  },
  {
    step: '02',
    title: 'Join a Family Circle',
    detail: 'Get matched into a 5–8 student department circle matched to your clinical rotation schedule.',
  },
  {
    step: '03',
    title: 'Wednesday 6:00 LT',
    detail: 'Gather every Wednesday at 6:00 LT (12:00 PM) at Semen Muluwengel & Genet Church in Piyassa.',
  },
  {
    step: '04',
    title: 'Serve Hospital Wards',
    detail: 'Step into Adult ICU intercession shifts, bedside prayer, and compassionate campus outreach.',
  },
];

const STUDENT_TESTIMONIES = [
  {
    id: 'story-med',
    quote:
      'During exhausting surgery clerkships, my Wednesday Family Circle reminded me that every stethoscope assessment is ministry before Christ.',
    name: 'Dr. Yared Kebede',
    cohort: 'Medicine & Surgery Alumni',
    tag: 'Ward Calling',
  },
  {
    id: 'story-icu',
    quote:
      'Praying quietly beside anxious mothers outside the Adult ICU showed us how clinical skill and Christian compassion belong together.',
    name: 'Sister Selamawit T.',
    cohort: 'Nursing & Adult ICU Team',
    tag: 'Adult ICU Care',
  },
  {
    id: 'story-pharm',
    quote:
      'Joining MCSF in Year 1 gave me brothers and sisters who walked with me from preclinical anatomy all the way to Piyassa outreach.',
    name: 'Ruth Bekele',
    cohort: 'Pharmacy · MCSF Choir',
    tag: 'Family Circle',
  },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ onScrollToSection, onOpenDetail }) => {
  const prefersReducedMotion = useReducedMotion();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'vision' | 'mission'>('vision');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const wednesdayFlyers = GALLERY_PHOTOS.filter((p) =>
    ['wednesday-prayer-flyer', 'one-week-piyassa'].includes(p.id)
  );

  return (
    <section
      id="about"
      className="bg-[#FAF6EE] text-[#0B0B0C] border-b border-[#E2D6C3]"
    >
      {/* Top Visual Intro Banner (Community Section) — Image reveals with smooth zoom */}
      <div className="relative overflow-hidden bg-[#0B0B0C] text-[#FAF6EE] border-b border-[#27272C]">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <motion.img
            src="/assets/aistudio/photo_2026-11-12_17-40-29_01ace01c.jpg"
            alt=""
            referrerPolicy="no-referrer"
            initial={prefersReducedMotion ? false : { scale: 1.15, opacity: 0.35 }}
            whileInView={{ scale: 1, opacity: 0.75 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C]/90 via-[#0B0B0C]/55 to-[#0B0B0C]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/85 via-transparent to-[#0B0B0C]/35" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <ScrollReveal className="lg:col-span-7 space-y-4">
              <div className="rounded-3xl p-6 sm:p-8 bg-[#0B0B0C]/75 backdrop-blur-sm border border-white/10 space-y-4 shadow-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FB923C] font-display block">
                  About Our Fellowship
                </span>
                <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-[#FAF6EE] leading-tight text-balance">
                  Dagmawi Menelik Health Science College Christian Students Fellowship
                </h2>
                <div className="space-y-3 text-[#FAF6EE]/90 text-sm sm:text-base leading-relaxed">
                  <p>
                    <strong className="text-[#FAF6EE]">Menelik Christian Students Fellowship (MCSF)</strong> is the vibrant spiritual family for Christian students training in medicine, surgery, clinical nursing, pharmacy, anesthesia, medical laboratory technology, and public health in Addis Ababa, Ethiopia.
                  </p>
                  <p>
                    We believe healthcare is a sacred calling. As we study anatomy, diagnostics, pharmacology, and clinical care, we anchor our lives in prayer, ethical integrity, and genuine empathy for hospitalized patients and their families.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => onScrollToSection('hospital')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EA580C] text-white text-xs sm:text-sm font-bold hover:bg-[#C2410C] transition-colors whitespace-nowrap"
                  >
                    <span>Explore Hospital Care</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onScrollToSection('family')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#141417]/90 hover:bg-[#27272C] text-[#FAF6EE] border border-[#27272C] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
                  >
                    <span>Join a Family Circle</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12} className="lg:col-span-5">
              <div className="rounded-3xl p-6 sm:p-8 bg-[#0B0B0C]/75 backdrop-blur-sm border border-white/10 text-[#FAF6EE] shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/15 text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#FB923C]">
                    Medical Calling
                  </span>
                  <span className="text-[#E2D6C3]">Healing Hands · Faithful Hearts</span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="p-4 rounded-2xl bg-[#141417]/85 border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FB923C] mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-display font-bold text-sm text-[#FAF6EE]">
                        Clinical Competence
                      </h3>
                      <p className="text-xs text-[#E2D6C3]/85 mt-0.5">
                        Pursuing medical and scientific mastery as an act of worship to God.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#141417]/85 border border-white/10 flex items-start gap-3">
                    <Heart className="w-5 h-5 text-[#FB923C] mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-display font-bold text-sm text-[#FAF6EE]">
                        Bedside Compassion
                      </h3>
                      <p className="text-xs text-[#E2D6C3]/85 mt-0.5">
                        Reflecting Christ&apos;s gentle love to every patient and waiting family.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#141417]/85 border border-white/10 flex items-start gap-3">
                    <Users className="w-5 h-5 text-[#FB923C] mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-display font-bold text-sm text-[#FAF6EE]">
                        Unbroken Brotherhood
                      </h3>
                      <p className="text-xs text-[#E2D6C3]/85 mt-0.5">
                        Shift-friendly peer mentoring so no healthcare student walks alone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20 space-y-16">

        {/* Featured Opportunities: Cards slide in from left and right */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#0B0B0C] text-[#FAF6EE] border border-[#27272C] shadow-xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Featured Card slides in from Left */}
            <ScrollReveal direction="fromLeft" className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FB923C]">
                <Play className="w-3.5 h-3.5 fill-[#FB923C]" />
                <span>Featured Highlights · Worship &amp; Word</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#FAF6EE] leading-tight text-balance">
                {FELLOWSHIP_VIDEO.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#E2D6C3]/85 leading-relaxed">
                {FELLOWSHIP_VIDEO.description}
              </p>

              <div className="rounded-2xl overflow-hidden border border-[#27272C] bg-black shadow-lg">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={FELLOWSHIP_VIDEO.poster}
                  className="w-full max-h-[380px] object-contain bg-black"
                >
                  <source src={FELLOWSHIP_VIDEO.src} type="video/mp4" />
                  Your browser does not support embedded video playback.
                </video>
              </div>
            </ScrollReveal>

            {/* Right Featured Opportunities: Alternating slide in from Left and Right */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-semibold text-[#E2D6C3]">
                Featured Campus Invitations · Click any card for full details
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {wednesdayFlyers.map((flyer, idx) => (
                  <ScrollReveal
                    key={flyer.id}
                    direction={idx % 2 === 0 ? 'fromLeft' : 'fromRight'}
                    delay={idx * 0.08}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        onOpenDetail({ kind: 'photo', id: flyer.id, returnSection: 'about' })
                      }
                      className="w-full h-full text-left group rounded-2xl overflow-hidden bg-[#141417] border border-[#27272C] hover:border-[#EA580C] transition-all flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
                    >
                      <div className="h-56 w-full overflow-hidden bg-black relative">
                        <img loading="lazy" decoding="async"
                          src={flyer.src}
                          alt={flyer.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                      </div>
                      <div className="p-4 space-y-1.5">
                        <div className="text-[11px] font-semibold text-[#FB923C]">
                          {flyer.date}
                        </div>
                        <h4 className="font-display font-bold text-sm text-[#FAF6EE] group-hover:text-[#FB923C] transition-colors">
                          {flyer.title}
                        </h4>
                        <p className="text-xs text-[#E2D6C3]/75 line-clamp-2">
                          {flyer.subtitle}
                        </p>
                        <div className="pt-2 text-xs font-bold text-[#FB923C] inline-flex items-center gap-1">
                          <span>View Detail Page</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </button>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How It Works — Steps activate sequentially */}
        <div className="space-y-6">
          <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] font-display block">
                How It Works
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-[#0B0B0C]">
                Four Steps Into MCSF Fellowship
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#524C44]">
              Designed around medical classes and clinical rotations
            </span>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_IT_WORKS_STEPS.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 'some', margin: '80px 0px 40px 0px' }}
                transition={{
                  duration: 0.42,
                  delay: prefersReducedMotion ? 0 : idx * 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-2xl p-5 bg-white border border-[#E2D6C3] shadow-sm flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <motion.span
                    initial={
                      prefersReducedMotion
                        ? false
                        : { backgroundColor: '#F2EBE0', color: '#0B0B0C' }
                    }
                    whileInView={{ backgroundColor: '#EA580C', color: '#FFFFFF' }}
                    viewport={{ once: true, amount: 'some' }}
                    transition={{
                      duration: 0.35,
                      delay: prefersReducedMotion ? 0 : idx * 0.14 + 0.15,
                    }}
                    className="w-9 h-9 rounded-xl font-display font-black text-xs flex items-center justify-center shadow-sm"
                  >
                    {item.step}
                  </motion.span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#EA580C]">
                    Step {idx + 1}
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-[#0B0B0C]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#524C44] mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision & Mission Card */}
        <ScrollReveal>
          <div className="rounded-3xl p-6 sm:p-10 bg-white border border-[#E2D6C3] shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-[#F2EBE0]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] font-display">
                  Guiding Principles
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0B0B0C]">
                  Vision &amp; Mission
                </h3>
              </div>

              <div
                className="flex items-center gap-1 p-1 bg-[#FAF6EE] rounded-xl border border-[#E2D6C3]"
                role="tablist"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'vision'}
                  onClick={() => setActiveTab('vision')}
                  className={`px-4 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'vision'
                      ? 'bg-[#0B0B0C] text-[#FAF6EE] shadow'
                      : 'text-[#524C44] hover:text-[#0B0B0C]'
                  }`}
                >
                  Our Vision
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'mission'}
                  onClick={() => setActiveTab('mission')}
                  className={`px-4 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'mission'
                      ? 'bg-[#0B0B0C] text-[#FAF6EE] shadow'
                      : 'text-[#524C44] hover:text-[#0B0B0C]'
                  }`}
                >
                  Our Mission
                </button>
              </div>
            </div>

            <div className="mt-6">
              {activeTab === 'vision' ? (
                <div className="grid md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3">
                    <div className="flex items-center gap-2 text-[#EA580C] font-bold text-sm">
                      <Target className="w-5 h-5" />
                      <span>Holistic Excellence in Health &amp; Discipleship</span>
                    </div>
                    <p className="text-sm sm:text-base text-[#524C44] leading-relaxed">
                      To raise a generation of Christian healthcare professionals—physicians, nurses, pharmacists, and medical scientists—who transform hospitals across Ethiopia through unmatched professional integrity, compassionate patient care, and bold testimony of the Gospel of Jesus Christ.
                    </p>
                    <blockquote className="p-4 bg-[#FAF6EE] border border-[#E2D6C3] rounded-xl text-xs sm:text-sm text-[#0B0B0C] italic font-medium">
                      &quot;Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.&quot; — Colossians 3:23
                    </blockquote>
                  </div>
                  <div className="md:col-span-4 bg-[#FAF6EE] rounded-2xl p-5 border border-[#E2D6C3]">
                    <span className="text-xs font-bold text-[#EA580C] block uppercase tracking-wider">
                      Vision Impact
                    </span>
                    <p className="text-xs text-[#524C44] mt-2 leading-relaxed">
                      Graduating health practitioners equipped with spiritual discernment and medical expertise to serve both inpatient hospital beds and underserved rural clinics.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3">
                    <div className="flex items-center gap-2 text-[#EA580C] font-bold text-sm">
                      <Compass className="w-5 h-5" />
                      <span>Nurturing Students &amp; Healing Wards</span>
                    </div>
                    <p className="text-sm sm:text-base text-[#524C44] leading-relaxed">
                      Our mission is to foster a Christ-centered sanctuary for healthcare students to grow spiritually, maintain emotional resilience through intense exams, intercede for critically ill hospital patients, and shine as salt and light across Dagmawi Menelik Health Science College.
                    </p>
                    <blockquote className="p-4 bg-[#FAF6EE] border border-[#E2D6C3] rounded-xl text-xs sm:text-sm text-[#0B0B0C] italic font-medium">
                      &quot;Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me.&quot; — Matthew 25:40
                    </blockquote>
                  </div>
                  <div className="md:col-span-4 bg-[#FAF6EE] rounded-2xl p-5 border border-[#E2D6C3]">
                    <span className="text-xs font-bold text-[#EA580C] block uppercase tracking-wider">
                      Core Ministries
                    </span>
                    <p className="text-xs text-[#524C44] mt-2 leading-relaxed">
                      Wednesday Semen Muluwengel &amp; Genet worship (6:00 LT), Adult ICU prayer visits, small-group family circles, and annual retreats.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Success Stories — Testimonials fade and slide in */}
        <div className="space-y-6">
          <ScrollReveal className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] font-display">
              Success Stories
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0B0B0C] mt-1">
              Testimonies Across Clinical Batches
            </h3>
            <p className="text-xs sm:text-sm text-[#524C44] mt-1">
              How fellowship prayer, Wednesday worship, and Family Circles strengthen students at Menelik Hospital.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-5">
            {STUDENT_TESTIMONIES.map((story, idx) => (
              <motion.div
                key={story.id}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, y: 20, x: idx === 0 ? -18 : idx === 2 ? 18 : 0 }
                }
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 'some', margin: '80px 0px 40px 0px' }}
                transition={{
                  duration: 0.48,
                  delay: prefersReducedMotion ? 0 : idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-2xl p-6 bg-white border border-[#E2D6C3] shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#EA580C]">
                    <span>{story.tag}</span>
                    <Quote className="w-4 h-4 text-[#EA580C]/70" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#0B0B0C] leading-relaxed italic">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F2EBE0]">
                  <div className="font-display font-bold text-sm text-[#0B0B0C]">
                    {story.name}
                  </div>
                  <div className="text-xs text-[#6C6358]">{story.cohort}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <ScrollReveal>
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] font-display">
              Questions &amp; Answers
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0B0B0C] mt-1">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-[#524C44] mt-1">
              Common questions from Menelik Health Science College students.
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {MCSF_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#E2D6C3] overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-display font-semibold text-sm sm:text-base text-[#0B0B0C] hover:text-[#EA580C] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#EA580C] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#524C44] border-t border-[#F2EBE0] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Final CTA — Background gradient slowly moves */}
        <ScrollReveal>
          <div className="animate-gradient-slow rounded-3xl p-7 sm:p-10 text-[#FAF6EE] border border-[#27272C] shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FB923C] font-display block">
                Final Invitation · Walk With Us
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#FAF6EE] text-balance">
                Ready to Grow With MCSF at Dagmawi Menelik College?
              </h3>
              <p className="text-xs sm:text-sm text-[#E2D6C3]/90 leading-relaxed">
                Register in seconds, share directly to Gedion on Telegram, and join our next Wednesday 6:00 LT service at Semen Muluwengel &amp; Genet Church.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onScrollToSection('register')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shadow-lg"
              >
                <span>Enroll as a Member</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={TELEGRAM_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#141417]/85 hover:bg-[#27272C] text-[#FAF6EE] border border-white/15 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <Send className="w-4 h-4 text-[#FB923C]" />
                <span>Join @lursuesz</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
