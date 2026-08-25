import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PLANS = [
  { id: 'starter', name: 'Starter', dailyRate: 0.8, minAmount: 100, maxAmount: 999, perks: ['Daily settlement', 'Email support', 'Withdraw anytime'], coin: 'bitcoin-btc-logo', coinBg: '#F7931A' },
  { id: 'growth', name: 'Growth', dailyRate: 1.4, minAmount: 1000, maxAmount: 4999, perks: ['Daily settlement', 'Priority support', 'Withdraw anytime'], coin: 'ethereum-eth-logo', coinBg: '#3C3C3D' },
  { id: 'elite', name: 'Elite', dailyRate: 1.9, minAmount: 5000, maxAmount: 19999, perks: ['Daily settlement', 'Dedicated manager', 'Withdraw anytime'], coin: 'solana-sol-logo', coinBg: '#131313' },
  { id: 'vip', name: 'VIP', dailyRate: 2.6, minAmount: 20000, maxAmount: null, perks: ['Daily settlement', 'Direct desk line', 'Custom limits'], coin: 'tether-usdt-logo', coinBg: '#26A17B' },
];

const KITE_CLIP = 'polygon(28px 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%, 0 28px)';

function PlanCard({ plan, index, featured }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const fromLeft = index % 2 === 0;
      gsap.fromTo(
        cardRef.current,
        { x: fromLeft ? -180 : 180, opacity: 0, scale: 0.92 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 88%', toggleActions: 'play none none reverse' },
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef} className="relative">
      {/* Crypto coin badge sitting on the card's cut corner */}
      <div
        className="absolute -top-4 -right-4 z-20 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_8px_24px_-6px_rgba(0,0,0,0.6)] ring-2 ring-ink"
        style={{ backgroundColor: plan.coinBg }}
      >
        <img
          src={`https://cryptologos.cc/logos/${plan.coin}.png`}
          alt=""
          className="w-6 h-6 object-contain"
          loading="lazy"
        />
      </div>

      <div className="p-[1.5px] plan-shine" style={{ clipPath: KITE_CLIP }}>
        <div className={`h-full px-8 py-10 sm:px-10 sm:py-12 flex flex-col ${featured ? 'bg-panel-raised' : 'bg-panel'}`} style={{ clipPath: KITE_CLIP }}>
          {featured && (
            <span className="self-start mb-4 text-[10px] font-mono uppercase tracking-widest text-ink bg-signal rounded-full px-2.5 py-1">
              Most popular on Blockexa
            </span>
          )}

          <h3 className="font-display font-bold text-2xl text-ivory">{plan.name}</h3>

          <div className="mt-4 flex items-baseline gap-1">
            <span className="font-display font-bold text-4xl text-signal">{plan.dailyRate}%</span>
            <span className="text-sm text-moss">/ day</span>
          </div>

          <p className="mt-2 text-xs font-mono text-moss">
            {plan.maxAmount ? `$${plan.minAmount.toLocaleString()} – $${plan.maxAmount.toLocaleString()}` : `$${plan.minAmount.toLocaleString()}+`}
          </p>

          <ul className="mt-8 space-y-3 flex-1">
            {plan.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2.5 text-sm text-ivory/85">
                <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                {perk}
              </li>
            ))}
          </ul>

          <a href="#roi-calculator" className={`mt-10 text-center rounded-full px-6 py-3.5 text-sm font-semibold transition-colors ${featured ? 'bg-signal text-ink hover:bg-signal-glow' : 'border border-line text-ivory hover:border-signal-dim'}`}>
            Choose {plan.name} with Blockexa
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PlanCards() {
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="plans" className="relative py-28 bg-ink">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div ref={headingRef} className="mb-14 max-w-xl">
          <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">Blockexa investment plans</span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ivory">Choose the plan that fits your capital</h2>
          <p className="mt-3 text-moss">Every Blockexa plan settles daily and withdraws on demand — the only thing that changes is your rate and deposit range.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} featured={plan.id === 'growth'} />
          ))}
        </div>
      </div>
    </section>
  );
}