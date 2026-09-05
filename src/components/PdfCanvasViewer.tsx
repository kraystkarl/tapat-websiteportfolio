import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Loader2,
  Maximize2,
  AlertCircle
} from 'lucide-react';

// Configure the worker to use the local worker script in public/
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface PdfCanvasViewerProps {
  url: string;
  title?: string;
  className?: string;
  maxContainerHeight?: string;
  onExpand?: () => void;
}

export const PdfCanvasViewer: React.FC<PdfCanvasViewerProps> = ({
  url,
  title,
  className = '',
  maxContainerHeight = '560px',
  onExpand,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.25);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [renderTask, setRenderTask] = useState<any>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  // Load document when url changes
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);
    setPageNum(1);

    const loadingTask = pdfjsLib.getDocument({
      url,
      cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
      cMapPacked: true,
    });

    loadingTask.promise
      .then((doc) => {
        if (isCancelled) return;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setLoading(false);
      })
      .catch((err) => {
        if (isCancelled) return;
        console.error('PDF.js failed to load document:', err);
        setError('Failed to load PDF document.');
        setLoading(false);
      });

    return () => {
      isCancelled = true;
      loadingTask.destroy().catch(() => {});
    };
  }, [url, retryCount]);

  // Render current page when pdfDoc, pageNum, or scale changes
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let isCurrent = true;

    // Cancel any ongoing render task
    if (renderTask) {
      try {
        renderTask.cancel();
      } catch {
        // ignore cancellation error
      }
    }

    pdfDoc.getPage(pageNum).then((page) => {
      if (!isCurrent || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      // Calculate viewport and high-DPI scaling
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2.5);
      const viewport = page.getViewport({ scale });

      canvas.width = Math.floor(viewport.width * pixelRatio);
      canvas.height = Math.floor(viewport.height * pixelRatio);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const transform = pixelRatio !== 1 ? [pixelRatio, 0, 0, pixelRatio, 0, 0] : undefined;

      const task = page.render({
        canvasContext: context,
        transform: transform,
        viewport: viewport,
      });

      setRenderTask(task);

      task.promise
        .then(() => {
          if (isCurrent) setRenderTask(null);
        })
        .catch((err) => {
          if (err?.name !== 'RenderingCancelledException') {
            console.error('Page render error:', err);
          }
        });
    });

    return () => {
      isCurrent = false;
    };
  }, [pdfDoc, pageNum, scale]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.6));
  };

  const handleResetZoom = () => {
    setScale(1.25);
  };

  const handlePrevPage = () => {
    setPageNum((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPageNum((prev) => Math.min(prev + 1, numPages));
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col rounded-2xl bg-[#0D0D10] border border-black/[0.1] dark:border-white/[0.1] overflow-hidden shadow-2xl relative ${className}`}
    >
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-3 py-2 bg-[#121216]/90 backdrop-blur-md border-b border-white/[0.08] gap-2 z-10">
        {/* Left: Page Navigation */}
        <div className="flex items-center gap-1.5 text-xs font-apple-mono">
          {numPages > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={pageNum <= 1}
                className="p-1 rounded-lg bg-white/[0.06] border border-white/[0.1] text-[#9E9E9E] hover:text-[#E0E0E0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-2xs"
                title="Previous Page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 py-0.5 text-[#E0E0E0] font-semibold text-[11px] bg-white/[0.04] rounded-md border border-white/[0.08]">
                Page {pageNum} of {numPages}
              </span>
              <button
                type="button"
                onClick={handleNextPage}
                disabled={pageNum >= numPages}
                className="p-1 rounded-lg bg-white/[0.06] border border-white/[0.1] text-[#9E9E9E] hover:text-[#E0E0E0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-2xs"
                title="Next Page"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}
          {numPages === 1 && (
            <span className="text-[11px] text-[#9E9E9E] font-apple-mono px-2">
              Single-Page Document
            </span>
          )}
        </div>

        {/* Center: Title / Status */}
        {title && (
          <span className="hidden md:inline text-[11px] font-apple-mono text-[#CC8400] truncate max-w-xs font-semibold">
            {title}
          </span>
        )}

        {/* Right: Zoom & Actions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={scale <= 0.6}
            className="p-1 rounded-lg bg-white/[0.06] border border-white/[0.1] text-[#9E9E9E] hover:text-[#E0E0E0] disabled:opacity-30 transition-colors shadow-2xs"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-apple-mono text-[#9E9E9E] px-1.5 w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={scale >= 2.5}
            className="p-1 rounded-lg bg-white/[0.06] border border-white/[0.1] text-[#9E9E9E] hover:text-[#E0E0E0] disabled:opacity-30 transition-colors shadow-2xs"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            className="p-1 rounded-lg bg-white/[0.06] border border-white/[0.1] text-[#9E9E9E] hover:text-[#E0E0E0] transition-colors ml-0.5 shadow-2xs"
            title="Reset Zoom (Fit)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          {onExpand && (
            <button
              type="button"
              onClick={onExpand}
              className="inline-flex items-center gap-1 p-1 px-2 rounded-lg bg-white/[0.06] border border-white/[0.1] text-[#9E9E9E] hover:text-[#FF5600] text-[10px] font-apple-mono transition-colors ml-1 cursor-pointer font-medium shadow-2xs"
              title="Expand inside modal"
            >
              <Maximize2 className="w-3 h-3 text-[#FF5600]" />
              <span className="hidden sm:inline">Expand</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Canvas Scroll Viewport */}
      <div
        className="flex-1 overflow-auto p-4 flex items-start justify-center bg-[#07080A] relative select-none"
        style={{ maxHeight: maxContainerHeight, minHeight: '380px' }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#07080A]/80 backdrop-blur-sm z-20">
            <Loader2 className="w-8 h-8 text-[#FF5600] animate-spin" />
            <span className="text-xs font-apple-mono text-[#9E9E9E]">
              Rendering high-resolution vector PDF...
            </span>
          </div>
        )}

        {error ? (
          <div className="p-8 text-center flex flex-col items-center justify-center gap-3 text-[#E0E0E0] my-auto">
            <AlertCircle className="w-10 h-10 text-[#CC8400]" />
            <p className="text-xs font-apple-mono text-[#9E9E9E] max-w-sm">
              {error}
            </p>
            <button
              type="button"
              onClick={() => setRetryCount((prev) => prev + 1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#18181B] border border-[#333333] hover:border-[#FF5600]/40 text-[#E0E0E0] font-semibold text-xs font-apple-mono transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#FF5600]" />
              <span>Retry Rendering</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-2xl p-1 inline-block transition-all duration-150 select-none">
            <canvas
              ref={canvasRef}
              className="block max-w-none select-none pointer-events-none"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        )}
      </div>

      {/* Footer info bar */}
      <div className="px-3 py-1.5 bg-[#121216]/90 backdrop-blur-md border-t border-white/[0.08] flex items-center justify-between text-[10px] font-apple-mono text-[#9E9E9E]">
        <span>Rendered via HTML5 Canvas (No browser plugin blocking)</span>
        <span className="text-[#CC8400] font-medium">Crisp High-DPI Vector Output</span>
      </div>
    </div>
  );
};
