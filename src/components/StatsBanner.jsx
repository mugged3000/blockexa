import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: 'Active Members', value: 3051, prefix: '', suffix: '' },
  { label: 'Total Returns', value: 4085589, prefix: '$', suffix: '+' },
  { label: 'Total Transactions', value: 202943, prefix: '', suffix: '' },
  { label: 'Total Withdrawals', value: 2805983, prefix: '$', suffix: '' },
];

export default function StatsBanner() {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-reveal', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      STATS.forEach((stat, i) => {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: stat.value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          onUpdate: () => {
            if (numberRefs.current[i]) {
              numberRefs.current[i].textContent =
                stat.prefix + Math.floor(counter.value).toLocaleString('en-US') + stat.suffix;
            }
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background photo stays bright — just a light wash, not a heavy tint */}
      <div className="absolute inset-0">
        <img
          src="/bannerexa.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/35" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        {/* Mobile: 2x2 grid, everything visible at once, nothing to scroll
            past. sm+: single horizontal row, as before. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-8">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="stat-reveal text-center">
              <p
                className="text-xs sm:text-sm text-ivory/90 leading-tight"
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
              >
                {stat.label}
              </p>
              <p
                ref={(el) => (numberRefs.current[i] = el)}
                className="mt-1.5 sm:mt-2 font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-signal"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}
              >
                {stat.prefix}0{stat.suffix}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}