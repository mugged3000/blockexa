import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const KITE_CLIP = 'polygon(32px 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%, 0 32px)';

const REASONS = [
  {
    title: 'Custody you can verify',
    tag: 'Security',
    desc: 'Your deposit sits in multi-signature cold storage, not a single hot wallet someone could walk off with. Every transfer needs multiple approvals before it moves.',
    points: ['Multi-sig cold storage for reserves', 'Insured hot-wallet operating balance', 'Independent penetration testing'],
    icon: (
      <path d="M12 2 3.5 5.5v6.1c0 5.6 3.6 10.4 8.5 11.9 4.9-1.5 8.5-6.3 8.5-11.9V5.5L12 2Zm0 2.2 6.5 2.4v5c0 4.5-2.8 8.5-6.5 9.7-3.7-1.2-6.5-5.2-6.5-9.7v-5L12 4.2Zm-1.1 10.6 4.9-4.9-1.3-1.3-3.6 3.6-1.6-1.6-1.3 1.3 2.9 2.9Z" />
    ),
  },
  {
    title: 'Nothing happens off the record',
    tag: 'Transparency',
    desc: 'Every position Blockexa opens, adjusts, or closes is logged and visible from your dashboard — so your daily return is always traceable to a real trade, not a promise.',
    points: ['Full trade history per account', 'Published audit reports on request', 'No hidden fees or spread markups'],
    icon: (
      <path d="M3 3v16a2 2 0 0 0 2 2h16v-2H5V3H3Zm4 12h2V9H7v6Zm4 0h2V5h-2v10Zm4 0h2v-8h-2v8Z" />
    ),
  },
  {
    title: 'Your money moves when you do',
    tag: 'Access',
    desc: 'No lockups, no waiting on a support queue. Request a withdrawal and a real desk — not a bot — clears it, usually the same day, in the asset you deposited.',
    points: ['Withdrawals processed same-day', '24/7 human support desk', 'No penalty for early payout'],
    icon: (
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    ),
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-reveal', {
        y: 48,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why-us" ref={sectionRef} className="relative py-28 bg-ink">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="why-reveal mb-14 max-w-xl">
          <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">Why Blockexa</span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ivory">Built for people who check their balance often</h2>
          <p className="mt-3 text-moss">We designed Blockexa around the things investors actually worry about — custody, visibility, and getting their money back out.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {REASONS.map((r) => (
            <div key={r.title} className="why-reveal group relative">
              <div className="p-[1.5px] plan-shine transition-transform duration-500 ease-out group-hover:-translate-y-2" style={{ clipPath: KITE_CLIP }}>
                <div className="h-full bg-panel px-7 py-9 sm:px-8 sm:py-10 flex flex-col transition-colors duration-300 group-hover:bg-panel-raised" style={{ clipPath: KITE_CLIP }}>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-signal-dim">{r.tag}</span>

                  <div className="mt-4 w-14 h-14 rounded-xl bg-panel-raised border border-signal-dim/40 flex items-center justify-center transition-all duration-300 group-hover:border-signal group-hover:shadow-[0_0_24px_-4px_rgba(47,230,163,0.45)]">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-signal">
                      {r.icon}
                    </svg>
                  </div>

                  <h3 className="mt-6 font-display font-bold text-xl text-ivory">{r.title}</h3>
                  <p className="mt-3 text-sm text-moss leading-relaxed">{r.desc}</p>

                  <ul className="mt-6 space-y-2.5 pt-6 border-t border-line">
                    {r.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-ivory/80">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
