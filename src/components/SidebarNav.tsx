import React, { useState, useEffect } from 'react';
import {
  House,
  Briefcase,
  GearSix,
  User,
  FileText,
  AddressBook,
  SealCheck,
  LinkedinLogo,
  Envelope,
  WhatsappLogo,
  Sun,
  Moon,
  FileArrowDown,
  CalendarCheck,
  SquaresFour,
  Lock,
  Check,
  Trash,
  Star,
  Clock,
  List,
  X,
} from '@phosphor-icons/react';
import { useTheme } from '../context/ThemeContext';

interface SidebarNavProps {
  activeSectionIndex: number;
  onSelectSection: (index: number) => void;
  viewMode: 'panel' | 'scroll';
  onToggleViewMode: () => void;
  onOpenBooking?: () => void;
}

const ACCENT = '#FF5600';

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeSectionIndex,
  onSelectSection,
  viewMode,
  onToggleViewMode,
  onOpenBooking,
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  /* ---- Owner review inbox (gated by the verified badge) ---- */
  interface InboxItem {
    name: string;
    comment: string;
    stars: number;
    date: string;
  }
  const [adminOpen, setAdminOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState('');
  const [inboxTab, setInboxTab] = useState<'pending' | 'published'>('pending');
  const [pending, setPending] = useState<InboxItem[]>([]);
  const [published, setPublished] = useState<InboxItem[]>([]);

  const readInbox = (key: string): InboxItem[] => {
    try {
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const saveLists = (nextPending: InboxItem[], nextPublished: InboxItem[]) => {
    setPending(nextPending);
    setPublished(nextPublished);
    try {
      localStorage.setItem('pendingTestimonials', JSON.stringify(nextPending));
      localStorage.setItem('approvedTestimonials', JSON.stringify(nextPublished));
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new Event('testimonials-updated'));
  };

  const openAdmin = () => {
    setPending(readInbox('pendingTestimonials'));
    setPublished(readInbox('approvedTestimonials'));
    setAuthed(false);
    setPassword('');
    setPwError('');
    setInboxTab('pending');
    setAdminOpen(true);
  };

  const unlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'sadsawxd') {
      setAuthed(true);
      setPwError('');
    } else {
      setPwError('Incorrect password.');
    }
  };

  // Live Philippine time (Asia/Manila)
  const [phTime, setPhTime] = useState('');
  const [phShort, setPhShort] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-PH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Manila',
    });
    const fmtShort = new Intl.DateTimeFormat('en-PH', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Manila',
    });
    const tick = () => {
      setPhTime(fmt.format(new Date()));
      setPhShort(fmtShort.format(new Date()));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Close mobile drawer on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileDrawerOpen]);

  // 6-item navigation (Audit Package removed per request).
  // Indices map to App section flow after evidence removal:
  // 0 intro · 1 about · 2 experience · 3 methodology · 4 proof · 5 contact
  const navItems = [
    { label: 'Home', index: 0, hash: '#intro', icon: House },
    { label: 'Portfolio', index: 4, hash: '#proof', icon: Briefcase },
    { label: 'Services', index: 3, hash: '#methodology', icon: GearSix },
    { label: 'About', index: 1, hash: '#about', icon: User },
    { label: 'Resume', index: 2, hash: '#experience', icon: FileText },
    { label: 'Contacts', index: 5, hash: '#contact', icon: AddressBook },
  ];

  const socials = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/christ-carl-tapat-23a53241b/',
      icon: LinkedinLogo,
    },
    { label: 'Email', href: 'mailto:christcarltapat@gmail.com', icon: Envelope },
    { label: 'WhatsApp', href: 'https://wa.me/639000000000', icon: WhatsappLogo },
  ];

  const socialCircleStyle: React.CSSProperties = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--card)',
    color: 'var(--body)',
    border: '1px solid var(--card-border)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  };

  const handleSocialEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = ACCENT;
    e.currentTarget.style.color = '#FFFFFF';
    e.currentTarget.style.borderColor = ACCENT;
  };

  const handleSocialLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = 'var(--card)';
    e.currentTarget.style.color = 'var(--body)';
    e.currentTarget.style.borderColor = 'var(--card-border)';
  };

  const handleNavClick = (index: number) => {
    onSelectSection(index);
    setMobileDrawerOpen(false);
  };

  const renderNavButton = (item: (typeof navItems)[number], isActive: boolean) => {
    const Icon = item.icon;
    return (
      <button
        key={item.label}
        type="button"
        onClick={() => handleNavClick(item.index)}
        aria-current={isActive ? 'page' : undefined}
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '14px',
          fontWeight: isActive ? 600 : 500,
          color: isActive ? 'var(--ink)' : 'var(--body)',
          background: isActive ? 'var(--card)' : 'transparent',
          boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.05)' : 'none',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          border: 'none',
          textAlign: 'left',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = 'var(--nav-hover)';
            e.currentTarget.style.color = 'var(--ink)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--body)';
          }
        }}
        className="sidebar-nav-btn group"
      >
        {/* Accent indicator for active pill */}
        {isActive && (
          <span
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              top: '20%',
              bottom: '20%',
              width: '3px',
              borderRadius: '999px',
              background: ACCENT,
            }}
          />
        )}
        <span
          aria-hidden
          className="sidebar-nav-icon"
          style={{
            display: 'inline-flex',
            transition: 'transform 0.2s ease, color 0.2s ease',
            color: isActive ? ACCENT : 'inherit',
          }}
        >
          <Icon size={18} weight={isActive ? 'fill' : 'regular'} />
        </span>
        <span style={{ flex: 1 }}>{item.label}</span>
      </button>
    );
  };

  return (
    <>
      <style>{`
        .sidebar-nav-btn:hover .sidebar-nav-icon { transform: translateX(3px); }
        .sidebar-social-btn { transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease; }
        .sidebar-social-btn:hover { transform: translateY(-2px); }
        @keyframes sidebar-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.45; transform: scale(0.8); } }
        .sidebar-live-dot { animation: sidebar-pulse 1.6s ease-in-out infinite; }
      `}</style>

      {/* =========================================================================
          1. DESKTOP Sidebar (lg and up, 280px / 300px xl)
          Sticky vertical column pinned while main content scrolls independently.
          ========================================================================= */}
      <aside
        id="dossier-sidebar"
        aria-label="Sidebar Portfolio Navigation"
        className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[280px] xl:w-[300px] z-40 flex-col bg-[var(--canvas)] select-none transition-colors duration-300"
        style={{ background: 'var(--canvas)' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            overflowY: 'auto',
            padding: '20px',
          }}
          className="panel-scrollbar"
        >
          {/* ================= TOP BLOCK — Profile & Identity Header ================= */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* 4:3 profile image, calibrated framing: head (y 200–450) + shoulders
                (y 500–750) of the 800×1200 portrait stay visible with headroom */}
            <button
              type="button"
              onClick={() => handleNavClick(0)}
              style={{ padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', width: '100%' }}
              aria-label="Go to Home"
            >
              <img
                src="/assets/profile/IMG_2080-web.jpg"
                alt="Christ Carl U. Tapat"
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  objectFit: 'cover',
                  objectPosition: 'center 30%',
                  borderRadius: '12px',
                  display: 'block',
                  background: '#E2E8F0',
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </button>

            {/* Centered identity */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '12px',
                fontSize: '19px',
                fontWeight: 700,
                color: 'var(--ink)',
                lineHeight: 1.25,
                textAlign: 'center',
                width: '100%',
              }}
            >
              <span>Christ Carl U. Tapat</span>
              <button
                type="button"
                onClick={openAdmin}
                aria-label="Owner access"
                title="Owner access"
                style={{ padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', display: 'inline-flex' }}
              >
                <SealCheck size={19} weight="fill" color={ACCENT} />
              </button>
            </div>
            {/* Centered title */}
            <div
              style={{
                fontSize: '13px',
                color: 'var(--muted)',
                marginTop: '4px',
                textAlign: 'center',
                lineHeight: 1.5,
                textWrap: 'balance',
              }}
            >
              Construction Estimator | Take-off Specialist | Project Coordinator | Civil Engineer
            </div>

            {/* Centered circular action buttons: LinkedIn, Email, WhatsApp, Consultation Schedule */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', justifyContent: 'center' }}>
              {socials.map((s) => {
                const SIcon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={s.label}
                    title={s.label}
                    className="sidebar-social-btn"
                    style={socialCircleStyle}
                    onMouseEnter={handleSocialEnter}
                    onMouseLeave={handleSocialLeave}
                  >
                    <SIcon size={17} />
                  </a>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  if (onOpenBooking) onOpenBooking();
                  else handleNavClick(5);
                }}
                aria-label="Consultation Schedule"
                title="Consultation Schedule"
                className="sidebar-social-btn"
                style={{ ...socialCircleStyle, cursor: 'pointer' }}
                onMouseEnter={handleSocialEnter}
                onMouseLeave={handleSocialLeave}
              >
                <CalendarCheck size={17} />
              </button>
            </div>

            {/* Live availability indicator */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '12px',
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'rgba(255,86,0,0.08)',
                border: '1px solid rgba(255,86,0,0.25)',
              }}
            >
              <span
                aria-hidden
                className="sidebar-live-dot"
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: ACCENT,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: ACCENT }}>
                #OPENFORWORK
              </span>
            </div>
          </div>

          {/* ================= MIDDLE BLOCK — Navigation Menu ================= */}
          <nav
            aria-label="Main Navigation"
            style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '20px' }}
          >
            {navItems.map((item) =>
              renderNavButton(item, activeSectionIndex === item.index),
            )}
          </nav>

          {/* ================= BOTTOM BLOCK — Utilities & System Status ================= */}
          <div style={{ marginTop: 'auto', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Row 1: Theme toggle · Resume PDF · Schedule */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle light/dark mode"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--card)',
                  color: 'var(--body)',
                  border: '1px solid var(--card-border)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <a
                href="/documents/Resume-Construction-Estimator-TAPAT.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  height: '40px',
                  padding: '0 12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  background: 'var(--card)',
                  border: '1px solid var(--card-border)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                <FileArrowDown size={16} color={ACCENT} />
                <span>Resume PDF</span>
              </a>
              <button
                type="button"
                onClick={onToggleViewMode}
                aria-label={viewMode === 'panel' ? 'Switch to scroll view' : 'Switch to slide view'}
                title={viewMode === 'panel' ? 'Switch to scroll view' : 'Switch to slide view'}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--card)',
                  color: 'var(--body)',
                  border: '1px solid var(--card-border)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                {viewMode === 'panel' ? <List size={17} /> : <SquaresFour size={17} />}
              </button>
            </div>

            {/* Row 2: Live status · PH time */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span
                  aria-hidden
                  className="sidebar-live-dot"
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: ACCENT,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', color: 'var(--ink)' }}
                >
                  #OPENFORWORK
                </span>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--body)',
                  fontVariantNumeric: 'tabular-nums',
                  whiteSpace: 'nowrap',
                }}
                title="Live Philippine time (GMT+8)"
              >
                <Clock size={14} color={ACCENT} />
                <span>PH {phShort}</span>
              </span>
            </div>

            {/* Row 3: Copyright · Location */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', color: 'var(--faint)' }}>© 2026 Christ Carl Tapat</span>
              <span style={{ fontSize: '11px', color: 'var(--faint)' }}>US/AU Remote</span>
            </div>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          2. MOBILE & TABLET Header Top Bar (< 1024px)
          ========================================================================= */}
      <header
        id="mobile-header"
        className="lg:hidden fixed top-0 left-0 right-0 h-14 z-30 flex items-center justify-between px-4 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08]"
        style={{ background: 'var(--canvas)' }}
      >
        <button
          type="button"
          onClick={() => handleNavClick(0)}
          className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
        >
          <img
            src="/assets/profile/IMG_2080-web.jpg"
            alt="Christ Carl U. Tapat"
            className="w-8 h-8 rounded-lg object-cover"
            style={{ aspectRatio: '4 / 3', objectPosition: 'center 30%' }}
          />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#0F172A] dark:text-[#F0F0F4] flex items-center gap-1">
              Christ Carl U. Tapat
              <SealCheck size={14} weight="fill" color={ACCENT} />
            </span>
            <span className="text-[10px] text-[#64748B]">
              Construction Estimator · Civil Eng.
            </span>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-white/[0.06] text-[#475569] dark:text-[#D5D5E0] border border-black/[0.06] dark:border-white/[0.08]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={16} color={ACCENT} />
            ) : (
              <Moon size={16} />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-white dark:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.08] text-xs font-semibold text-[#0F172A] dark:text-[#F0F0F4] cursor-pointer"
            aria-label="Open Navigation"
          >
            <List size={16} color={ACCENT} />
            <span>Menu</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          3. MOBILE Sliding Drawer Overlay (< 1024px)
          ========================================================================= */}
      {mobileDrawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="w-full max-w-xs h-full border-l border-black/[0.08] dark:border-white/[0.08] p-5 flex flex-col overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--canvas)' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="flex items-center justify-between w-full pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/assets/profile/IMG_2080-web.jpg"
                    alt="Christ Carl U. Tapat"
                    className="w-10 rounded-lg object-cover"
                    style={{ aspectRatio: '4 / 3', objectPosition: 'center 30%' }}
                  />
                  <div>
                    <div className="text-sm font-bold text-[#0F172A] dark:text-[#F0F0F4] flex items-center gap-1">
                      Christ Carl U. Tapat
                      <button
                        type="button"
                        onClick={() => {
                          setMobileDrawerOpen(false);
                          openAdmin();
                        }}
                        aria-label="Owner access"
                        title="Owner access"
                        style={{ padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', display: 'inline-flex' }}
                      >
                        <SealCheck size={15} weight="fill" color={ACCENT} />
                      </button>
                    </div>
                    <div className="text-[11px] text-[#64748B]" style={{ lineHeight: 1.5 }}>
                      Construction Estimator | Civil Engineer
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-lg bg-black/[0.05] dark:bg-white/[0.06] text-[#4A4A55] dark:text-[#9A9AA6]"
                  aria-label="Close Navigation"
                >
                  <X size={16} />
                </button>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '12px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  background: 'rgba(255,86,0,0.08)',
                  border: '1px solid rgba(255,86,0,0.25)',
                }}
              >
                <span
                  aria-hidden
                  className="sidebar-live-dot"
                  style={{ width: '8px', height: '8px', borderRadius: '50%', background: ACCENT }}
                />
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: ACCENT }}>
                  #OPENFORWORK
                </span>
              </div>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '16px' }}>
                {navItems.map((item) =>
                  renderNavButton(item, activeSectionIndex === item.index),
                )}
              </nav>

              <div style={{ display: 'flex', gap: '8px', marginTop: '16px', justifyContent: 'center' }}>
                {socials.map((s) => {
                  const SIcon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={s.label}
                      title={s.label}
                      className="sidebar-social-btn"
                      style={socialCircleStyle}
                      onMouseEnter={handleSocialEnter}
                      onMouseLeave={handleSocialLeave}
                    >
                      <SIcon size={17} />
                    </a>
                  );
                })}
                <button
                  type="button"
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    if (onOpenBooking) onOpenBooking();
                    else handleNavClick(5);
                  }}
                  aria-label="Consultation Schedule"
                  title="Consultation Schedule"
                  className="sidebar-social-btn"
                  style={{ ...socialCircleStyle, cursor: 'pointer' }}
                  onMouseEnter={handleSocialEnter}
                  onMouseLeave={handleSocialLeave}
                >
                  <CalendarCheck size={17} />
                </button>
              </div>
            </div>

            <div
              className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col gap-2"
              style={{ marginTop: 'auto' }}
            >
              {onOpenBooking && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-2.5 px-3 rounded-[10px] text-white text-xs font-bold flex items-center justify-center gap-2"
                  style={{ background: ACCENT }}
                >
                  <CalendarCheck size={16} />
                  <span>Schedule</span>
                </button>
              )}
              <a
                href="/documents/Resume-Construction-Estimator-TAPAT.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-[10px] bg-white text-xs font-semibold text-center flex items-center justify-center gap-2 text-[#0F172A]"
              >
                <FileArrowDown size={16} color={ACCENT} />
                <span>Resume</span>
              </a>
              <div className="flex items-center justify-between pt-1">
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    color: 'var(--muted)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  <Clock size={13} />
                  <span>{phTime} PHT</span>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--faint)' }}>
                  <span
                    aria-hidden
                    className="sidebar-live-dot"
                    style={{ width: '8px', height: '8px', borderRadius: '50%', background: ACCENT }}
                  />
                  <span>Available</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ================= OWNER REVIEW INBOX (password-gated) ================= */}
      {adminOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 70, background: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={() => setAdminOpen(false)}
        >
          <div
            className="panel-scrollbar"
            style={{ width: '100%', maxWidth: '480px', maxHeight: '85vh', overflowY: 'auto', background: 'var(--card)', borderRadius: '20px', border: '1px solid var(--card-border)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {!authed ? (
              <form onSubmit={unlock} style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '38px', height: '38px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,86,0,0.08)', flexShrink: 0 }}>
                    <Lock size={18} color={ACCENT} />
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)' }}>Owner access</span>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Enter the owner password to review guest ratings.</span>
                  </div>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoFocus
                  style={{ fontSize: '14px', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--card-border)', outline: 'none', color: 'var(--ink)', background: 'var(--pill)' }}
                />
                {pwError && (
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#DC2626' }}>{pwError}</span>
                )}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="submit"
                    style={{ flex: 1, background: 'var(--ink)', color: 'var(--canvas)', borderRadius: '9999px', padding: '10px 20px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                  >
                    Unlock inbox
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdminOpen(false)}
                    style={{ background: 'var(--pill)', color: 'var(--body)', borderRadius: '9999px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, border: '1px solid var(--card-border)', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)' }}>Review inbox</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthed(false);
                      setAdminOpen(false);
                    }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--body)', background: 'var(--pill)', border: '1px solid var(--card-border)', borderRadius: '9999px', padding: '7px 14px', cursor: 'pointer' }}
                  >
                    <Lock size={13} />
                    <span>Lock</span>
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['pending', 'published'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setInboxTab(tab)}
                      style={{
                        flex: 1, padding: '8px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                        border: inboxTab === tab ? 'none' : '1px solid var(--card-border)',
                        background: inboxTab === tab ? ACCENT : 'transparent',
                        color: inboxTab === tab ? '#FFFFFF' : 'var(--body)',
                      }}
                    >
                      {tab === 'pending' ? `Pending (${pending.length})` : `Published (${published.length})`}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(inboxTab === 'pending' ? pending : published).length === 0 && (
                    <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, textAlign: 'center', padding: '12px 0' }}>
                      {inboxTab === 'pending' ? 'No guest reviews waiting.' : 'Nothing published yet.'}
                    </p>
                  )}
                  {(inboxTab === 'pending' ? pending : published).map((item, i) => (
                    <div
                      key={`${item.date}-${i}`}
                      style={{ border: '1px solid var(--card-border)', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', background: 'var(--pill)' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        <span style={{ display: 'inline-flex', gap: '2px' }} aria-label={`${item.stars} out of 5 stars`}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={13} color={s <= item.stars ? ACCENT : '#CBD5E1'} weight={s <= item.stars ? 'fill' : 'regular'} />
                          ))}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--faint)' }}>
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>{item.name}</div>
                      <div style={{ fontSize: '13px', color: 'var(--body)', lineHeight: 1.55 }}>{item.comment}</div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                        {inboxTab === 'pending' ? (
                          <>
                            <button
                              type="button"
                              onClick={() => saveLists(pending.filter((_, x) => x !== i), [...published, item])}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#FFFFFF', background: ACCENT, border: 'none', borderRadius: '9999px', padding: '7px 14px', cursor: 'pointer' }}
                            >
                              <Check size={13} />
                              <span>Publish</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => saveLists(pending.filter((_, x) => x !== i), published)}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--body)', background: 'transparent', border: '1px solid var(--card-border)', borderRadius: '9999px', padding: '7px 14px', cursor: 'pointer' }}
                            >
                              <Trash size={13} />
                              <span>Delete</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => saveLists([...pending, item], published.filter((_, x) => x !== i))}
                              style={{ fontSize: '12px', fontWeight: 600, color: 'var(--body)', background: 'transparent', border: '1px solid var(--card-border)', borderRadius: '9999px', padding: '7px 14px', cursor: 'pointer' }}
                            >
                              Unpublish
                            </button>
                            <button
                              type="button"
                              onClick={() => saveLists(pending, published.filter((_, x) => x !== i))}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--body)', background: 'transparent', border: '1px solid var(--card-border)', borderRadius: '9999px', padding: '7px 14px', cursor: 'pointer' }}
                            >
                              <Trash size={13} />
                              <span>Delete</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
