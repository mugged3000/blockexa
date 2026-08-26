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
      { label: 'Privacy Policy', href: '#privacy-policy' },
      { label: 'Payment Policy', href: '#payment-policy' },
      { label: 'Withdrawal Policy', href: '#withdrawal-policy' },
      { label: 'Anti-Money Laundering (AML)', href: '#aml' },
      { label: 'Know Your Customer (KYC)', href: '#kyc' },
      { label: 'Terms and Conditions', href: '#terms' },
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
          {/*
            LOGO IMAGE — drop your logo file at public/logo.jpg
            h-9 keeps it inside the 80px nav bar with breathing room;
            width is automatic so it won't distort.
          */}
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
          <a href="#contact" className="text-sm text-ivory/80 hover:text-ivory transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <a href="#register" className="inline-block rounded-full bg-signal text-ink text-sm font-semibold px-5 py-2.5 hover:bg-signal-glow transition-colors">
            Register
          </a>

          <a
            href="#login"
            aria-label="Log in"
            className="hidden sm:flex w-10 h-10 rounded-full border border-line items-center justify-center text-ivory/85 hover:text-ivory hover:border-signal-dim transition-colors shrink-0"
          >
            <LoginIcon />
          </a>

          {/* Hamburger — mobile & tablet only */}
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

    {/* Mobile drawer — deliberately outside <header> and given a very
        high z-index of its own, so it can never end up stacked behind
        header or any page content regardless of what z-index those use. */}
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
            <a href="#contact" onClick={() => setMobileOpen(false)} className="block py-4 text-ivory/90 font-medium">Contact</a>
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
            <a
              href="#register"
              onClick={() => setMobileOpen(false)}
              className="text-center rounded-full bg-signal text-ink text-sm font-semibold px-5 py-3 hover:bg-signal-glow transition-colors"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </>
  );
}