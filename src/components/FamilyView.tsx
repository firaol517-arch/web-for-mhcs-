import React, { useState } from 'react';
import {
  DetailRoute,
  FamilyRequestRecord,
  MCSFDepartment,
  SectionId,
} from '../types/fellowship';
import { MCSF_DEPARTMENTS, ACADEMIC_YEARS, GALLERY_PHOTOS } from '../data/fellowshipData';
import { isValidEmail, isValidPhoneNumber } from '../utils/fellowship';
import { CheckCircle2, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

interface FamilyViewProps {
  onScrollToSection: (section: SectionId) => void;
  onOpenDetail: (detail: DetailRoute) => void;
  onRequestSubmitted?: () => void;
}

export const FamilyView: React.FC<FamilyViewProps> = ({
  onScrollToSection,
  onOpenDetail,
  onRequestSubmitted,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState<MCSFDepartment>(MCSF_DEPARTMENTS[0]);
  const [academicYear, setAcademicYear] = useState<string>(ACADEMIC_YEARS[0]);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dutyShiftNotes, setDutyShiftNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const familyShowcaseIds = [
    'family-day-arts-room',
    'family-day-trio-glow',
    'first-year-anniversary',
    'crown-fellowship-joy',
    'crown-ceremony-sisters',
    'menelik-wednesday-dialogue',
  ];

  const familyMoments = GALLERY_PHOTOS.filter((p) => familyShowcaseIds.includes(p.id));

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

    const record: FamilyRequestRecord = {
      id: 'fam-' + Date.now(),
      fullName: fullName.trim(),
      department,
      academicYear,
      phone: phone.trim(),
      email: email.trim(),
      dutyShiftNotes: dutyShiftNotes.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('mcsf_family_requests') || '[]');
      existing.unshift(record);
      localStorage.setItem('mcsf_family_requests', JSON.stringify(existing));
    } catch {}

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onRequestSubmitted) onRequestSubmitted();
    }, 400);
  };

  const handleReset = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setDutyShiftNotes('');
    setSubmitted(false);
    setErrors({});
  };

  return (
    <section
      id="family"
      className="py-16 md:py-24 bg-[#F2EBE0] text-[#0B0B0C] border-b border-[#E2D6C3]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] font-display block mb-2">
            MCSF Family Day &amp; Milestones
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#0B0B0C] text-balance">
            Small-Group Fellowship Families
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#524C44] leading-relaxed">
            In MCSF Family circles, 5 to 8 health science students gather weekly for deep prayer, anniversary thanksgiving, Crown Days, and clinical study encouragement. Click any celebration card to read its story.
          </p>
        </ScrollReveal>

        {/* Clickable Family Day, Anniversary & Crown Celebration Photo Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {familyMoments.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 0.06}>
              <button
                type="button"
                onClick={() =>
                  onOpenDetail({ kind: 'photo', id: item.id, returnSection: 'family' })
                }
                className="w-full text-left rounded-2xl overflow-hidden bg-white border border-[#E2D6C3] hover:border-[#EA580C] shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
              >
                <div className="relative h-64 w-full overflow-hidden bg-[#0B0B0C]">
                  <motion.img
                    src={item.src}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    initial={prefersReducedMotion ? false : { scale: 1.12, opacity: 0.7 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 'some' }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#FAF6EE]">
                    <span className="font-semibold text-[#FB923C]">{item.tag}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#FAF6EE] group-hover:text-[#FB923C]" />
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#0B0B0C] group-hover:text-[#EA580C] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#524C44] mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#F2EBE0] text-xs font-semibold text-[#6C6358]">
                    {item.subtitle}
                  </div>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {/* Placement Request Form */}
        <ScrollReveal>
          <div className="rounded-3xl p-6 sm:p-10 bg-white border border-[#E2D6C3] shadow-lg max-w-2xl mx-auto">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#FFF1E6] text-[#EA580C] mx-auto flex items-center justify-center mb-4 border border-[#EA580C]/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-[#0B0B0C]">
                  Family Request Received!
                </h3>
                <p className="mt-2 text-sm text-[#524C44] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your family placement request for <strong>{department}</strong> has been received. A coordinator will contact you to introduce you to your circle.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => onScrollToSection('gallery')}
                    className="px-5 py-2.5 rounded-xl bg-[#0B0B0C] text-[#FAF6EE] font-bold text-xs sm:text-sm hover:bg-[#EA580C] transition-colors"
                  >
                    Browse Full Gallery
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl bg-[#FAF6EE] text-[#0B0B0C] border border-[#E2D6C3] font-semibold text-xs sm:text-sm hover:bg-[#F2EBE0] transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6 pb-4 border-b border-[#F2EBE0]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                    Family Placement Request
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0B0B0C] mt-1">
                    Join an MCSF Family Circle
                  </h3>
                  <p className="text-xs text-[#524C44] mt-1">
                    Connect with brothers and sisters in your department or clinical rotation shift.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label htmlFor="m-fam-name" className="block text-xs font-semibold text-[#0B0B0C] mb-1">
                      Full Name <span className="text-[#EA580C]">*</span>
                    </label>
                    <input
                      id="m-fam-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Martha Haile"
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
                      <label htmlFor="m-fam-dept" className="block text-xs font-semibold text-[#0B0B0C] mb-1">
                        Department <span className="text-[#EA580C]">*</span>
                      </label>
                      <select
                        id="m-fam-dept"
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
                      <label htmlFor="m-fam-year" className="block text-xs font-semibold text-[#0B0B0C] mb-1">
                        Academic Year <span className="text-[#EA580C]">*</span>
                      </label>
                      <select
                        id="m-fam-year"
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
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

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="m-fam-phone" className="block text-xs font-semibold text-[#0B0B0C] mb-1">
                        Phone Number <span className="text-[#EA580C]">*</span>
                      </label>
                      <input
                        id="m-fam-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0911 234 567"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-[#FAF6EE] text-[#0B0B0C] focus:outline-none transition-all ${
                          errors.phone
                            ? 'border-rose-500'
                            : 'border-[#E2D6C3] focus:border-[#EA580C]'
                        }`}
                      />
                      {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="m-fam-email" className="block text-xs font-semibold text-[#0B0B0C] mb-1">
                        Email Address <span className="text-[#EA580C]">*</span>
                      </label>
                      <input
                        id="m-fam-email"
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
                    <label htmlFor="m-fam-duty" className="block text-xs font-semibold text-[#0B0B0C] mb-1">
                      Clinical Duty &amp; Shift Preferences{' '}
                      <span className="text-[#6C6358] font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="m-fam-duty"
                      rows={3}
                      value={dutyShiftNotes}
                      onChange={(e) => setDutyShiftNotes(e.target.value)}
                      placeholder="e.g. Wednesday night duty, free weekends, or campus dormitory..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E2D6C3] bg-[#FAF6EE] text-[#0B0B0C] text-xs sm:text-sm focus:outline-none focus:border-[#EA580C] transition-all resize-y"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span>Submitting Request...</span>
                      ) : (
                        <>
                          <span>Submit Family Request</span>
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
    </section>
  );
};
