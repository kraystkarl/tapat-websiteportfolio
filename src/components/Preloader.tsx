import React, { useRef, useLayoutEffect, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';

const INK = '#0F172A';

const KINETIC_WORDS = ['DETAIL-ORIENTED', 'PROACTIVE', 'DEPENDABLE', 'GROWS WITH YOU'];

/* Static companion line per kinetic word — swaps in sync with the carousel. */
const STATIC_ROWS = [
  'YOUR REMOTE ASSISTANT THAT IS',
  'YOUR REMOTE ASSISTANT THAT IS',
  'YOUR REMOTE ASSISTANT THAT IS',
  'YOUR REMOTE ASSISTANT THAT',
];

/* Matte paper grain (inline SVG turbulence, whisper-quiet). */
const PAPER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

interface PreloaderProps {
  onDone: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onDone }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const doneRef = useRef(false);
  const [staticIndex, setStaticIndex] = useState(0);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    timelineRef.current?.kill();
    onDone();
  }, [onDone]);

  /* Kinetic word carousel + soft dissolve into the homepage. */
  useLayoutEffect(() => {
    /* Reduced motion: skip the show entirely. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          /* Words already rolled out to blank — lift the veil. */
          const out = gsap.timeline({ onComplete: () => finish() });
          timelineRef.current = out;
          out
            .to('.kstatic-wrap', { y: -16, autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, 0)
            .to(rootRef.current, { opacity: 0, duration: 0.4 }, '-=0.2');
        },
      });
      timelineRef.current = tl;

      /* Static lockup fades in once at the start — then never moves. */
      tl.fromTo('.kstatic-wrap', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power1.out' }, 0.15);

      /* Rolling reel: one strip, one row per roll, identical timing.
         One continuous water level rises 0 → 100% from preloader start
         to finish — only the centered row is ever visible, so the level
         can never overlap or smear. */
      const fill = { p: 0 };
      tl.to(fill, {
        p: 100,
        duration: 5.45,
        ease: 'none',
        onUpdate: () => {
          document.querySelectorAll('.kfill').forEach((el) => {
            (el as HTMLElement).style.setProperty('--fill', `${fill.p}%`);
          });
        },
      }, 0.4);
      KINETIC_WORDS.forEach((_, wi) => {
        const at = 0.4 + wi * 1.15;
        tl.add(() => setStaticIndex(wi), at);
        tl.to('.kreel', {
          yPercent: -(wi + 1) * (100 / 6),
          duration: 0.6,
          ease: 'expo.inOut',
        }, at);
      });
      /* Final roll: the last word holds ~2s, rolls out to blank, veil lifts. */
      tl.to('.kreel', {
        yPercent: -5 * (100 / 6),
        duration: 0.6,
        ease: 'expo.inOut',
      }, 0.4 + 3 * 1.15 + 2.0);
    }, rootRef);

    /* Failsafe: never trap the visitor longer than 12s. */
    const failsafe = setTimeout(finish, 12000);
    return () => {
      clearTimeout(failsafe);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-label="Loading"
      role="status"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 100,
        background: '#F1EFE7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Matte paper grain over a warm sheet tone */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, #F4F2EA 0%, #EFECE2 100%), ${PAPER_GRAIN}`,
          opacity: 1,
        }}
      />
      <style>{`
        .kwords { perspective: 1000px; }
        .kwords > span { transform-style: preserve-3d; }
      `}</style>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: PAPER_GRAIN,
          opacity: 0.16,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Centered justified lockup */}
      <div
        style={{
          position: 'relative',
          width: 'min(90vw, 880px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: '14px',
        }}
      >
        {/* Static row: two justified layers crossfading with zero movement */}
        <span
          className="kstatic-wrap"
          aria-label={STATIC_ROWS[staticIndex]}
          style={{ display: 'grid', opacity: 0 }}
        >
          {['YOUR REMOTE ASSISTANT THAT IS', 'YOUR REMOTE ASSISTANT THAT'].map((row, ri) => {
            const show = (staticIndex === 3 ? 1 : 0) === ri;
            return (
              <span
                key={row}
                aria-hidden={!show}
                style={{
                  gridArea: '1 / 1',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif",
                  fontSize: 'clamp(20px, 3.4vw, 34px)',
                  letterSpacing: 0,
                  color: INK,
                  whiteSpace: 'nowrap',
                  opacity: show ? 1 : 0,
                  transition: 'opacity 0.35s ease',
                }}
              >
                {row.split('').map((ch, i) => (
                  <span key={i} style={{ display: 'inline-block' }}>
                    {ch === ' ' ? '\u00A0' : ch}
                  </span>
                ))}
              </span>
            );
          })}
        </span>

        <span
          aria-hidden
          style={{ height: '2px', background: INK, opacity: 0.85, borderRadius: '2px' }}
        />

        {/* Rolling window: one row visible, strip rolls through all words */}
        <span
          className="kwords"
          style={{
            display: 'block',
            width: '100%',
            height: '1.12em',
            overflow: 'hidden',
            position: 'relative',
            fontSize: 'clamp(44px, 7.6vw, 92px)',
            lineHeight: 1,
            textAlign: 'center',
          }}
        >
          <span className="kreel" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <span aria-hidden style={{ height: '1.12em', flexShrink: 0 }} />
            {KINETIC_WORDS.map((word, wi) => (
              <span
                key={word}
                className={`krow-${wi}`}
                style={{
                  height: '1.12em',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                }}
              >
                {/* Water behind: paint cropped exactly to the glyph interiors */}
                <span
                  aria-hidden
                  className="kfill"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    whiteSpace: 'nowrap',
                    color: 'transparent',
                    background:
                      'linear-gradient(to top, #FF5600 var(--fill, 0%), rgba(255,86,0,0) var(--fill, 0%))',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    ...({ '--fill': '0%' } as React.CSSProperties),
                  }}
                >
                  {word}
                </span>
                {/* Hollow outline in front */}
                <span
                  style={{
                    position: 'relative',
                    color: 'transparent',
                    WebkitTextStroke: `2px ${INK}`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
            <span aria-hidden style={{ height: '1.12em', flexShrink: 0 }} />
          </span>
        </span>
      </div>

      <button
        type="button"
        onClick={finish}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '24px',
          background: 'none',
          border: 'none',
          fontSize: '12px',
          fontWeight: 600,
          color: '#94A3B8',
          cursor: 'pointer',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
        }}
      >
        Skip
      </button>
    </div>
  );
};
