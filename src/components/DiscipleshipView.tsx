import React from 'react';
import { NavigationTab } from '../types/fellowship';
import { Heart, Sparkles, BookOpen, ShieldCheck, ArrowRight, Compass } from 'lucide-react';
import { TELEGRAM_REGISTRATION_BOT } from '../data/fellowshipData';

interface DiscipleshipViewProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const DiscipleshipView: React.FC<DiscipleshipViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 md:py-20 bg-white text-[#0E1B2E]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCE9FB] text-xs font-semibold text-[#14345F] mb-4">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>The Core of Our Fellowship</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#0E1B2E]">
            Jesus Christ
          </h1>
          <p className="mt-2 text-xl font-display font-medium text-[#2F5FA3]">
            "The Way, the Truth, and the Life"
          </p>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed italic">
            "Whatever we do, may our goal be to live for Christ. For He alone deserves it!"
          </p>
        </div>

        {/* Pillars Cards */}
        <div className="space-y-8">
          {/* Card 1: Who Is Jesus to Us */}
          <article className="rounded-3xl p-6 sm:p-8 bg-[#F4F8FE] border border-[#DDE6F2] shadow-sm relative overflow-hidden">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2F5FA3]">
                Pillar 01 · Identity
              </span>
              <h2 className="text-2xl font-bold font-display text-[#0E1B2E] mt-1">
                Who Is Jesus to Us? The Living Sacrifice
              </h2>
              <div className="mt-4 text-slate-600 text-sm sm:text-base space-y-3 leading-relaxed">
                <p>
                  To us, Jesus is not merely a historic moral philosopher or religious figure; He is the living Son of God, our Savior, Redeemer, and closest friend.
                </p>
                <p>
                  In His supreme sacrifice on the Cross, love conquered death and grace conquered sin. Through His wounds we find lasting healing, and through His resurrection we receive new, eternal life.
                </p>
              </div>

              <blockquote className="mt-5 p-4 rounded-xl bg-white border-l-4 border-[#14345F] text-xs sm:text-sm text-slate-700 font-medium">
                "God demonstrates his own love for us in this: While we were still sinners, Christ died for us." — Romans 5:8
              </blockquote>
            </div>
          </article>

          {/* Card 2: The Gospel */}
          <article className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#14345F] to-[#1E4378] text-white shadow-xl relative overflow-hidden">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#DCE9FB]">
                Pillar 02 · The Gospel
              </span>
              <h2 className="text-2xl font-bold font-display text-white mt-1">
                The Good News of Free Grace
              </h2>
              <div className="mt-4 text-white/90 text-sm sm:text-base space-y-3 leading-relaxed">
                <p>
                  The Gospel is the joyful news that salvation is not earned through our own flawed human performance or academic achievements. We are saved solely by grace through faith in Christ.
                </p>
                <p>
                  Jesus lived a sinless life, took upon Himself the burden of our guilt, rose victorious over the grave, and now offers eternal life to everyone who repents and puts their trust in Him.
                </p>
              </div>

              <blockquote className="mt-5 p-4 rounded-xl bg-white/15 border-l-4 border-amber-300 text-xs sm:text-sm text-white/95">
                "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God." — Ephesians 2:8
              </blockquote>
            </div>
          </article>

          {/* Card 3: Walking as a Disciple in Engineering */}
          <article className="rounded-3xl p-6 sm:p-8 bg-[#F4F8FE] border border-[#DDE6F2] shadow-sm relative overflow-hidden">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2F5FA3]">
                Pillar 03 · Calling
              </span>
              <h2 className="text-2xl font-bold font-display text-[#0E1B2E] mt-1">
                Walking With Him: Discipleship in Technology
              </h2>
              <div className="mt-4 text-slate-600 text-sm sm:text-base space-y-3 leading-relaxed">
                <p>
                  As students of software engineering, artificial intelligence, and computing at HiLCoE, discipleship touches every facet of our daily life:
                </p>
                <ul className="space-y-2 mt-3 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Academic Honesty:</strong> Coding with authenticity, upholding high standards in exams and projects, and giving credit where credit is due.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Service to Others:</strong> Helping struggling peers understand complex algorithms, sharing study materials freely, and lifting one another up.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Living as a Campus Witness:</strong> Being salt and light in our labs, classrooms, and conversations.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={TELEGRAM_REGISTRATION_BOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#14345F] hover:bg-[#2F5FA3] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
                >
                  <span>Join Our Discipleship Community</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors"
                >
                  Talk With a Fellowship Mentor
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
