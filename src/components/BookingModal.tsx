import React, { useEffect } from 'react';
import { X, Calendar, Clock, Video } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/70 backdrop-blur-xl overflow-hidden transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl h-[85vh] max-h-[740px] liquid-card border border-black/[0.08] dark:border-white/[0.12] rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-black/[0.05] dark:border-white/[0.06] bg-[#F7F7F8]/90 dark:bg-[#121215]/90 backdrop-blur-md gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-[#FF5600]/10 text-[#FF5600] flex-shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-apple-mono text-[#CC8400] font-semibold">
                  Direct Scheduling
                </span>
                <span className="text-[10px] font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E] hidden sm:inline flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#4A4A4A] dark:text-[#9E9E9E]" /> 30 Minutes
                </span>
                <span className="text-[10px] font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E] hidden sm:inline flex items-center gap-1">
                  <Video className="w-3 h-3 text-[#4A4A4A] dark:text-[#9E9E9E]" /> Google Meet
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-display truncate">
                Get in Touch · Schedule a Call · Engr. Christ Carl Tapat
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/[0.06] dark:bg-white/10 hover:bg-[#FF5600]/20 text-[#1A1A1A] dark:text-[#E0E0E0] hover:text-[#FF5600] flex items-center justify-center transition-colors cursor-pointer active:scale-95"
            title="Close dialog (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Embedded In-App Scheduler */}
        <div className="flex-1 bg-white dark:bg-[#121214] relative overflow-hidden flex flex-col">
          <iframe
            src="https://cal.com/tapat-christcarl/30min?embed=1"
            title="Schedule a Call"
            className="w-full h-full border-0 bg-white dark:bg-[#020001]"
            allow="camera; microphone; fullscreen; display-capture"
          />
        </div>

        {/* Modal Footer with clear exit context */}
        <div className="px-5 py-2.5 bg-[#F7F7F8]/90 dark:bg-[#121215]/90 backdrop-blur-md border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-[11px] font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E]">
          <span>Need to email instead? <a href="mailto:engr.christcarl@gmail.com" className="text-[#FF5600] hover:underline font-medium">engr.christcarl@gmail.com</a></span>
          <button
            type="button"
            onClick={onClose}
            className="text-[#4A4A4A] dark:text-[#9E9E9E] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
