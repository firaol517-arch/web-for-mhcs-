import React, { useState, useEffect } from 'react';
import { DetailRoute, SectionId } from './types/fellowship';
import { buildDetailHash, parseDetailHash } from './utils/fellowship';
import { Navbar } from './components/Navbar';
import { CategoryHub } from './components/CategoryHub';
import { AboutSection } from './components/AboutSection';
import { WorshipMezmurView } from './components/WorshipMezmurView';
import { HospitalMinistryView } from './components/HospitalMinistryView';
import { EventsView } from './components/EventsView';
import { FamilyView } from './components/FamilyView';
import { GalleryView } from './components/GalleryView';
import { PublicationsView } from './components/PublicationsView';
import { RegisterView } from './components/RegisterView';
import { ContactView } from './components/ContactView';
import { DetailView } from './components/DetailView';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import { ArrowLeft } from 'lucide-react';

const SECTION_IDS: SectionId[] = [
  'hero',
  'about',
  'worship',
  'hospital',
  'events',
  'family',
  'gallery',
  'publications',
  'register',
  'contact',
];

const CATEGORY_TITLES: Record<SectionId, string> = {
  hero: 'Home & Categories',
  about: 'About & Vision',
  worship: 'Worship & Mezmur',
  hospital: 'Adult ICU & Ward Care',
  events: 'Wednesday Fellowship Schedule',
  family: 'Family Day & Circles',
  gallery: 'Photo Gallery',
  publications: 'Devotionals & Ethics',
  register: 'Member Registration',
  contact: 'Contact & Prayer Desk',
};

function parseInitialSection(): SectionId {
  const clean = window.location.hash.replace('#', '').toLowerCase();
  if (SECTION_IDS.includes(clean as SectionId)) {
    return clean as SectionId;
  }
  return 'hero';
}

export default function App() {
  const [activeDetail, setActiveDetail] = useState<DetailRoute | null>(() =>
    parseDetailHash(window.location.hash)
  );
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(
    () => window.location.hash.replace('#', '').toLowerCase() === 'admin'
  );
  const [activeSection, setActiveSection] = useState<SectionId>(() =>
    parseInitialSection()
  );

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const parsedDetail = parseDetailHash(hash);
      if (parsedDetail) {
        setActiveDetail(parsedDetail);
        setIsAdminOpen(false);
        return;
      }
      const clean = hash.replace('#', '').toLowerCase();
      if (clean === 'admin') {
        setIsAdminOpen(true);
        setActiveDetail(null);
        return;
      }
      setActiveDetail(null);
      setIsAdminOpen(false);
      if (SECTION_IDS.includes(clean as SectionId)) {
        setActiveSection(clean as SectionId);
      } else {
        setActiveSection('hero');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToCategory = (section: SectionId) => {
    setActiveDetail(null);
    setIsAdminOpen(false);
    setActiveSection(section);
    window.location.hash = section === 'hero' ? '' : `#${section}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDetail = (detail: DetailRoute) => {
    setIsAdminOpen(false);
    setActiveDetail({
      ...detail,
      returnSection: detail.returnSection || activeSection,
    });
    window.location.hash = buildDetailHash(detail.kind, detail.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromDetail = (section?: SectionId) => {
    navigateToCategory(section || activeSection || 'hero');
  };

  const handleOpenAdmin = () => {
    setActiveDetail(null);
    setIsAdminOpen(true);
    window.location.hash = '#admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCategoryView = () => {
    switch (activeSection) {
      case 'about':
        return (
          <AboutSection
            onScrollToSection={navigateToCategory}
            onOpenDetail={handleOpenDetail}
          />
        );
      case 'worship':
        return (
          <WorshipMezmurView
            onOpenDetail={handleOpenDetail}
            onNavigateCategory={navigateToCategory}
          />
        );
      case 'hospital':
        return (
          <HospitalMinistryView
            onScrollToSection={navigateToCategory}
            onOpenDetail={handleOpenDetail}
          />
        );
      case 'events':
        return <EventsView onOpenDetail={handleOpenDetail} />;
      case 'family':
        return (
          <FamilyView
            onScrollToSection={navigateToCategory}
            onOpenDetail={handleOpenDetail}
          />
        );
      case 'gallery':
        return <GalleryView onOpenDetail={handleOpenDetail} />;
      case 'publications':
        return <PublicationsView onOpenDetail={handleOpenDetail} />;
      case 'register':
        return <RegisterView onScrollToSection={navigateToCategory} />;
      case 'contact':
        return <ContactView />;
      case 'hero':
      default:
        return (
          <>
            <CategoryHub
              onSelectCategory={navigateToCategory}
              onOpenDetail={handleOpenDetail}
            />
            <AboutSection
              onScrollToSection={navigateToCategory}
              onOpenDetail={handleOpenDetail}
            />
          </>
        );
    }
  };

  const isDarkSubPage = activeSection === 'hospital' || activeSection === 'gallery' || activeSection === 'contact';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE] text-[#0B0B0C] selection:bg-[#EA580C] selection:text-white">
      <Navbar
        activeSection={activeSection}
        onScrollToSection={navigateToCategory}
        isSubView={Boolean(activeDetail || isAdminOpen)}
        onReturnHome={() => navigateToCategory('hero')}
      />

      <main className="flex-1 overflow-x-clip">
        {isAdminOpen ? (
          <AdminPortal onBack={() => navigateToCategory('hero')} />
        ) : activeDetail ? (
          <DetailView
            detail={activeDetail}
            onBack={handleBackFromDetail}
            onSelectDetail={handleOpenDetail}
            onNavigateToSection={navigateToCategory}
          />
        ) : (
          <>
            {activeSection !== 'hero' && (
              <div
                className={`border-b ${
                  isDarkSubPage
                    ? 'bg-[#0B0B0C] border-[#27272C] text-[#FAF6EE]'
                    : 'bg-[#F2EBE0] border-[#E2D6C3] text-[#0B0B0C]'
                }`}
              >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 text-xs">
                  <button
                    type="button"
                    onClick={() => navigateToCategory('hero')}
                    className={`inline-flex items-center gap-1.5 font-bold transition-colors ${
                      isDarkSubPage
                        ? 'text-[#FB923C] hover:text-white'
                        : 'text-[#EA580C] hover:text-[#0B0B0C]'
                    }`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>All Categories</span>
                  </button>
                  <span
                    className={`font-semibold truncate ${
                      isDarkSubPage ? 'text-[#E2D6C3]' : 'text-[#524C44]'
                    }`}
                  >
                    {CATEGORY_TITLES[activeSection]}
                  </span>
                </div>
              </div>
            )}
            {renderCategoryView()}
          </>
        )}
      </main>

      <Footer
        onScrollToSection={navigateToCategory}
        onOpenAdmin={handleOpenAdmin}
      />
    </div>
  );
}
