import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PhoneDemo from '../components/PhoneDemo';
import { Link } from 'react-router-dom';
import PlanCards from '../components/PlanCards';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    title: 'Register an account',
    desc: 'Create your Blockexa account in under two minutes — just an email and a password to get started. No paperwork up front.',
  },
  {
    num: '02',
    title: 'Fund your account',
    desc: 'Deposit BTC, ETH, USDT or another supported asset. Your balance updates as soon as the transfer confirms on-chain.',
  },
  {
    num: '03',
    title: 'Start a plan',
    desc: 'Pick the plan that matches your capital and risk appetite. Daily settlement begins the same day you activate it.',
  },
];

const TRUST = [
  { label: 'Platform fee on deposits', value: '$0' },
  { label: 'Assets under management', value: '$4.08M+' },
  { label: 'Average withdrawal time', value: '< 24h' },
  { label: 'Active investors', value: '3,051+' },
  { label: 'Human support', value: '24/7' },
  { label: 'Settlement uptime', value: '99.9%' },
];

export default function CryptoInvestment() {
  const rootRef = useRef(null);
  const trustTrackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ci-hero-reveal', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      });

      // Trust strip — continuous seamless slide, not static.
      // The track renders the list twice back-to-back and slides exactly
      // half its own width, looping smoothly forever.
      if (trustTrackRef.current) {
        const loopWidth = trustTrackRef.current.scrollWidth / 2;
        gsap.to(trustTrackRef.current, {
          x: -loopWidth,
          duration: 24,
          ease: 'none',
          repeat: -1,
        });
      }

      gsap.from('.step-reveal', {
        x: -30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.steps-list', start: 'top 75%' },
      });

      gsap.from('.ci-cta-reveal', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ci-cta', start: 'top 80%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* Hero — full-bleed background image */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-ink">
        {/*
          HERO BACKGROUND IMAGE — drop your image at:
            public/crypto-investment-hero.jpg
          Full-bleed, object-cover — a wide/landscape image works best.
        */}
        <div className="absolute inset-0">
          <img
            src="/exadollar.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-10 pt-20">
          <div className="max-w-2xl">
            <span className="ci-hero-reveal inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-3 py-1 text-xs text-moss font-mono mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
              Investor · Crypto Investment
            </span>

            <h1 className="ci-hero-reveal font-display font-bold text-4xl sm:text-5xl lg:text-[3.3rem] leading-[1.08] tracking-tight text-ivory">
              Put your capital into crypto, <span className="text-signal">without guessing</span>.
            </h1>

            <p className="ci-hero-reveal mt-6 text-lg text-moss max-w-lg leading-relaxed">
              Blockexa manages digital-asset positions on your behalf and settles returns to your balance every day — so investing in crypto feels less like speculation and more like a plan.
            </p>

                     <div className="mt-10 flex flex-nowrap items-center gap-3 sm:gap-4">
            <Link to="#register"  className="flex-1 sm:flex-none text-center rounded-full bg-signal text-ink font-semibold px-4 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base hover:bg-signal-glow transition-colors">Start Investing</Link>
            <Link to="/#roi-calculator" className="flex-1 sm:flex-none text-center rounded-full border border-line px-4 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base text-ivory/90 hover:border-signal-dim hover:text-ivory transition-colors">Calculate returns</Link>
          </div>
          </div>
        </div>
      </section>

      {/* Trust strip — smooth infinite slide, never sits still */}
      <section className="ci-trust-strip relative py-8 bg-panel border-y border-line overflow-hidden">
        <div className="relative">
          <div ref={trustTrackRef} className="flex items-center gap-16 w-max will-change-transform">
            {[...TRUST, ...TRUST].map((t, i) => (
              <div key={i} className="flex items-center gap-3 shrink-0">
                <span className="font-display font-bold text-xl sm:text-2xl text-signal">{t.value}</span>
                <span className="text-xs sm:text-sm text-moss whitespace-nowrap">{t.label}</span>
              </div>
            ))}
          </div>

          {/* Fade the edges so the slide doesn't cut off harshly */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-panel to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-panel to-transparent" />
        </div>
      </section>

      {/* Three steps + phone demo */}
      <section className="relative py-28 bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_30%,rgba(47,230,163,0.06),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <div className="mb-16 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">How it works</span>
            <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ivory">Three steps between you and your first return</h2>
            <p className="mt-3 text-moss">No paperwork marathon, no waiting weeks for approval — most investors are funded and active on a plan the same day.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Steps — timeline style, not cards */}
            <div className="steps-list relative">
              <div className="absolute left-7 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-line to-transparent" />
              {STEPS.map((s) => (
                <div key={s.num} className="step-reveal relative flex gap-6 pb-14 last:pb-0">
                  <div className="relative z-10 shrink-0 w-14 h-14 rounded-full border border-signal-dim/50 bg-ink flex items-center justify-center font-display font-bold text-signal text-lg">
                    {s.num}
                  </div>
                  <div className="pt-3">
                    <h3 className="font-display font-semibold text-xl text-ivory">{s.title}</h3>
                    <p className="mt-2.5 text-sm text-moss leading-relaxed max-w-md">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Phone demo — sticky on desktop */}
            <div className="lg:sticky lg:top-28">
              <PhoneDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <PlanCards />

      {/* Closing CTA */}
      <section className="ci-cta relative py-24 bg-panel border-t border-line overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(47,230,163,0.07),transparent_60%)]" />
        <div className="relative mx-auto max-w-2xl px-6 lg:px-10 text-center">
          <h2 className="ci-cta-reveal font-display font-bold text-3xl sm:text-4xl text-ivory">Your capital, working from day one.</h2>
          <p className="ci-cta-reveal mt-4 text-moss leading-relaxed">
            Register in minutes, fund with the asset you already hold, and pick a plan built around how much you're ready to invest.
          </p>
          <div className="ci-cta-reveal mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="#register" className="rounded-full bg-signal text-ink font-semibold px-7 py-3.5 hover:bg-signal-glow transition-colors">Create your account</Link>
            <Link to="/#plans"  className="rounded-full border border-line px-7 py-3.5 text-ivory/90 hover:border-signal-dim hover:text-ivory transition-colors">View plans</Link>
          </div>
        </div>
      </section>
    </div>
  );
}