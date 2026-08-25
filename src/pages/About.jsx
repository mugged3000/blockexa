import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Typewriter from '../components/Typewriter';
import StatsBanner from '../components/StatsBanner';

gsap.registerPlugin(ScrollTrigger);

const WHAT_WE_DO = [
  {
    title: 'Manage capital across markets',
    desc: 'Positions are opened and closed across major exchanges, with every trade logged and visible to you.',
    icon: 'chart',
  },
  {
    title: 'Settle earnings daily',
    desc: 'Returns post to your balance every day you\u2019re invested — no waiting for a maturity date to see results.',
    icon: 'clock',
  },
  {
    title: 'Keep withdrawals open',
    desc: 'Your capital isn\u2019t locked away. Request a withdrawal whenever you need one, on any plan.',
    icon: 'unlock',
  },
];

const WWD_ICONS = {
  chart: <path d="M4 18L9 12L13 15L20 6M20 6H14M20 6V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  clock: <><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" fill="none" /><path d="M12 7.5V12L15 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></>,
  unlock: <><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" /><path d="M8 11V8a4 4 0 0 1 7.5-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" /></>,
};

export default function About() {
  const sectionsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        y: 26,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionsRef.current, start: 'top 75%' },
      });
    }, sectionsRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionsRef}>
      {/*
        HERO — full-bleed background image, centered text overlay.
        Drop your image at public/about-hero.jpg (any name/extension is
        fine, just update the src below to match). object-cover +
        object-center means it will always fill the section and stay
        centered, on mobile and desktop alike.
      */}
      <section className="relative overflow-hidden bg-ink min-h-[100dvh] flex flex-col">
        <div className="absolute inset-0">
          <img
            src="/about-hero1.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.8) saturate(0.9)' }}
          />
          {/* Slightly stronger wash than before — tones the image down to
              a moderate presence instead of it dominating the section */}
          <div className="absolute inset-0 bg-ink/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink" />
        </div>

        {/* No mx-auto — this hugs the left edge instead of sitting as a
            centered column. min-h-[100dvh] on the section above means the
            hero fills the screen on load (no peek of the next section
            until the user actually scrolls), while this inner block still
            sits up near the top via pt-32 rather than being centered. */}
        <div className="about-reveal relative z-10 max-w-xl px-6 lg:px-10 pt-32 pb-14">
       

          {/*
            Fixed height (in rem, not em) sized for the longest phrase at
            two lines on a narrow phone screen. This is what stops the
            image/next-section from jumping as the typewriter types — the
            box no longer grows or shrinks with the text inside it.
          */}
          <h1 className="mt-4 font-display font-bold text-4xl sm:text-5xl leading-[1.15] text-ivory text-center min-h-[5.2rem] sm:min-h-[3.6rem] flex items-center justify-center">
            <Typewriter
              phrases={[
                'Crypto investing you can verify.',
                'Daily returns. Full transparency.',
                'Built on trust, backed by results.',
              ]}
            />
          </h1>

          <p className="mt-6 text-lg text-ivory/85 max-w-md leading-relaxed">
            Your crypto, working daily <br /> with the numbers to prove it.
          </p>

          <p className="mt-6 text-sm text-ivory/80">
            Looking for help?{' '}
            <a href="#contact" className="text-signal hover:text-signal-glow transition-colors font-medium">
              Get in touch with us
            </a>
          </p>
        </div>
      </section>

      {/* About the company */}
      <section className="relative py-24 bg-ink border-t border-line">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <div className="about-reveal order-2 lg:order-1">
            <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">About the company</span>
            <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ivory">
              A small team, run like an exchange desk
            </h2>
            <p className="mt-5 text-moss leading-relaxed">
              Blockexa started as a trading desk for a handful of private
              investors before opening up to the public. The team behind it
              comes from exchange operations and quantitative trading — the
              same discipline just applied at a scale anyone can join.
            </p>
            <p className="mt-4 text-moss leading-relaxed">
              We don't promise returns we can't show working. Every plan on
              this site reflects the same models we trade with our own
              capital, published daily so you can check the numbers
              yourself.
            </p>
          </div>

          <div className="about-reveal order-1 lg:order-2 rounded-2xl overflow-hidden border border-line">
            <img
              src="/officeexxa.jpg"
              alt="The Blockexa team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="relative py-24 bg-ink border-t border-line overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_50%,rgba(47,230,163,0.06),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <div className="about-reveal max-w-xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">What we do</span>
            <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ivory">
              Three things Blockexa handles for every investor
            </h2>
          </div>

          <div className="relative grid md:grid-cols-3 gap-x-8 gap-y-14">
            <div className="hidden md:block absolute top-8 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-transparent via-line to-transparent" />

            {WHAT_WE_DO.map((item, i) => (
              <div key={item.title} className="about-reveal relative">
                <div className="relative z-10 w-16 h-16 rounded-2xl border border-signal-dim/50 bg-panel flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="26" height="26" className="text-signal">
                    {WWD_ICONS[item.icon]}
                  </svg>
                  <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-panel-raised border border-line flex items-center justify-center text-[11px] font-mono text-signal-dim">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display font-semibold text-lg text-ivory">{item.title}</h3>
                <p className="mt-2.5 text-sm text-moss leading-relaxed max-w-[26rem]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsBanner />
    </div>
  );
}