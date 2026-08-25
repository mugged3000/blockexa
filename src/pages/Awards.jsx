import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RECOGNITIONS = [
  {
    year: '2026',
    title: 'Best Emerging Digital Asset Platform',
    body: 'FinTech Frontier Awards',
    desc: 'Recognized for daily-settlement transparency and public trade history.',
  },
  {
    year: '2025',
    title: 'Investor Trust Certification',
    body: 'Digital Asset Standards Council',
    desc: 'Independent review of withdrawal reliability and reporting accuracy.',
  },
  {
    year: '2025',
    title: 'Rising Platform of the Year — Shortlist',
    body: 'Global Crypto Awards',
    desc: 'Shortlisted among platforms under three years old by deposit growth.',
  },
];

export default function Awards() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.awards-reveal', {
        y: 26,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      gsap.utils.toArray('.recognition-card').forEach((card) => {
        gsap.from(card, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      {/*
        HERO — full-bleed background image, centered text overlay.
        Same pattern as the About page hero. Drop your image at
        public/award-hero.jpg (any filename is fine, just update the
        src below to match).
      */}
      <section className="relative overflow-hidden bg-ink min-h-[100dvh] flex flex-col">
        <div className="absolute inset-0">
          <img
            src="/award-detail.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.8) saturate(0.9)' }}
          />
          <div className="absolute inset-0 bg-ink/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink" />
        </div>

        <div className="awards-reveal relative z-10 max-w-xl px-6 lg:px-10 pt-32 pb-14">
          <p className="text-sm font-normal text-ivory/75 leading-relaxed">
            Blockexa — recognized by the same standards<br />
            we hold ourselves to.
          </p>

          <h1 className="mt-4 font-display font-bold text-4xl sm:text-5xl leading-[1.15] text-ivory">
            Recognition we didn't have to buy.
          </h1>

          <p className="mt-6 text-lg text-ivory/85 max-w-md leading-relaxed">
            A short record of what Blockexa has been recognized for.
          </p>

          <p className="mt-6 text-sm text-ivory/80">
            Looking for help?{' '}
            <a href="#contact" className="text-signal hover:text-signal-glow transition-colors font-medium">
              Get in touch with us
            </a>
          </p>
        </div>
      </section>

      {/*
        AWARD DETAIL — one image describing the award, with text below
        it. Drop your image at public/award-detail.jpg.
      */}
      <section className="relative py-24 bg-ink border-t border-line">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="awards-reveal rounded-2xl overflow-hidden border border-line">
            <img
              src="/award-hero.jpg"
              alt="Blockexa award"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="awards-reveal mt-8 text-center max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">
              About this award
            </span>
            <h2 className="mt-3 font-display font-bold text-2xl sm:text-3xl text-ivory">
              Best Emerging Digital Asset Platform, 2026
            </h2>
            <p className="mt-4 text-moss leading-relaxed">
              Awarded by the FinTech Frontier Awards for daily-settlement
              transparency and a publicly viewable trade history — judged
              against platforms of any size, not just early-stage entrants.
            </p>
          </div>
        </div>
      </section>

      {/* Recognitions — clean, professional grid */}
      <section className="relative py-24 bg-ink border-t border-line">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="awards-reveal mb-16 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">Recognitions</span>
            <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ivory">
              Where Blockexa has been recognized
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-line rounded-2xl overflow-hidden border border-line">
            {RECOGNITIONS.map((r) => (
              <div
                key={r.title}
                className="recognition-card group relative bg-ink px-7 py-8 hover:bg-panel transition-colors"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-signal scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

                <span className="font-mono text-4xl font-bold text-panel-raised group-hover:text-signal-dim transition-colors">
                  {r.year}
                </span>

                <h3 className="mt-5 font-display font-semibold text-lg text-ivory leading-snug">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm text-signal-dim">{r.body}</p>
                <p className="mt-3 text-sm text-moss leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}