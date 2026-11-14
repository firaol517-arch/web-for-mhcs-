import React, { Suspense, lazy, useState, useEffect } from 'react';
import { DetailRoute, SectionId } from './types/fellowship';
import { buildDetailHash, parseDetailHash } from './utils/fellowship';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryHub } from './components/CategoryHub';
const AboutSection = lazy(() => import('./components/AboutSection').then((m) => ({ default: m.AboutSection })));
const WorshipMezmurView = lazy(() => import('./components/WorshipMezmurView').then((m) => ({ default: m.WorshipMezmurView })));
const HospitalMinistryView = lazy(() => import('./components/HospitalMinistryView').then((m) => ({ default: m.HospitalMinistryView })));
const EventsView = lazy(() => import('./components/EventsView').then((m) => ({ default: m.EventsView })));
const FamilyView = lazy(() => import('./components/FamilyView').then((m) => ({ default: m.FamilyView })));
const GalleryView = lazy(() => import('./components/GalleryView').then((m) => ({ default: m.GalleryView })));
const PublicationsView = lazy(() => import('./components/PublicationsView').then((m) => ({ default: m.PublicationsView })));
const RegisterView = lazy(() => import('./components/RegisterView').then((m) => ({ default: m.RegisterView })));
const ContactView = lazy(() => import('./components/ContactView').then((m) => ({ default: m.ContactView })));
const DetailView = lazy(() => import('./components/DetailView').then((m) => ({ default: m.DetailView })));
const AdminPortal = lazy(() => import('./components/AdminPortal').then((m) => ({ default: m.AdminPortal })));
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

const SITE_NAME = 'MCSF Fellowship | Dagmawi Menelik Health Science College';

function PageFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center text-sm text-[#524C44]" role="status">
      Loading…
    </div>
  );
}

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
    if (isAdminOpen) {
      document.title = `Coordinator Records | ${SITE_NAME}`;
    } else if (activeDetail) {
      document.title = SITE_NAME;
    } else if (activeSection === 'hero') {
      document.title = SITE_NAME;
    } else {
      document.title = `${CATEGORY_TITLES[activeSection]} | MCSF Fellowship`;
    }
  }, [activeSection, activeDetail, isAdminOpen]);

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
            <Hero
              onScrollToSection={navigateToCategory}
              onOpenDetail={handleOpenDetail}
            />
            <CategoryHub
              onSelectCategory={navigateToCategory}
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
        <Suspense fallback={<PageFallback />}>
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
        </Suspense>
      </main>

      <Footer
        onScrollToSection={navigateToCategory}
        onOpenAdmin={handleOpenAdmin}
      />
    </div>
  );
}
