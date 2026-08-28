import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DROPDOWNS = {
  company: {
    label: 'Our Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Awards', href: '/awards' },
    ],
  },
  investor: {
    label: 'Investor',
    items: [
     { label: 'Crypto Investment', href: '/crypto-investment' },
      { label: 'Escrow Service', href: '/escrow' },
    ],
  },
  legitimacy: {
    label: 'Legitimacy',
    items: [
     { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Payment Policy', href: '/payment-policy' },
      { label: 'Withdrawal Policy', href: '/withdrawal-policy' },
     { label: 'AML & KYC Policy', href: '/aml-kyc' },
     { label: 'Terms and Conditions', href: '/terms' },
      { label: 'White Paper', href: '#white-paper' },
    ],
  },
};

function LoginIcon({ className = 'w-4.5 h-4.5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 20c1.4-3.7 4.6-5.6 7.5-5.6s6.1 1.9 7.5 5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const LANGUAGES = [
  { code: 'EN', label: 'English', country: 'gb' },
  { code: 'ES', label: 'Español', country: 'es' },
  { code: 'PT', label: 'Português', country: 'pt' },
  { code: 'IT', label: 'Italiano', country: 'it' },
  { code: 'FR', label: 'Français', country: 'fr' },
  { code: 'DE', label: 'Deutsch', country: 'de' },
  { code: 'NL', label: 'Nederlands', country: 'nl' },
  { code: 'PL', label: 'Polski', country: 'pl' },
  { code: 'SV', label: 'Svenska', country: 'se' },
  { code: 'UK', label: 'Українська', country: 'ua' },
  { code: 'RU', label: 'Русский', country: 'ru' },
  { code: 'TR', label: 'Türkçe', country: 'tr' },
  { code: 'AR', label: 'العربية', country: 'sa' },
  { code: 'HI', label: 'हिन्दी', country: 'in' },
  { code: 'TA', label: 'தமிழ்', country: 'in' },
  { code: 'BN', label: 'বাংলা', country: 'bd' },
  { code: 'ID', label: 'Bahasa Indonesia', country: 'id' },
  { code: 'VI', label: 'Tiếng Việt', country: 'vn' },
  { code: 'TH', label: 'ไทย', country: 'th' },
  { code: 'FIL', label: 'Filipino', country: 'ph' },
  { code: 'ZH', label: '中文', country: 'cn' },
  { code: 'JA', label: '日本語', country: 'jp' },
  { code: 'KO', label: '한국어', country: 'kr' },
  { code: 'SW', label: 'Kiswahili', country: 'ke' },
];

function FlagIcon({ country, className = 'w-6 h-6' }) {
  return (
    <span className={`${className} shrink-0 rounded-full overflow-hidden ring-1 ring-white/15 shadow-[0_1px_3px_rgba(0,0,0,0.4)]`}>
      <img
        src={`https://flagcdn.com/w40/${country}.png`}
        alt=""
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </span>
  );
}

function LanguageSwitcher({ language, setLanguage, align = 'down', full = false }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div ref={rootRef} className={`relative ${full ? 'w-full' : 'shrink-0'}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`group flex items-center gap-2 rounded-full border border-line bg-gradient-to-b from-panel/90 to-panel-raised/70 pl-1.5 pr-3 py-1.5 text-sm text-ivory/90 shadow-[0_1px_0_rgba(255,255,255,0.03)_inset] transition-all duration-200 hover:border-signal/40 hover:shadow-[0_0_18px_-4px_rgba(47,230,163,0.35)] ${
          open ? 'border-signal/50 shadow-[0_0_18px_-4px_rgba(47,230,163,0.35)]' : ''
        } ${full ? 'w-full justify-center py-3' : ''}`}
      >
        <FlagIcon country={language.country} className="w-6 h-6" />
        <span className="text-xs font-mono font-semibold tracking-wide">{language.code}</span>
        <svg width="9" height="6" viewBox="0 0 10 6" fill="none" className={`text-moss group-hover:text-signal-dim transition-all duration-200 ${open ? 'rotate-180 text-signal-dim' : ''}`}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className={`absolute right-0 ${align === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'} z-50 transition-all duration-200 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : `opacity-0 ${align === 'up' ? 'translate-y-1' : '-translate-y-1'} pointer-events-none`
        }`}
      >
        <ul
          role="listbox"
          className="max-h-80 overflow-y-auto w-64 rounded-2xl border border-line bg-panel/98 backdrop-blur-md p-1.5 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] divide-y divide-line/60"
        >
          {LANGUAGES.map((l) => {
            const isSelected = l.code === language.code;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => { setLanguage(l); setOpen(false); }}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    isSelected ? 'bg-signal/15 text-ivory font-medium' : 'text-moss hover:text-ivory hover:bg-panel-raised'
                  }`}
                >
                  <FlagIcon country={l.country} className="w-6 h-6" />
                  <span className="flex-1 flex items-center gap-2 text-left">
                    <span className="text-[11px] font-mono text-moss shrink-0">{l.code}</span>
                    <span className="whitespace-nowrap">{l.label}</span>
                  </span>
                  {isSelected && (
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="shrink-0 text-signal">
                      <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function NavDropdown({ id, label, items, open, onOpen, onClose }) {
  return (
    <div className="relative" onMouseEnter={() => onOpen(id)} onMouseLeave={onClose}>
      <button className="flex items-center gap-1.5 text-sm text-ivory/80 hover:text-ivory transition-colors py-2" aria-expanded={open}>
        {label}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-200 ${
        open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
      }`}>
        <ul className="min-w-[220px] rounded-xl border border-line bg-panel/95 backdrop-blur-md p-1.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]">
          {items.map((item) => {
            const className = 'block rounded-lg px-3 py-2 text-sm text-moss hover:text-ivory hover:bg-panel-raised transition-colors whitespace-nowrap';
            return (
              <li key={item.label}>
                {item.href.startsWith('/') ? (
                  <Link to={item.href} className={className}>{item.label}</Link>
                ) : (
                  <a href={item.href} className={className}>{item.label}</a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function MobileAccordion({ label, items, open, onToggle, onNavigate }) {
  return (
    <div className="border-b border-line">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left text-ivory/90 font-medium"
        aria-expanded={open}
      >
        {label}
        <svg width="12" height="7" viewBox="0 0 10 6" fill="none" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <div className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <ul className="overflow-hidden pl-2">
          {items.map((item) => {
            const className = 'block py-2.5 text-sm text-moss hover:text-ivory transition-colors';
            return (
              <li key={item.label}>
                {item.href.startsWith('/') ? (
                  <Link to={item.href} className={className} onClick={onNavigate}>{item.label}</Link>
                ) : (
                  <a href={item.href} className={className} onClick={onNavigate}>{item.label}</a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function Nav() {
  const [openId, setOpenId] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleOpen = (id) => { clearTimeout(closeTimer.current); setOpenId(id); };
  const handleClose = () => { closeTimer.current = setTimeout(() => setOpenId(null), 120); };

  return (
    <>
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      scrolled || mobileOpen ? 'bg-ink/85 backdrop-blur-md border-b border-line' : 'bg-transparent border-b border-transparent'
    }`}>
      <nav className="relative z-50 mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <img
            src="/logoexaa.jpg"
            alt="Blockexa"
            className="h-15 w-auto select-none"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-sm text-ivory/80 hover:text-ivory transition-colors">Home</Link>
          {Object.entries(DROPDOWNS).map(([id, d]) => (
            <NavDropdown key={id} id={id} label={d.label} items={d.items} open={openId === id} onOpen={handleOpen} onClose={handleClose} />
          ))}
          <Link to="/contact" className="text-sm text-ivory/80 hover:text-ivory transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher language={language} setLanguage={setLanguage} />

          <a
            href="#login"
            aria-label="Log in"
            className="hidden sm:flex w-10 h-10 rounded-full border border-line items-center justify-center text-ivory/85 hover:text-ivory hover:border-signal-dim transition-colors shrink-0"
          >
            <LoginIcon />
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="lg:hidden w-10 h-10 rounded-full border border-line flex items-center justify-center shrink-0"
          >
            <span className="relative w-4 h-3.5 block">
              <span className={`absolute left-0 top-0 w-4 h-[1.6px] bg-ivory transition-all duration-300 ${mobileOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
              <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[1.6px] bg-ivory transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 bottom-0 w-4 h-[1.6px] bg-ivory transition-all duration-300 ${mobileOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </nav>
    </header>

    <div
      className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${
        mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        onClick={() => setMobileOpen(false)}
      />

      <div
        className={`absolute top-0 right-0 h-full w-[86%] max-w-sm bg-panel border-l border-line px-6 pt-24 pb-8 overflow-y-auto transition-transform duration-300 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="border-b border-line">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block py-4 text-ivory/90 font-medium">Home</Link>
          </div>

          {Object.entries(DROPDOWNS).map(([id, d]) => (
            <MobileAccordion
              key={id}
              label={d.label}
              items={d.items}
              open={mobileAccordion === id}
              onToggle={() => setMobileAccordion((v) => (v === id ? null : id))}
              onNavigate={() => setMobileOpen(false)}
            />
          ))}

          <div className="border-b border-line">
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="block py-4 text-ivory/90 font-medium">Contact</Link>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href="#login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-ivory/90 hover:border-signal-dim transition-colors"
            >
              <LoginIcon className="w-4 h-4" />
              Log in
            </a>
            <LanguageSwitcher language={language} setLanguage={setLanguage} align="up" full />
          </div>
        </div>
      </div>
    </>
  );
}