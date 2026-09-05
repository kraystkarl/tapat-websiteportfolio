import React, { useState } from 'react';
import {
  CheckCircle2,
  ZoomIn,
  ChevronRight,
  Layers,
  ShieldCheck,
  Maximize2,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { ProofStepItem, ProofImage } from '../types';
import { PdfCanvasViewer } from './PdfCanvasViewer';

interface ProofSectionProps {
  onInspectDocument: (item: {
    src: string;
    title: string;
    category?: string;
    description?: string;
    isPdf?: boolean;
    pages?: number;
  }) => void;
}

export const ProofSection: React.FC<ProofSectionProps> = ({ onInspectDocument }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeTakeoffSubIndex, setActiveTakeoffSubIndex] = useState(0);

  // Original 6-Phase Workflow Sequence — preserved in full structure
  // The old Excel screenshots are now replaced with the authentic PDF documents
  // All 6 Bluebeam takeoff marked-up drawings are preserved in Step 01
  const proofSteps: ProofStepItem[] = [
    {
      id: 'step-01',
      stepNumber: '01',
      name: 'TAKE-OFF',
      tool: 'Bluebeam Revu',
      title: 'Plan Calibration & Digital Quantity Take-Offs',
      description: 'Scale verification across architectural sheets and digital polygon take-offs for landscape areas, floor/ceiling finishes, door/window counts, roofing pitch, and linear perimeters.',
      storyContext: {
        unclearOrGoal: 'Calibrate drawing scale accurately and measure all architectural components directly from vectorized PDF sheets.',
        actionTaken: 'Set calibrated dimensions on plan views; generated dedicated subject layers for landscape areas, door/window counts, ceiling/floor finishes, roof geometry, and cornice perimeters.',
        outcome: 'Precision quantities captured in Bluebeam Markups List ready for export with exact measurement types and visual redline boundaries.',
      },
      images: [
        {
          src: '/assets/proof/plan-calibration.jpg',
          title: 'Plan Calibration Verification',
          category: 'Bluebeam Revu · Scale Setting',
          description: 'Verifying known dimension scale before measuring to guarantee 100% geometric accuracy.',
        },
        {
          src: '/assets/proof/area-takeoff-landscape.jpg',
          title: 'Landscape & External Area Take-Off',
          category: 'Bluebeam Revu · Area Polygon',
          description: 'Color-coded area markups for softscape, hardscape, pavements, and garden boundaries.',
        },
        {
          src: '/assets/proof/count-takeoff-doors-windows.jpg',
          title: 'Door & Window Count Take-Off',
          category: 'Bluebeam Revu · Count Markups',
          description: 'Exact itemized schedule counting for internal/external doors, aluminium windows, and glazing.',
        },
        {
          src: '/assets/proof/area-takeoff-ceiling-floor.jpg',
          title: 'Ceiling & Floor Finishes Take-Off',
          category: 'Bluebeam Revu · Area Measurements',
          description: 'Room-by-room area take-offs for ceramic tile, timber flooring, and plasterboard ceiling linings.',
        },
        {
          src: '/assets/proof/roofing-take-off.jpg',
          title: 'Roofing Geometry & Pitch Take-Off',
          category: 'Bluebeam Revu · Rafter & Sheeting',
          description: 'Calculating plan roof areas and applying slope pitch multipliers for roof sheeting and insulation.',
        },
      ],
    },
    {
      id: 'step-02',
      stepNumber: '02',
      name: 'CALCULATION',
      tool: 'Microsoft Excel',
      title: 'Quantity Derivation & Formula Calculations',
      description: 'Translating raw measured values into true purchase and installation quantities by applying slope multipliers, pitch factors, and standard material waste percentages.',
      storyContext: {
        unclearOrGoal: 'Plan measurements represent flat nominal dimensions; actual material procurement requires slope adjustments and waste factors.',
        actionTaken: 'Built dynamic Excel formulas converting measured Bluebeam markup areas into derived quantities (e.g. Roof Area × Pitch Factor 1.05 + 8% Waste).',
        outcome: 'Transparent, formula-linked lineage from raw drawing measurement to calculated trade quantity.',
      },
      images: [
        {
          src: '/pdfs/06_CSV_Traceability.pdf',
          title: 'Formula Derivation & Quantity Calculations',
          category: 'Excel Pack · Calculation Lineage',
          description: 'Direct CSV takeoff support and formula derivation tracing raw Bluebeam export rows (lengths, areas, counts) into intermediate computation roles and final BOQ quantities with zero variance.',
          isPdf: true,
          pages: 1,
        },
      ],
    },
    {
      id: 'step-03',
      stepNumber: '03',
      name: 'BOQ',
      tool: 'Microsoft Excel',
      title: 'Bill of Quantities (BOQ – Reviewed)',
      description: 'Structured, trade-by-trade BOQ organizing quantities into standardized line items, clear work descriptions, measurement units, unit rates, and total amounts.',
      storyContext: {
        unclearOrGoal: 'Transform derived quantities into an industry-standard format ready for pricing, contractor bidding, and client review.',
        actionTaken: 'Formatted quantities into itemized trade divisions (Demolition, Concrete, Carpentry, Finishes, Doors/Windows) with standardized descriptions and units.',
        outcome: 'A comprehensive, reviewed Bill of Quantities providing full transparency for tenders and budget approvals.',
      },
      images: [
        {
          src: '/pdfs/01_BOQ_Reviewed.pdf',
          title: 'BOQ Reviewed · Main Bill of Quantities',
          category: 'Excel Pack · Trade BOQ',
          description: 'Complete 3-page audited Bill of Quantities covering 11 architectural trade divisions with source lineage formulas and verification audit statuses.',
          isPdf: true,
          pages: 3,
        },
      ],
    },
    {
      id: 'step-04',
      stepNumber: '04',
      name: 'RFI',
      tool: 'Microsoft Excel',
      title: 'Request for Information (RFI – Demonstration)',
      description: 'Documenting plan queries and schedule discrepancies (e.g. door schedule contradictions between architectural floor plan and door schedule notes) to eliminate estimating ambiguity.',
      storyContext: {
        unclearOrGoal: 'Floor plan callouts indicated 900mm wide doors, while the door schedule specified 800mm leaf dimensions.',
        actionTaken: 'Logged an itemized RFI referencing drawing sheet numbers, pinpointing the contradiction, and proposing a documented basis of estimate pending clarification.',
        outcome: 'Preconstruction risk mitigated by eliminating guesswork before tender finalization.',
      },
      images: [
        {
          src: '/pdfs/03_RFI_Demonstration.pdf',
          title: 'RFI Demonstration · Door Schedule Discrepancy',
          category: 'Excel Pack · RFI Log',
          description: 'Demonstration record (RFI-001) documenting plan queries, Bluebeam count sheet discrepancies, and documented estimator resolution.',
          isPdf: true,
          pages: 1,
        },
        {
          src: '/pdfs/05_Review_Notes.pdf',
          title: 'Review Notes & Scope Tracker',
          category: 'Excel Pack · Assumptions & Scope',
          description: 'Comprehensive quality assurance and reconciliation review notes documenting scope verification, baseline preservation, and source confirmations.',
          isPdf: true,
          pages: 1,
        },
      ],
    },
    {
      id: 'step-05',
      stepNumber: '05',
      name: 'QC / RECONCILIATION',
      tool: 'Microsoft Excel',
      title: 'Quality Control & Reconciliation (QC – Reviewed)',
      description: 'Systematic cross-checking comparing raw Bluebeam markups against BOQ totals, verifying formula integrity, checking for omission/double-counting, and reconciling mathematical balance.',
      storyContext: {
        unclearOrGoal: 'Ensure zero mathematical errors, missed markups, or unit transposition discrepancies before final submittal.',
        actionTaken: 'Implemented a dedicated QC reconciliation matrix comparing take-off summary totals directly against BOQ line item sums with variance checking.',
        outcome: '100% mathematical reconciliation confirmed with verified formula audit trails.',
      },
      images: [
        {
          src: '/pdfs/02_QC_Reviewed.pdf',
          title: 'QC Reviewed · Reconciliation Matrix',
          category: 'Excel Pack · Quality Control',
          description: 'Rigorous 13-point quality control reconciliation matrix comparing Bluebeam measurement markups against expected calculations with zero unresolved variance.',
          isPdf: true,
          pages: 1,
        },
      ],
    },
    {
      id: 'step-06',
      stepNumber: '06',
      name: 'TRACEABILITY',
      tool: 'Microsoft Excel',
      title: 'CSV Traceability & Audit Trail',
      description: 'Direct audit link connecting every take-off markup exported from Bluebeam to the exact corresponding line item in the Excel pricing workbook.',
      storyContext: {
        unclearOrGoal: 'Enable an employer or lead estimator to verify any single number on the BOQ back to the exact physical markup on the plan.',
        actionTaken: 'Exported Bluebeam markups with unique ID tags and mapped them column-by-column into the Excel CSV traceability sheet.',
        outcome: 'Complete end-to-end transparency: Plan Markup ID → CSV Line → Quantity Calculation → BOQ Line Item.',
      },
      images: [
        {
          src: '/pdfs/06_CSV_Traceability.pdf',
          title: 'CSV Traceability Matrix',
          category: 'Excel Pack · Markup to BOQ Audit',
          description: 'Direct mapping linking Bluebeam subject markup IDs, filtered rows, and formula derivations to BOQ lines with verified mathematical proof.',
          isPdf: true,
          pages: 1,
        },
        {
          src: '/pdfs/04_Evidence_Index.pdf',
          title: 'Evidence Index & Sheet Register',
          category: 'Excel Pack · Drawing Register',
          description: 'Centralized master register indexing drawing scales, area polygons, count sheets, and Colorbond roofing geometries.',
          isPdf: true,
          pages: 1,
        },
      ],
    },
  ];

  const currentStep = proofSteps[activeStepIndex];
  const currentImages = currentStep.images;
  const activeImage: ProofImage = currentImages[Math.min(activeTakeoffSubIndex, currentImages.length - 1)] || currentImages[0];
  const isPdf = Boolean(activeImage.isPdf || activeImage.src.toLowerCase().endsWith('.pdf'));

  return (
    <section id="proof" className="py-20 sm:py-28 bg-transparent relative scroll-mt-20">
      {/* Background Subtle Ambient Neutral */}
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-bl from-black/[0.02] dark:from-white/[0.02] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header with Clear Demonstration Badge */}
        <div className="flex flex-col gap-3 max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-apple-mono text-[#CC8400] uppercase tracking-widest font-semibold">
              04 / Estimating Proof of Capability
            </span>
            <span className="text-xs font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E]">·</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#CC8400]/10 border border-[#CC8400]/30 text-[11px] font-apple-mono text-[#CC8400] uppercase font-semibold">
              Current Independent Demonstration Project
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-tight font-apple-display">
            Bluebeam Revu + Excel Estimating Workflow
          </h2>

          <p className="text-sm sm:text-base text-[#4A4A4A] dark:text-[#9E9E9E] leading-relaxed font-apple-text">
            A complete, source-verified preconstruction walkthrough demonstrating the six essential phases of a disciplined estimating package—from plan calibration to full audit traceability.
          </p>
        </div>

        {/* 6-Step Horizontal Progress Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8 p-1.5 rounded-2xl liquid-card border border-black/[0.06] dark:border-white/[0.08] shadow-xs">
          {proofSteps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  setActiveStepIndex(idx);
                  setActiveTakeoffSubIndex(0);
                }}
                className={`p-3 rounded-xl text-left flex flex-col gap-1 transition-all cursor-pointer select-none ${
                  isActive
                    ? 'liquid-card border border-[#FF5600]/40 dark:border-[#FF5600]/40 shadow-xs text-[#1A1A1A] dark:text-[#E0E0E0] ring-1 ring-[#FF5600]/10'
                    : 'text-[#4A4A4A] dark:text-[#9E9E9E] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] hover:bg-black/[0.02] dark:hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-[10px] font-apple-mono font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                    isActive ? 'bg-[#FF5600] text-white' : 'bg-black/[0.05] dark:bg-white/[0.08] text-[#4A4A4A] dark:text-[#9E9E9E]'
                  }`}>
                    {step.stepNumber}
                  </span>
                  <span className="text-[10px] font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E] truncate text-right">
                    {idx === 0 ? 'Bluebeam' : 'Microsoft Excel'}
                  </span>
                </div>
                <span className={`text-xs font-semibold mt-1 font-apple-display truncate ${
                  isActive ? 'text-[#FF5600]' : 'text-[#6B7280] dark:text-[#737373]'
                }`}>
                  {step.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Proof Display Card */}
        <div className="rounded-3xl overflow-hidden liquid-card border border-black/[0.07] dark:border-white/[0.09] shadow-xl flex flex-col">
          
          {/* Card Top Header */}
          <div className="px-5 py-3.5 bg-[#F7F7F8]/80 dark:bg-[#121215]/80 backdrop-blur-md border-b border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between">
            <span className="text-xs font-apple-mono uppercase tracking-wider text-[#4A4A4A] dark:text-[#9E9E9E] font-semibold">
              Evidence Viewer
            </span>
            <div className="flex items-center gap-2 text-xs font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E]">
              <span className="text-[#1A1A1A] dark:text-[#E0E0E0] font-medium">{activeImage.title}</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-8">
          
            {/* Header of Active Step */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-black/[0.05] dark:border-white/[0.06] pb-6">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 font-apple-mono text-xs text-[#CC8400]">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#CC8400]/10 border border-[#CC8400]/30 font-semibold">
                    Phase {currentStep.stepNumber} of 06
                  </span>
                  <span>•</span>
                  <span className="text-[#1A1A1A] dark:text-[#E0E0E0] font-medium">{currentStep.tool}</span>
                  {isPdf && (
                    <>
                      <span>•</span>
                      <span className="text-[#4A4A4A] dark:text-[#9E9E9E]">Vector PDF Evidence</span>
                    </>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-display">
                  {currentStep.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4A4A4A] dark:text-[#9E9E9E] max-w-3xl leading-relaxed font-apple-text">
                  {currentStep.description}
                </p>
              </div>

              {/* Inspect / Open Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    onInspectDocument({
                      src: activeImage.src,
                      title: activeImage.title,
                      category: activeImage.category,
                      description: activeImage.description,
                      isPdf: isPdf,
                      pages: activeImage.pages,
                    })
                  }
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] text-xs font-apple-mono text-[#1A1A1A] dark:text-[#E0E0E0] hover:text-[#FF5600] hover:border-[#FF5600]/40 transition-all cursor-pointer shadow-xs active:scale-95 font-medium"
                >
                  {isPdf ? (
                    <>
                      <Maximize2 className="w-4 h-4 text-[#FF5600]" />
                      <span>Expand QuickLook</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-4 h-4 text-[#FF5600]" />
                      <span>Inspect High-Res</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* If step has multiple items, show selector buttons */}
            {currentImages.length > 1 && (
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E] font-semibold">
                  {activeStepIndex === 0
                    ? 'Select Drawing / Take-Off Evidence:'
                    : 'Select Document / Sheet Evidence:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentImages.map((img, subIdx) => {
                    const isSubActive = activeTakeoffSubIndex === subIdx;
                    return (
                      <button
                        key={subIdx}
                        type="button"
                        onClick={() => setActiveTakeoffSubIndex(subIdx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-apple-mono transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                          isSubActive
                            ? 'bg-[#FF5600]/10 border border-[#FF5600]/40 text-[#FF5600] font-medium shadow-xs'
                            : 'bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.07] text-[#4A4A4A] dark:text-[#9E9E9E] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] hover:border-[#FF5600]/30'
                        }`}
                      >
                        {img.isPdf ? (
                          <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                        ) : (
                          <ImageIcon className="w-3.5 h-3.5 flex-shrink-0" />
                        )}
                        <span>{img.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          {/* Visual Evidence Canvas + Context Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visual Evidence Showcase: PDF Embedded Viewer OR High-Res Image */}
            <div className="lg:col-span-8 flex flex-col gap-3">
              {isPdf ? (
                /* Authentic Vector PDF Viewer via HTML5 Canvas */
                <PdfCanvasViewer
                  url={activeImage.src}
                  title={activeImage.title}
                  maxContainerHeight="580px"
                  onExpand={() =>
                    onInspectDocument({
                      src: activeImage.src,
                      title: activeImage.title,
                      category: activeImage.category,
                      description: activeImage.description,
                      isPdf: true,
                      pages: activeImage.pages,
                    })
                  }
                />
              ) : (
                /* High-Resolution Take-Off Image Viewer */
                <div
                  onClick={() =>
                    onInspectDocument({
                      src: activeImage.src,
                      title: activeImage.title,
                      category: activeImage.category,
                      description: activeImage.description,
                      isPdf: false,
                    })
                  }
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-[#AAAAAA]/30 dark:border-[#333333] shadow-xl cursor-zoom-in flex items-center justify-center min-h-[360px] sm:min-h-[460px] select-none"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <img
                    src={activeImage.src}
                    alt={activeImage.title}
                    className="w-full h-auto max-h-[560px] object-contain p-2 rounded-xl group-hover:scale-[1.01] transition-transform duration-300 select-none pointer-events-none"
                    loading="lazy"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onError={(e) => {
                      const img = e.currentTarget;
                      // Fallback between hyphenated and uppercase original if needed
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

                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-apple-mono text-white backdrop-blur-[2px]">
                    <ZoomIn className="w-5 h-5 text-[#FF5600]" />
                    <span>Click to Zoom & Pan High-Resolution Evidence</span>
                  </div>

                  {/* Bottom Source Tag */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 border border-white/15 text-[10px] font-apple-mono text-[#CC8400]">
                    Source-Verified Evidence
                  </div>
                </div>
              )}

              {/* Caption */}
              <div className="flex flex-wrap items-center justify-between text-xs font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E] px-1 gap-2">
                <span>{activeImage.category}</span>
                <span className="text-[#FF5600] font-medium">{activeImage.title}</span>
              </div>
            </div>

            {/* Context Story Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-3.5">
              
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.07] flex flex-col gap-2 shadow-2xs">
                <span className="text-[11px] font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E] flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#CC8400]" />
                  Objective & Scope
                </span>
                <p className="text-xs text-[#1A1A1A] dark:text-[#E0E0E0] leading-relaxed font-apple-text">
                  {currentStep.storyContext.unclearOrGoal}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.07] flex flex-col gap-2 shadow-2xs">
                <span className="text-[11px] font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E] flex items-center gap-1.5 font-semibold">
                  <Layers className="w-3.5 h-3.5 text-[#CC8400]" />
                  Action Taken
                </span>
                <p className="text-xs text-[#1A1A1A] dark:text-[#E0E0E0] leading-relaxed font-apple-text">
                  {currentStep.storyContext.actionTaken}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.07] flex flex-col gap-2 shadow-2xs">
                <span className="text-[11px] font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E] flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#CC8400]" />
                  Estimating Outcome
                </span>
                <p className="text-xs text-[#1A1A1A] dark:text-[#E0E0E0] leading-relaxed font-apple-text">
                  {currentStep.storyContext.outcome}
                </p>
              </div>

              {/* Step Navigator Next / Prev */}
              <div className="flex items-center justify-between pt-3 border-t border-black/[0.05] dark:border-white/[0.06]">
                <button
                  type="button"
                  disabled={activeStepIndex === 0}
                  onClick={() => {
                    setActiveStepIndex((prev) => Math.max(0, prev - 1));
                    setActiveTakeoffSubIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-apple-mono transition-all ${
                    activeStepIndex === 0
                      ? 'opacity-30 cursor-not-allowed'
                      : 'text-[#4A4A4A] dark:text-[#9E9E9E] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] hover:border-[#FF5600]/40 cursor-pointer shadow-2xs'
                  }`}
                >
                  ← Previous Phase
                </button>

                <button
                  type="button"
                  disabled={activeStepIndex === proofSteps.length - 1}
                  onClick={() => {
                    setActiveStepIndex((prev) => Math.min(proofSteps.length - 1, prev + 1));
                    setActiveTakeoffSubIndex(0);
                  }}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-apple-mono transition-all ${
                    activeStepIndex === proofSteps.length - 1
                      ? 'opacity-30 cursor-not-allowed'
                      : 'text-white bg-[#FF5600] hover:bg-[#E04D00] cursor-pointer font-medium shadow-[0_2px_8px_rgba(255,86,0,0.3)]'
                  }`}
                >
                  <span>Next Phase</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  </section>
);
};
