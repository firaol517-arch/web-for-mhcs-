import React, { useState, useEffect } from 'react';
import {
  RegistrationRecord,
  FamilyRequestRecord,
  FeedbackRecord,
} from '../types/fellowship';
import {
  ShieldCheck,
  Users,
  HeartHandshake,
  Download,
  Trash2,
  Search,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  Activity,
} from 'lucide-react';

interface AdminPortalProps {
  onBack: () => void;
  onDataChanged?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBack, onDataChanged }) => {
  const [activeSubTab, setActiveSubTab] = useState<'registrations' | 'families' | 'feedback'>(
    'registrations'
  );
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [familyRequests, setFamilyRequests] = useState<FamilyRequestRecord[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = () => {
    try {
      const regData: RegistrationRecord[] = JSON.parse(
        localStorage.getItem('mcsf_registrations') || '[]'
      );
      const famData: FamilyRequestRecord[] = JSON.parse(
        localStorage.getItem('mcsf_family_requests') || '[]'
      );
      const fbData: FeedbackRecord[] = JSON.parse(localStorage.getItem('mcsf_feedbacks') || '[]');

      if (regData.length === 0) {
        const seedRegs: RegistrationRecord[] = [
          {
            id: 'reg-seed-1',
            fullName: 'Yared Kassahun',
            department: 'Medicine & Surgery',
            academicYear: 'Year 3 (Clerkship)',
            teams: ['Hospital Ward & ICU Ministry', 'Prayer & Intercession'],
            phone: '0911 234 567',
            email: 'yared.k@gmail.com',
            registeredAt: new Date(Date.now() - 86400000 * 2).toISOString(),
            status: 'active',
            notes: 'Available for Adult ICU prayer on Friday shifts.',
          },
          {
            id: 'reg-seed-2',
            fullName: 'Bethlehem Tadesse',
            department: 'Nursing & Adult ICU',
            academicYear: 'Year 4 (Internship / Senior)',
            teams: ['Worship & Music Team', 'Charity & Patient Relief'],
            phone: '0922 889 900',
            email: 'betty.icu@gmail.com',
            registeredAt: new Date(Date.now() - 86400000 * 4).toISOString(),
            status: 'active',
          },
        ];
        localStorage.setItem('mcsf_registrations', JSON.stringify(seedRegs));
        setRegistrations(seedRegs);
      } else {
        setRegistrations(regData);
      }

      if (famData.length === 0) {
        const seedFams: FamilyRequestRecord[] = [
          {
            id: 'fam-seed-1',
            fullName: 'Martha Haile',
            department: 'Pharmacy',
            academicYear: 'Year 2',
            phone: '0944 556 677',
            email: 'martha.pharm@gmail.com',
            dutyShiftNotes: 'Free on Tuesday & Thursday evenings in campus study rooms.',
            submittedAt: new Date(Date.now() - 86400000).toISOString(),
            assignedFamilyGroup: 'MCSF Clinical Family Circle 1',
          },
        ];
        localStorage.setItem('mcsf_family_requests', JSON.stringify(seedFams));
        setFamilyRequests(seedFams);
      } else {
        setFamilyRequests(famData);
      }

      if (fbData.length === 0) {
        const seedFb: FeedbackRecord[] = [
          {
            id: 'fb-seed-1',
            type: 'prayer-request',
            message:
              'Please pray for patient in Bed 4 Adult ICU recovering from respiratory infection.',
            name: 'Sister Selam (ICU Intern)',
            email: 'selam.icu@gmail.com',
            phone: '0911 000 111',
            submittedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          },
        ];
        localStorage.setItem('mcsf_feedbacks', JSON.stringify(seedFb));
        setFeedbacks(seedFb);
      } else {
        setFeedbacks(fbData);
      }
    } catch {}
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    if (activeSubTab === 'registrations') {
      csvContent += 'ID,FullName,Department,Year,Teams,Phone,Email,Notes,Date\n';
      registrations.forEach((r) => {
        csvContent += `"${r.id}","${r.fullName}","${r.department}","${r.academicYear}","${r.teams.join(
          '; '
        )}","${r.phone}","${r.email}","${(r.notes || '').replace(/"/g, '""')}","${r.registeredAt}"\n`;
      });
    } else if (activeSubTab === 'families') {
      csvContent += 'ID,FullName,Department,Year,Phone,Email,ShiftNotes,SubmittedAt\n';
      familyRequests.forEach((f) => {
        csvContent += `"${f.id}","${f.fullName}","${f.department}","${f.academicYear}","${f.phone}","${f.email}","${(
          f.dutyShiftNotes || ''
        ).replace(/"/g, '""')}","${f.submittedAt}"\n`;
      });
    } else {
      csvContent += 'ID,Type,Message,Name,Phone,Email,SubmittedAt\n';
      feedbacks.forEach((fb) => {
        csvContent += `"${fb.id}","${fb.type}","${fb.message.replace(/"/g, '""')}","${
          fb.name || ''
        }","${fb.phone || ''}","${fb.email || ''}","${fb.submittedAt}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mcsf_records_${activeSubTab}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearTable = (type: 'registrations' | 'families' | 'feedback') => {
    if (!window.confirm(`Are you sure you want to clear ${type} records?`)) return;
    if (type === 'registrations') {
      localStorage.setItem('mcsf_registrations', '[]');
      setRegistrations([]);
    } else if (type === 'families') {
      localStorage.setItem('mcsf_family_requests', '[]');
      setFamilyRequests([]);
    } else {
      localStorage.setItem('mcsf_feedbacks', '[]');
      setFeedbacks([]);
    }
    if (onDataChanged) onDataChanged();
  };

  const filteredRegistrations = registrations.filter(
    (r) =>
      !searchTerm ||
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFamilies = familyRequests.filter(
    (f) =>
      !searchTerm ||
      f.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFeedback = feedbacks.filter(
    (fb) =>
      !searchTerm ||
      fb.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (fb.name && fb.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="py-12 md:py-16 bg-[#FAF6EE] text-[#0B0B0C] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E2D6C3]">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#524C44] hover:text-[#EA580C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Fellowship Page</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#0B0B0C]">
            <ShieldCheck className="w-4 h-4 text-[#EA580C]" />
            <span>Coordinator Records Desk</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] block mb-1">
              Officer Administration
            </span>
            <h1 className="text-2xl sm:text-4xl font-black font-display text-[#0B0B0C]">
              MCSF Coordinator Records
            </h1>
            <p className="text-xs sm:text-sm text-[#524C44] mt-1">
              Dagmawi Menelik Health Science College Fellowship membership and family placements
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs sm:text-sm font-bold shadow transition-colors whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={loadData}
              title="Refresh Records"
              className="p-2 rounded-xl bg-white border border-[#E2D6C3] text-[#0B0B0C] hover:border-[#EA580C]"
              aria-label="Refresh records"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-[#E2D6C3] w-full sm:w-auto overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveSubTab('registrations')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'registrations'
                  ? 'bg-[#0B0B0C] text-[#FAF6EE] font-bold shadow'
                  : 'text-[#524C44] hover:text-[#0B0B0C]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="tabular-nums">Members ({registrations.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('families')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'families'
                  ? 'bg-[#0B0B0C] text-[#FAF6EE] font-bold shadow'
                  : 'text-[#524C44] hover:text-[#0B0B0C]'
              }`}
            >
              <HeartHandshake className="w-4 h-4" />
              <span className="tabular-nums">Family Requests ({familyRequests.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('feedback')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeSubTab === 'feedback'
                  ? 'bg-[#0B0B0C] text-[#FAF6EE] font-bold shadow'
                  : 'text-[#524C44] hover:text-[#0B0B0C]'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span className="tabular-nums">Prayers &amp; Visits ({feedbacks.length})</span>
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#EA580C] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by name, dept..."
              aria-label="Filter records"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#E2D6C3] text-xs text-[#0B0B0C] focus:outline-none focus:border-[#EA580C]"
            />
          </div>
        </div>

        {/* Records Table */}
        <div className="bg-white rounded-3xl border border-[#E2D6C3] shadow-md overflow-hidden">
          {activeSubTab === 'registrations' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF6EE] text-[#0B0B0C] uppercase text-[11px] font-bold border-b border-[#E2D6C3]">
                  <tr>
                    <th className="px-5 py-3">Student Name</th>
                    <th className="px-5 py-3">Department &amp; Year</th>
                    <th className="px-5 py-3">Teams</th>
                    <th className="px-5 py-3">Contact</th>
                    <th className="px-5 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2EBE0]">
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-[#6C6358]">
                        No member records found.
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((r) => (
                      <tr key={r.id} className="hover:bg-[#FAF6EE] transition-colors">
                        <td className="px-5 py-3.5 font-bold text-[#0B0B0C]">{r.fullName}</td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-semibold text-[#EA580C]">
                            {r.department}
                          </span>
                          <span className="block text-[11px] text-[#6C6358] mt-0.5">
                            {r.academicYear}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-[#524C44] max-w-xs">
                          {r.teams.join(' · ')}
                        </td>
                        <td className="px-5 py-3.5 text-[#524C44] tabular-nums">
                          <div>{r.phone}</div>
                          <div className="text-[11px] text-[#6C6358]">{r.email}</div>
                        </td>
                        <td className="px-5 py-3.5 text-[#6C6358] text-xs tabular-nums">
                          {new Date(r.registeredAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeSubTab === 'families' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF6EE] text-[#0B0B0C] uppercase text-[11px] font-bold border-b border-[#E2D6C3]">
                  <tr>
                    <th className="px-5 py-3">Applicant</th>
                    <th className="px-5 py-3">Dept &amp; Year</th>
                    <th className="px-5 py-3">Shift Notes</th>
                    <th className="px-5 py-3">Assigned Group</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2EBE0]">
                  {filteredFamilies.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-10 text-[#6C6358]">
                        No family placement requests found.
                      </td>
                    </tr>
                  ) : (
                    filteredFamilies.map((f) => (
                      <tr key={f.id} className="hover:bg-[#FAF6EE] transition-colors">
                        <td className="px-5 py-3.5 font-bold text-[#0B0B0C]">
                          <div>{f.fullName}</div>
                          <div className="text-[11px] text-[#6C6358] tabular-nums">{f.phone}</div>
                        </td>
                        <td className="px-5 py-3.5 text-[#524C44]">
                          <div>{f.department}</div>
                          <div className="text-[11px] text-[#6C6358]">{f.academicYear}</div>
                        </td>
                        <td className="px-5 py-3.5 text-[#524C44] max-w-sm">
                          {f.dutyShiftNotes || (
                            <span className="text-[#6C6358] italic">No notes</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-bold text-[#EA580C] inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{f.assignedFamilyGroup || 'Matching with Circle'}</span>
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeSubTab === 'feedback' && (
            <div className="divide-y divide-[#F2EBE0] p-2">
              {filteredFeedback.length === 0 ? (
                <div className="text-center py-10 text-[#6C6358] text-sm">No requests found.</div>
              ) : (
                filteredFeedback.map((fb) => (
                  <div key={fb.id} className="p-4 sm:p-5 hover:bg-[#FAF6EE] transition-colors">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                        {fb.type}
                      </span>
                      <span className="text-xs text-[#6C6358] tabular-nums">
                        {new Date(fb.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#0B0B0C] leading-relaxed">
                      &quot;{fb.message}&quot;
                    </p>
                    <div className="mt-2 text-[11px] text-[#6C6358]">
                      From:{' '}
                      <strong className="text-[#0B0B0C]">
                        {fb.name || 'Anonymous student/patient'}
                      </strong>{' '}
                      {fb.phone ? `· ${fb.phone}` : ''} {fb.email ? `· ${fb.email}` : ''}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          <div className="p-4 bg-[#FAF6EE] border-t border-[#E2D6C3] flex items-center justify-between text-xs text-[#6C6358]">
            <span className="tabular-nums">
              Showing{' '}
              {activeSubTab === 'registrations'
                ? filteredRegistrations.length
                : activeSubTab === 'families'
                ? filteredFamilies.length
                : filteredFeedback.length}{' '}
              entries
            </span>
            <button
              type="button"
              onClick={() => handleClearTable(activeSubTab)}
              className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear {activeSubTab}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
