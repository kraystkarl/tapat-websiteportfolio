import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ToolsAndMethodologySection } from './components/ToolsAndMethodologySection';
import { ProofSection } from './components/ProofSection';
import { EvidencePackageSummary } from './components/EvidencePackageSummary';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProofModal } from './components/ProofModal';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [inspectModalDoc, setInspectModalDoc] = useState<{
    src: string;
    title: string;
    category?: string;
    description?: string;
    isPdf?: boolean;
    pages?: number;
  } | null>(null);

  const [isBookingOpen, setIsBookingOpen] = useState(false);

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

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#020001] text-[#1A1A1A] dark:text-[#E0E0E0] relative selection:bg-[#FF5600]/20 selection:text-[#FF5600] font-sans antialiased transition-colors duration-300">
        {/* Subtle Ambient Industrial Lighting */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] w-[700px] h-[500px] bg-gradient-to-br from-black/[0.02] dark:from-white/[0.02] to-transparent blur-3xl rounded-full" />
          <div className="absolute top-[40%] right-[-5%] w-[600px] h-[500px] bg-gradient-to-bl from-black/[0.015] dark:from-white/[0.015] to-transparent blur-3xl rounded-full" />
          <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[500px] bg-gradient-to-tr from-[#AAAAAA]/[0.05] dark:from-[#333333]/[0.15] to-transparent blur-3xl rounded-full" />
        </div>

        {/* Navigation Bar */}
        <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

        <main className="relative">
          {/* 1. Opening / Professional Introduction */}
          <HeroSection onOpenBooking={() => setIsBookingOpen(true)} />

          {/* 2. About / Professional Profile (9:16 Portrait Presentation) */}
          <AboutSection />

          {/* 3. Professional Experience (DeepBluee · 60+ Projects · PlanSwift) */}
          <ExperienceSection />

          {/* 4. Tools & Estimating Methodology (PlanSwift vs Bluebeam · 8-Step Flow) */}
          <ToolsAndMethodologySection />

          {/* 5. Proof of Work / Estimating Evidence (The 6 Prepared Estimating PDFs) */}
          <ProofSection onInspectDocument={handleInspectDocument} />

          {/* 6. Evidence / Documentation Package Summary */}
          <EvidencePackageSummary />

          {/* 7. Resume & Contact Section */}
          <ContactSection onOpenBooking={() => setIsBookingOpen(true)} />
        </main>

        {/* Footer */}
        <Footer />

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
