import React, { useState } from 'react';
import {
  MCSFMinistryTeam,
  RegistrationRecord,
  MCSFDepartment,
  AcademicYear,
  SectionId,
} from '../types/fellowship';
import {
  MCSF_DEPARTMENTS,
  MCSF_TEAMS,
  ACADEMIC_YEARS,
  buildTelegramRegistrationLink,
} from '../data/fellowshipData';
import { isValidEmail, isValidPhoneNumber } from '../utils/fellowship';
import { CheckCircle2, ArrowRight, Send as TelegramIcon, Copy, Check } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface RegisterViewProps {
  onScrollToSection: (section: SectionId) => void;
  onRegistered?: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
  onScrollToSection,
  onRegistered,
}) => {
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState<MCSFDepartment>(MCSF_DEPARTMENTS[0]);
  const [academicYear, setAcademicYear] = useState<AcademicYear>(ACADEMIC_YEARS[0]);
  const [selectedTeams, setSelectedTeams] = useState<MCSFMinistryTeam[]>([]);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submittedRecord, setSubmittedRecord] = useState<RegistrationRecord | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTeam = (team: MCSFMinistryTeam) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name.';
    if (!phone.trim()) {
      newErrors.phone = 'Please provide a valid phone number.';
    } else if (!isValidPhoneNumber(phone)) {
      newErrors.phone = 'Please enter a valid phone number (e.g. 09xxxxxxxx or +251...).';
    }

    if (!email.trim()) {
      newErrors.email = 'Please provide an email address.';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const record: RegistrationRecord = {
      id: 'reg-' + Date.now(),
      fullName: fullName.trim(),
      department,
      academicYear,
      teams: selectedTeams.length > 0 ? selectedTeams : ['Exploring / Not Sure Yet'],
      phone: phone.trim(),
      email: email.trim(),
      notes: notes.trim() || undefined,
      registeredAt: new Date().toISOString(),
      status: 'active',
    };

    try {
      const existing = JSON.parse(localStorage.getItem('mcsf_registrations') || '[]');
      existing.unshift(record);
      localStorage.setItem('mcsf_registrations', JSON.stringify(existing));
    } catch {}

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedRecord(record);
      if (onRegistered) onRegistered();
    }, 400);
  };

  const handleCopyText = (record: RegistrationRecord) => {
    const text = `MCSF Membership Registration
Name: ${record.fullName}
Department: ${record.department}
Year: ${record.academicYear}
Teams: ${record.teams.join(', ')}
Phone: ${record.phone}
Email: ${record.email}${record.notes ? `\nNotes: ${record.notes}` : ''}
College: Dagmawi Menelik Health Science College`;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(() => {
        window.prompt('Copy your registration details:', text);
      });
  };

  const handleReset = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setSelectedTeams([]);
    setNotes('');
    setSubmittedRecord(null);
    setErrors({});
  };

  return (
    <section
      id="register"
      className="py-16 md:py-24 bg-[#F2EBE0] text-[#0B0B0C] border-b border-[#E2D6C3]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] font-display block mb-2">
            Official Membership
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#0B0B0C] text-balance">
            Member Registration
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#524C44] leading-relaxed">
            Register as an active member of MCSF at Dagmawi Menelik Health Science College and send your registration directly to Gedion on Telegram.
          </p>
        </ScrollReveal>

        {/* Form Card */}
        <ScrollReveal>
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2D6C3] shadow-lg">
            {submittedRecord ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#FFF1E6] text-[#EA580C] mx-auto flex items-center justify-center mb-4 border border-[#EA580C]/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-[#0B0B0C]">
                  One last step, {submittedRecord.fullName.split(' ')[0]}!
                </h3>
                <p className="mt-2 text-sm text-[#524C44] max-w-md mx-auto leading-relaxed">
                  Your details are ready. Tap <strong>Send to Gedion</strong> below so the coordinators receive your registration and confirm your place in MCSF.
                </p>

                {/* Summary Card */}
                <div className="mt-6 p-4 rounded-2xl bg-[#FAF6EE] border border-[#E2D6C3] max-w-md mx-auto text-left text-xs space-y-1.5 text-[#0B0B0C]">
                  <div>
                    <strong className="text-[#EA580C]">Department:</strong>{' '}
                    {submittedRecord.department}
                  </div>
                  <div>
                    <strong className="text-[#EA580C]">Year:</strong>{' '}
                    {submittedRecord.academicYear}
                  </div>
                  <div>
                    <strong className="text-[#EA580C]">Teams:</strong>{' '}
                    {submittedRecord.teams.join(', ')}
                  </div>
                  <div>
                    <strong className="text-[#EA580C]">Phone:</strong> {submittedRecord.phone}
                  </div>
                  <div>
                    <strong className="text-[#EA580C]">Email:</strong> {submittedRecord.email}
                  </div>
                </div>

                {/* Share Directly With Gedion on Telegram */}
                <div className="mt-8 p-6 rounded-2xl bg-[#0B0B0C] text-[#FAF6EE] border border-[#27272C] max-w-md mx-auto text-left space-y-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <TelegramIcon className="w-5 h-5 text-[#FB923C]" />
                    <span className="font-display font-bold text-sm text-[#FAF6EE]">
                      Send to Gedion on Telegram
                    </span>
                  </div>
                  <p className="text-xs text-[#E2D6C3]/85 leading-relaxed">
                    Send your registration details directly to{' '}
                    <strong className="text-white">Gedion (@Gedion98)</strong> so the leadership can confirm your placement immediately:
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <a
                      href={buildTelegramRegistrationLink(submittedRecord)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs transition-colors shadow whitespace-nowrap"
                    >
                      <TelegramIcon className="w-4 h-4" />
                      <span>Send to Gedion (@Gedion98)</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopyText(submittedRecord)}
                      className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#141417] hover:bg-[#27272C] text-[#FAF6EE] text-xs font-semibold border border-[#27272C] transition-colors whitespace-nowrap"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-[#FB923C]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span>{copied ? 'Copied!' : 'Copy Info'}</span>
                    </button>
                  </div>
                </div>

                {/* Fellowship Coordinator Contacts */}
                <div className="mt-6 p-4 rounded-xl bg-[#FAF6EE] border border-[#E2D6C3] max-w-md mx-auto text-xs text-[#524C44] space-y-1">
                  <div className="font-semibold text-[#0B0B0C] mb-1">
                    MCSF Fellowship Coordinators:
                  </div>
                  <div>
                    <strong>Gedion:</strong> @Gedion98 ·{' '}
                    <a href="tel:+251936140719" className="text-[#EA580C] underline">
                      +251 93 614 0719
                    </a>
                  </div>
                  <div>
                    <strong>Bemnet:</strong> @Bemnet1961 ·{' '}
                    <a href="tel:+251932322734" className="text-[#EA580C] underline">
                      +251 93 232 2734
                    </a>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => onScrollToSection('family')}
                    className="px-5 py-2.5 rounded-xl bg-[#0B0B0C] text-[#FAF6EE] font-bold text-xs sm:text-sm hover:bg-[#EA580C] transition-colors inline-flex items-center gap-2"
                  >
                    <span>Request a Family Circle</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl bg-[#FAF6EE] text-[#0B0B0C] border border-[#E2D6C3] text-xs sm:text-sm font-semibold hover:bg-[#F2EBE0] transition-colors"
                  >
                    Register Another Member
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <label htmlFor="m-reg-name" className="block text-xs font-semibold text-[#0B0B0C] mb-1">
                    Full Name <span className="text-[#EA580C]">*</span>
                  </label>
                  <input
                    id="m-reg-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Yared Kassahun"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-[#FAF6EE] text-[#0B0B0C] focus:outline-none transition-all ${
                      errors.fullName
                        ? 'border-rose-500'
                        : 'border-[#E2D6C3] focus:border-[#EA580C]'
                    }`}
                  />
                  {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="m-reg-dept" className="block text-xs font-semibold text-[#0B0B0C] mb-1">
                      Department <span className="text-[#EA580C]">*</span>
                    </label>
                    <select
                      id="m-reg-dept"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value as MCSFDepartment)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#E2D6C3] bg-[#FAF6EE] text-[#0B0B0C] text-xs sm:text-sm focus:outline-none focus:border-[#EA580C]"
                    >
                      {MCSF_DEPARTMENTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="m-reg-year" className="block text-xs font-semibold text-[#0B0B0C] mb-1">
                      Academic Year <span className="text-[#EA580C]">*</span>
                    </label>
                    <select
                      id="m-reg-year"
                      value={academicYear}
                      onChange={(e) => setAcademicYear(e.target.value as AcademicYear)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#E2D6C3] bg-[#FAF6EE] text-[#0B0B0C] text-xs sm:text-sm focus:outline-none focus:border-[#EA580C]"
                    >
                      {ACADEMIC_YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-semibold text-[#0B0B0C] mb-1.5">
                    Which ministry team(s) would you love to serve in?
                  </span>
                  <div className="grid sm:grid-cols-2 gap-2 mt-2">
                    {MCSF_TEAMS.map((team) => {
                      const isChecked = selectedTeams.includes(team);
                      return (
                        <label
                          key={team}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-[#FFF1E6] border-[#EA580C] text-[#0B0B0C] font-bold'
                              : 'bg-[#FAF6EE] border-[#E2D6C3] text-[#524C44] hover:border-[#EA580C]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleTeam(team)}
                            className="rounded text-[#EA580C] focus:ring-[#EA580C] w-4 h-4 border-[#E2D6C3]"
                          />
                          <span>{team}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label htmlFor="m-reg-phone" className="block text-xs font-semibold text-[#0B0B0C] mb-1">
                      Phone Number <span className="text-[#EA580C]">*</span>
                    </label>
                    <input
                      id="m-reg-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +251 93 xxx xxxx / 09xx xxx xxx"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-[#FAF6EE] text-[#0B0B0C] focus:outline-none transition-all ${
                        errors.phone
                          ? 'border-rose-500'
                          : 'border-[#E2D6C3] focus:border-[#EA580C]'
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="m-reg-email" className="block text-xs font-semibold text-[#0B0B0C] mb-1">
                      Email Address <span className="text-[#EA580C]">*</span>
                    </label>
                    <input
                      id="m-reg-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@gmail.com"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-[#FAF6EE] text-[#0B0B0C] focus:outline-none transition-all ${
                        errors.email
                          ? 'border-rose-500'
                          : 'border-[#E2D6C3] focus:border-[#EA580C]'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="m-reg-notes" className="block text-xs font-semibold text-[#0B0B0C] mb-1">
                    Dorm Room / Musical or Medical Skills{' '}
                    <span className="text-[#6C6358] font-normal">(optional)</span>
                  </label>
                  <input
                    id="m-reg-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Acoustic guitar, vocals, hospital ICU prayer partner..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E2D6C3] bg-[#FAF6EE] text-[#0B0B0C] text-xs sm:text-sm focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Submitting Registration...</span>
                    ) : (
                      <>
                        <span>Submit Membership Registration</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
