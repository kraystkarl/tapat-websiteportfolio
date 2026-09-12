import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

interface SectionControlsProps {
  currentIndex: number;
  totalSections: number;
  sectionNames: string[];
  onPrevious: () => void;
  onNext: () => void;
}

export const SectionControls: React.FC<SectionControlsProps> = ({
  currentIndex,
  totalSections,
  sectionNames,
  onPrevious,
  onNext,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const currentSectionName = sectionNames[currentIndex] || '';
  const nextSectionName = sectionNames[currentIndex + 1] || '';
  const prevSectionName = sectionNames[currentIndex - 1] || '';
  const progressRatio = totalSections > 1 ? currentIndex / (totalSections - 1) : 0;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSections - 1;

  if (isMinimized) {
    return (
      <div
        id="cn-section-controls"
        className="cn-section-controls cn-minimized"
        aria-label="Section Navigation Controls (Minimized)"
      >
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-3 py-1 text-[11px] font-space text-[#FF5600] font-bold hover:text-[#E04C00] dark:hover:text-white transition-colors cursor-pointer"
          title="Click to expand navigation controls"
        >
          <span>{String(currentIndex + 1).padStart(2, '0')}/{String(totalSections).padStart(2, '0')}</span>
          <span className="hidden sm:inline-block text-[#666666] dark:text-[#A0A0A0] font-manrope font-semibold text-[10px] truncate max-w-[100px]">
            · {currentSectionName}
          </span>
          <ChevronUp className="w-3.5 h-3.5 opacity-75" />
        </button>
      </div>
    );
  }

  return (
    <div
      id="cn-section-controls"
      className="cn-section-controls"
      aria-label="Section Navigation Controls"
    >
      {/* Previous Section Button */}
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirst}
        aria-label="Previous Section"
        className="cn-ctrl-btn"
        title={isFirst ? 'At First Section' : `Back to ${prevSectionName} (Arrow Left)`}
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {/* Center Progress & Section Title */}
      <div className="flex items-center gap-2 px-2 py-0.5 select-none">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-space text-[#FF5600] font-bold tracking-wider">
              {String(currentIndex + 1).padStart(2, '0')}/{String(totalSections).padStart(2, '0')}
            </span>
            <span className="text-[#333333] dark:text-[#E0E0E0] font-manrope font-bold text-[11px] max-w-[85px] sm:max-w-[130px] truncate">
              {currentSectionName}
            </span>
          </div>

          {/* Progress Line */}
          <div
            className="cn-progress-bar mt-0.5"
            aria-hidden="true"
            title={`Section ${currentIndex + 1} of ${totalSections}: ${currentSectionName}`}
          >
            <span
              className="cn-progress-fill"
              style={{ transform: `scaleX(${progressRatio})` }}
            />
          </div>
        </div>
      </div>

      {/* Next Section Button with Accent */}
      <button
        type="button"
        onClick={onNext}
        disabled={isLast}
        aria-label="Next Section"
        className="cn-ctrl-btn btn-next"
        title={isLast ? 'At Last Section' : `Next: ${nextSectionName} (Arrow Right)`}
      >
        <span className="text-[11px] font-bold">Next</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

      {/* Minimize Button */}
      <button
        type="button"
        onClick={() => setIsMinimized(true)}
        aria-label="Minimize navigation controls"
        className="p-1 rounded-full text-[#7A7A7A] dark:text-[#9E9E9E] hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        title="Minimize controls"
      >
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

