import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    status: 'Requested',
    desc: 'You submit the request from your profile — choose a withdrawal method and enter the details it asks for.',
  },
  {
    status: 'In Process',
    desc: 'Our finance department picks it up. The amount is deducted from your balance the moment processing starts.',
  },
  {
    status: 'Processed',
    desc: 'Funds are sent to your payment system. From here, how fast it lands depends on that provider, not Blockexa.',
  },
];

const CONDITIONS = [
  {
    title: 'Processing time',
    desc: 'Requests are handled one at a time by our finance team, typically within 3 business days. If that changes, we\u2019ll reach out through whatever contact method you\u2019ve set on your profile.',
    icon: (
      <><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" fill="none" /><path d="M12 7.5V12L15 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></>
    ),
  },
  {
    title: 'Minimum amounts',
    desc: 'Some payment providers set their own minimum withdrawal amount, and technical limits can apply on our side too. Check the deposits and withdrawals page for specifics on your method.',
    icon: (
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    ),
  },
  {
    title: 'Same method as deposit',
    desc: 'Funds return to the same payment system you deposited with, wherever that\u2019s technically possible. If it isn\u2019t, we\u2019ll agree on an alternative that matches the details on your profile.',
    icon: (
      <path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4m14-2v2a4 4 0 0 1-4 4H3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
    stroke: true,
  },
  {
    title: 'Risk review',
    desc: 'Accounts flagged during an internal review for fraud, money laundering, or misuse of our terms may have withdrawals delayed, blocked, or asked for extra documents — without prior notice, if the situation calls for it.',
    icon: (
      <path d="M12 2 3.5 5.5v6.1c0 5.6 3.6 10.4 8.5 11.9 4.9-1.5 8.5-6.3 8.5-11.9V5.5L12 2Z" />
    ),
  },
  {
    title: 'Your details, your responsibility',
    desc: 'Whatever information you enter on a withdrawal request is on you to get right — double-check it before submitting.',
    icon: (
      <path d="M12 2a9 9 0 0 0-9 9v5a3 3 0 0 0 3 3h2v-8H5v-1a7 7 0 0 1 14 0v1h-3v8h2a3 3 0 0 0 3-3v-5a9 9 0 0 0-9-9Z" />
    ),
  },
  {
    title: 'Bank card limit',
    desc: 'If you deposited with a card, withdrawals to that card can\u2019t exceed what you put in on it over the last 90 days — and card withdrawals are processed ahead of other methods.',
    icon: (
      <path d="M4 18L9 12L13 15L20 6M20 6H14M20 6V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
    stroke: true,
  },
];

export default function WithdrawalPolicy() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.wp-hero-reveal', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.from('.wp-stage', {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.wp-stages', start: 'top 80%' },
      });

      gsap.from('.wp-condition', {
        y: 22,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.wp-conditions', start: 'top 80%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* Hero — same structure as the other legal pages */}
      <section className="relative min-h-[46vh] flex items-center justify-center overflow-hidden bg-ink">
        {/*
          HERO BACKGROUND IMAGE — drop your image at:
            public/legal-hero.jpg
          Kept bright on purpose — just enough overlay for the centered text to read.
        */}
        <div className="absolute inset-0">
          <img
            src="/herobg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />
        </div>

        <div className="relative z-10 text-center px-6 pt-16">
          <h1 className="wp-hero-reveal font-display font-bold text-4xl sm:text-5xl text-ivory">
            Withdrawal Policy
          </h1>
          <p className="wp-hero-reveal mt-4 text-sm text-moss font-mono">Last updated: 12 August, 2025</p>
        </div>
      </section>

      {/* Status flow — how a withdrawal actually moves */}
      <section className="relative py-24 bg-ink border-t border-line overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(47,230,163,0.06),transparent_55%)]" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
          <div className="max-w-xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">How it moves</span>
            <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ivory">Every withdrawal passes through three stages</h2>
            <p className="mt-3 text-moss">You can check which one your request is in from your account at any time.</p>
          </div>

          <div className="wp-stages relative grid sm:grid-cols-3 gap-10 sm:gap-6">
            <div className="hidden sm:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-transparent via-line to-transparent" />

            {STAGES.map((s, i) => (
              <div key={s.status} className="wp-stage relative">
                <div className="relative z-10 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0">
                  <div className="shrink-0 w-12 h-12 rounded-full border border-signal-dim/50 bg-panel flex items-center justify-center font-mono text-sm text-signal">
                    {i + 1}
                  </div>
                  <div className="sm:mt-5">
                    <span className="inline-block text-[11px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-signal-dim/40 text-signal-dim">
                      {s.status}
                    </span>
                  </div>
                </div>
                <p className="mt-3 sm:mt-4 text-sm text-moss leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions — clean icon list, distinct from the accordion / TOC layouts elsewhere */}
      <section className="relative py-24 bg-ink border-t border-line">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="max-w-xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">Terms that apply</span>
            <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ivory">What to know before you request one</h2>
          </div>

          <div className="wp-conditions grid sm:grid-cols-2 gap-x-12 gap-y-12">
            {CONDITIONS.map((c) => (
              <div key={c.title} className="wp-condition flex gap-5">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-panel border border-signal-dim/40 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="20" height="20" className="text-signal" fill={c.stroke ? 'none' : 'currentColor'}>
                    {c.icon}
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base text-ivory">{c.title}</h3>
                  <p className="mt-2 text-sm text-moss leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-16 text-sm text-moss leading-relaxed border-t border-line pt-8">
            Questions about a specific withdrawal? Reach our support desk at{' '}
            <a href="mailto:support@blockexa.com" className="text-signal hover:text-signal-glow transition-colors">support@blockexa.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
}