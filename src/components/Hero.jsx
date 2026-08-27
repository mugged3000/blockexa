import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

export default function Hero() {
  const rootRef = useRef(null);
  const pathRef = useRef(null);
  const dotsRef = useRef([]);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(headlineRef.current, { y: 40, opacity: 0, duration: 0.9 })
        .from(subRef.current, { y: 24, opacity: 0, duration: 0.7 }, '-=0.5')
        .from(ctaRef.current, { y: 16, opacity: 0, duration: 0.6 }, '-=0.4');

      dotsRef.current.forEach((dot, i) => {
        gsap.to(dot, {
          motionPath: { path: pathRef.current, align: pathRef.current, alignOrigin: [0.5, 0.5], autoRotate: false },
          duration: 7,
          delay: i * 1.4,
          repeat: -1,
          ease: 'power1.inOut',
        });
        gsap.to(dot, { opacity: 0.15, duration: 1.4, delay: i * 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={rootRef} className="relative min-h-screen flex items-center overflow-hidden bg-ink">
      {/* HERO BACKGROUND IMAGE — drop your horse-shape artwork at public/hero-background.png */}
      <div className="absolute inset-0">
        <img
          src="/hero-bull.jpg"
          alt=""
          className="absolute right-[-4%] top-1/2 -translate-y-1/2 h-[125%] w-auto max-w-none opacity-95 select-none pointer-events-none"
          style={{ filter: 'drop-shadow(0 0 90px rgba(47,230,163,0.18))' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(47,230,163,0.08),transparent_60%)]" />
      </div>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        <path
          ref={pathRef}
          d="M -50 650 C 250 500, 450 750, 700 550 S 1100 300, 1500 350"
          fill="none"
          stroke="rgba(47,230,163,0.12)"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
        {[0, 1, 2].map((i) => (
          <circle key={i} ref={(el) => (dotsRef.current[i] = el)} r={i === 0 ? 4 : 2.5} fill="#7dffce" style={{ filter: 'drop-shadow(0 0 6px #2fe6a3)' }} />
        ))}
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-10 pt-16">
        <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-panel/70 px-4 py-1.5 text-xs font-medium text-signal font-mono mb-5 shadow-[0_0_20px_rgba(47,230,163,0.08)]">
  <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse shadow-[0_0_8px_#2fe6a3]" />
  Blockexa · audited & transparent
</span>

          <h1 ref={headlineRef} className="font-display font-bold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight text-ivory">
            Invest in crypto the <span className="text-signal">transparent</span> way with Blockexa.
          </h1>

          <p ref={subRef} className="mt-5 text-base sm:text-lg text-moss max-w-md leading-relaxed">
  Put your capital to work across digital assets with transparent trades, daily settlement, and flexible withdrawals.
</p>

                   <div ref={ctaRef} className="mt-10 flex flex-nowrap items-center gap-3 sm:gap-4">
            <a href="#register" className="flex-1 sm:flex-none text-center rounded-full bg-signal text-ink font-semibold px-4 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base hover:bg-signal-glow transition-colors">Start Investing</a>
            <a href="#roi-calculator" className="flex-1 sm:flex-none text-center rounded-full border border-line px-4 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base text-ivory/90 hover:border-signal-dim hover:text-ivory transition-colors">Calculate returns</a>
          </div>
        </div>
      </div>
    </section>
  );
}