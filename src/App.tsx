import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { SidebarNav } from './components/SidebarNav';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ToolsAndMethodologySection } from './components/ToolsAndMethodologySection';
import { ProofSection } from './components/ProofSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProofModal } from './components/ProofModal';
import { BookingModal } from './components/BookingModal';
import { SideRailNav } from './components/SideRailNav';
import { Preloader } from './components/Preloader';

export default function App() {
  /* Kinetic preloader experiment — plays on every load, preview only. */
  const [showPreloader, setShowPreloader] = useState(true);
  const handlePreloaderDone = useCallback(() => {
    setShowPreloader(false);
  }, []);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'panel' | 'scroll'>('panel');
  const [slideDirection, setSlideDirection] = useState<number>(1); // 1 = forward, -1 = backward
  const isScrollingRef = useRef(false);

  const [inspectModalDoc, setInspectModalDoc] = useState<{
    src: string;
    title: string;
    category?: string;
    description?: string;
    isPdf?: boolean;
    pages?: number;
  } | null>(null);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  /* Skip the very first hash sync so a deep link survives (re)mounts. */
  const hashSyncedRef = useRef(false);

  const sectionIds = [
    'intro',
    'about',
    'experience',
    'methodology',
    'proof',
    'contact',
  ];

  const sectionNames = [
    'Intro',
    'About',
    'Experience',
    'Methodology',
    'Proof',
    'Contact',
  ];

  const totalSections = sectionIds.length;

  // Handle Hash on initial load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash) {
      const idx = sectionIds.indexOf(hash);
      if (idx !== -1) {
        setActiveSectionIndex(idx);
      }
    }
  }, []);

  // Update hash when active section changes (skips the initial mount
  // so an incoming deep link is never overwritten before it is read)
  useEffect(() => {
    if (!hashSyncedRef.current) {
      hashSyncedRef.current = true;
      return;
    }
    const currentId = sectionIds[activeSectionIndex];
    if (window.location.hash !== `#${currentId}`) {
      window.history.replaceState(null, '', `#${currentId}`);
    }
  }, [activeSectionIndex]);

  // Navigate to section
  const handleSelectSection = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSections) return;
      setSlideDirection(index > activeSectionIndex ? 1 : -1);
      setActiveSectionIndex(index);

      if (viewMode === 'scroll') {
        const id = sectionIds[index];
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    [activeSectionIndex, totalSections, viewMode, sectionIds]
  );

  const handleNext = useCallback(() => {
    if (activeSectionIndex < totalSections - 1) {
      handleSelectSection(activeSectionIndex + 1);
    }
  }, [activeSectionIndex, totalSections, handleSelectSection]);

  const handlePrevious = useCallback(() => {
    if (activeSectionIndex > 0) {
      handleSelectSection(activeSectionIndex - 1);
    }
  }, [activeSectionIndex, handleSelectSection]);

  // Keyboard navigation for intentional section switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't navigate if inside an open modal or input field
      if (inspectModalDoc || isBookingOpen) return;
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrevious, inspectModalDoc, isBookingOpen]);

  // NOTE: Aggressive window mouse wheel and touch swipe hijacking have been removed
  // so the mouse wheel scrolls the content naturally without battling page navigation.
  // Navigation between sections is cleanly handled by the bottom dock, side arrows,
  // top navigation pills, side rail dots, and in-section continue buttons.

  // Scroll spy in free scroll mode — IntersectionObserver on a middle
  // viewport band, so the sidebar highlights whichever section is actually
  // on screen regardless of scroll container or section height.
  useEffect(() => {
    if (viewMode !== 'scroll') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx !== -1) setActiveSectionIndex(idx);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode]);

  // Content Protection: Prevent saving/dragging non-PDF visual content and images
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'IMG' ||
          target.tagName === 'CANVAS' ||
          target.closest('img') ||
          target.closest('canvas') ||
          target.closest('.no-download-media'))
      ) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'IMG' ||
          target.tagName === 'CANVAS' ||
          target.closest('img') ||
          target.closest('canvas') ||
          target.closest('.no-download-media'))
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  const handleInspectDocument = (doc: {
    src: string;
    title: string;
    category?: string;
    description?: string;
    isPdf?: boolean;
    pages?: number;
  }) => {
    setInspectModalDoc(doc);
  };

  const renderSectionContent = (index: number) => {
    switch (index) {
      case 0:
        return (
          <HeroSection
            onOpenBooking={() => setIsBookingOpen(true)}
            onNavigateSection={handleSelectSection}
          />
        );
      case 1:
        return <AboutSection onNavigateSection={handleSelectSection} />;
      case 2:
        return <ExperienceSection onNavigateSection={handleSelectSection} />;
      case 3:
        return <ToolsAndMethodologySection onNavigateSection={handleSelectSection} />;
      case 4:
        return (
          <ProofSection
            onInspectDocument={handleInspectDocument}
            onNavigateSection={handleSelectSection}
          />
        );
      case 5:
        return (
          <div className="flex flex-col justify-between min-h-[100dvh]">
            <ContactSection
              onOpenBooking={() => setIsBookingOpen(true)}
              onNavigateSection={handleSelectSection}
            />
            <Footer
              onSelectSection={handleSelectSection}
              viewMode={viewMode}
              onToggleViewMode={() => setViewMode(viewMode === 'panel' ? 'scroll' : 'panel')}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      {showPreloader && <Preloader onDone={handlePreloaderDone} />}
      <div className="min-h-screen bg-[#F5F4EF] dark:bg-[#0C0C0F] text-[#1A1A1A] dark:text-[#E0E0E0] relative selection:bg-[#FF5600]/20 selection:text-[#FF5600] font-manrope antialiased transition-colors duration-300 overflow-x-hidden">
        
        {/* Subtle Ambient Industrial Lighting */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] w-[700px] h-[500px] bg-gradient-to-br from-black/[0.02] dark:from-white/[0.02] to-transparent blur-3xl rounded-full" />
          <div className="absolute top-[40%] right-[-5%] w-[600px] h-[500px] bg-gradient-to-bl from-black/[0.015] dark:from-white/[0.015] to-transparent blur-3xl rounded-full" />
          <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[500px] bg-gradient-to-tr from-[#AAAAAA]/[0.05] dark:from-[#333333]/[0.15] to-transparent blur-3xl rounded-full" />
        </div>

        {/* Askim-Style Left-Hand Persistent Navigation Sidebar */}
        <SidebarNav
          activeSectionIndex={activeSectionIndex}
          onSelectSection={handleSelectSection}
          viewMode={viewMode}
          onToggleViewMode={() => setViewMode(viewMode === 'panel' ? 'scroll' : 'panel')}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* Dual-Purpose Center-Right Navigation Rail */}
        <SideRailNav
          currentIndex={activeSectionIndex}
          totalSections={totalSections}
          sectionIds={sectionIds}
          sectionNames={sectionNames}
          viewMode={viewMode}
          onSelectSection={handleSelectSection}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        {/* Main Content Presentation */}
        {viewMode === 'panel' ? (
          /* CINEMATIC SLIDE PANEL MODE */
          <main className="relative w-full h-[100dvh] pt-16 lg:pt-0 lg:pl-[280px] xl:pl-[300px] overflow-hidden">
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={activeSectionIndex}
                custom={slideDirection}
                initial={{ opacity: 0, y: slideDirection * 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: slideDirection * -24 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full overflow-y-auto panel-scrollbar"
              >
                {renderSectionContent(activeSectionIndex)}
              </motion.div>
            </AnimatePresence>
          </main>
        ) : (
          /* CONTINUOUS FREE SCROLL MODE — follows the sidebar tab sequence:
             Home · Portfolio · Services · About · Resume · Contacts */
          <main className="relative pt-16 lg:pt-0 lg:pl-[280px] xl:pl-[300px] min-h-screen">
            <HeroSection
              onOpenBooking={() => setIsBookingOpen(true)}
              onNavigateSection={handleSelectSection}
            />
            <ProofSection
              onInspectDocument={handleInspectDocument}
              onNavigateSection={handleSelectSection}
            />
            <ToolsAndMethodologySection onNavigateSection={handleSelectSection} />
            <AboutSection onNavigateSection={handleSelectSection} />
            <ExperienceSection onNavigateSection={handleSelectSection} />
            <ContactSection
              onOpenBooking={() => setIsBookingOpen(true)}
              onNavigateSection={handleSelectSection}
            />
            <Footer
              onSelectSection={handleSelectSection}
              viewMode={viewMode}
              onToggleViewMode={() => setViewMode('panel')}
            />
          </main>
        )}

        {/* Proof Lightbox / High-Resolution PDF & Document Inspector Modal */}
        <ProofModal
          isOpen={Boolean(inspectModalDoc)}
          onClose={() => setInspectModalDoc(null)}
          documentItem={inspectModalDoc}
        />

        {/* In-App Direct Scheduling Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}
