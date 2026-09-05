import React, { useEffect } from 'react';
import { X, FileText, Image as ImageIcon } from 'lucide-react';
import { PdfCanvasViewer } from './PdfCanvasViewer';

interface ProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentItem: {
    src: string;
    title: string;
    category?: string;
    description?: string;
    isPdf?: boolean;
    pages?: number;
  } | null;
}

export const ProofModal: React.FC<ProofModalProps> = ({ isOpen, onClose, documentItem }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !documentItem) return null;

  const isPdf = Boolean(documentItem.isPdf || documentItem.src.toLowerCase().endsWith('.pdf'));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/70 backdrop-blur-xl overflow-hidden transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl h-[88vh] max-h-[840px] liquid-card border border-black/[0.08] dark:border-white/[0.12] rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3.5 border-b border-black/[0.05] dark:border-white/[0.06] bg-[#F7F7F8]/90 dark:bg-[#121215]/90 backdrop-blur-md gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-1.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] text-[#FF5600] flex-shrink-0">
              {isPdf ? <FileText className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-[#CC8400]/10 border border-[#CC8400]/30 text-[10px] font-apple-mono text-[#CC8400] font-semibold">
                  {documentItem.category || (isPdf ? 'Estimating Evidence' : 'Marked-Up Drawing')}
                </span>
                {documentItem.pages && (
                  <span className="text-[10px] font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E]">
                    {documentItem.pages} {documentItem.pages === 1 ? 'Page' : 'Pages'}
                  </span>
                )}
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-display truncate">
                {documentItem.title}
              </h3>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/[0.06] dark:bg-white/10 hover:bg-[#FF5600]/20 text-[#1A1A1A] dark:text-[#E0E0E0] hover:text-[#FF5600] flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              aria-label="Close modal"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewport: HTML5 Canvas PDF Viewer or Protected High-Res Image */}
        <div className="flex-1 bg-black/[0.04] dark:bg-[#0D0D0F] relative overflow-hidden flex flex-col">
          {isPdf ? (
            <PdfCanvasViewer
              url={documentItem.src}
              title={documentItem.title}
              maxContainerHeight="calc(88vh - 125px)"
              className="h-full border-0 rounded-none shadow-none"
            />
          ) : (
            <div
              className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/90 select-none"
              onContextMenu={(e) => e.preventDefault()}
            >
              <img
                src={documentItem.src}
                alt={documentItem.title}
                className="w-full max-h-[calc(88vh-130px)] object-contain rounded-xl select-none pointer-events-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src.includes('plan-calibration')) {
                    img.src = '/assets/proof/PLAN%20CALIBRATION.jpg';
                  } else if (img.src.includes('area-takeoff-landscape')) {
                    img.src = '/assets/proof/AREA%20TAKEOFF%20-%20LANDSCAPE.jpg';
                  } else if (img.src.includes('count-takeoff-doors-windows')) {
                    img.src = '/assets/proof/COUNT%20TAKEOFF%20-%20DOORS%20AND%20WINDOWS.jpg';
                  } else if (img.src.includes('area-takeoff-ceiling-floor')) {
                    img.src = '/assets/proof/AREA%20TAKEOFF%20-%20CEILING%20AND%20FLOOR.jpg';
                  } else if (img.src.includes('roofing-take-off')) {
                    img.src = '/assets/proof/ROOFING%20TAKE%20OFF.jpg';
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-black/[0.05] dark:border-white/[0.06] bg-[#F7F7F8]/90 dark:bg-[#121215]/90 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E]">
          <span className="truncate max-w-2xl text-[#4A4A4A] dark:text-[#9E9E9E]">
            {documentItem.description || 'Verified architectural take-off & estimating documentation.'}
          </span>
          <span className="text-[#FF5600] flex-shrink-0 font-medium">
            Christ Carl U. Tapat · Construction Estimator
          </span>
        </div>
      </div>
    </div>
  );
};
