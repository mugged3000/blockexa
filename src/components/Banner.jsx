import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Banner() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.banner-reveal', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 sm:py-40 bg-ink overflow-hidden">
      {/*
        BANNER BACKGROUND IMAGE — drop your image at public/banner.jpg
        (jpg/png/webp all fine, just keep the filename "banner.jpg" or update the path below)
      */}
      <div className="absolute inset-0">
        <img
          src="/bannerexa.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-10 text-center">
        <span className="banner-reveal inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-3 py-1 text-xs text-moss font-mono mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
          Blockexa
        </span>

        <h2 className="banner-reveal font-display font-bold text-3xl sm:text-5xl leading-[1.1] text-ivory">
          Your capital deserves a platform that shows its work.
        </h2>

        <p className="banner-reveal mt-6 text-lg text-moss max-w-xl mx-auto leading-relaxed">
          Join the investors already growing their portfolio on Blockexa — daily settlement, open trade history, withdrawals on your terms.
        </p>

        <div className="banner-reveal mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#register" className="rounded-full bg-signal text-ink font-semibold px-7 py-3.5 hover:bg-signal-glow transition-colors">Create your account</a>
          <a href="#plans" className="rounded-full border border-line px-7 py-3.5 text-ivory/90 hover:border-signal-dim hover:text-ivory transition-colors">View plans</a>
        </div>
      </div>
    </section>
  );
}
