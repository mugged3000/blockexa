import { useState, useMemo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { PLANS } from './PlanCards';

gsap.registerPlugin(ScrollTrigger);

function formatUSD(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}

export default function RoiCalculator() {
  const [planId, setPlanId] = useState('growth');
  const [amountInput, setAmountInput] = useState('1000');
  const [daysInput, setDaysInput] = useState('30');
  const sectionRef = useRef(null);

  const plan = PLANS.find((p) => p.id === planId);
  const amount = Math.max(Number(amountInput) || 0, 0);
  const days = Math.max(Number(daysInput) || 0, 0);

  const { dailyReturn, totalReturn, finalBalance } = useMemo(() => {
    const rate = plan.dailyRate / 100;
    const daily = amount * rate;
    const total = amount * (Math.pow(1 + rate, days) - 1);
    return { dailyReturn: daily, totalReturn: total, finalBalance: amount + total };
  }, [amount, days, plan]);

  const belowMin = amount > 0 && amount < plan.minAmount;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.roi-reveal', { y: 30, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="roi-calculator" ref={sectionRef} className="relative py-28 bg-ink">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="roi-reveal mb-12 max-w-xl">
          <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">Blockexa ROI calculator</span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ivory">See what your capital could earn on Blockexa</h2>
          <p className="mt-3 text-moss">Enter a deposit and a timeframe to estimate what your crypto investment could return with Blockexa. Figures are illustrative, not a guarantee.</p>
        </div>

        <div className="roi-reveal grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 rounded-2xl border border-line bg-panel p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 mb-8">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlanId(p.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${planId === p.id ? 'bg-signal text-ink border-signal' : 'border-line text-moss hover:text-ivory hover:border-signal-dim'}`}
                >
                  {p.name} · {p.dailyRate}%/day
                </button>
              ))}
            </div>

            <label className="block mb-6">
              <span className="text-sm text-moss">Deposit amount</span>
              <div className="mt-2 flex items-center rounded-xl border border-line bg-ink/60 px-4 focus-within:border-signal-dim transition-colors">
                <span className="text-moss font-mono text-sm">$</span>
                <input
                  type="number"
                  min={0}
                  inputMode="decimal"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  placeholder="0"
                  className="w-full bg-transparent py-3.5 px-2 font-mono text-ivory text-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              {belowMin ? (
                <p className="mt-1.5 text-xs text-signal-glow font-mono">{plan.name} requires a minimum of {formatUSD(plan.minAmount)}</p>
              ) : (
                <p className="mt-1.5 text-xs text-moss font-mono">
                  {plan.maxAmount ? `Range for ${plan.name}: ${formatUSD(plan.minAmount)} – ${formatUSD(plan.maxAmount)}` : `${plan.name} minimum: ${formatUSD(plan.minAmount)}`}
                </p>
              )}
            </label>

            <label className="block">
              <span className="text-sm text-moss">Duration (days)</span>
              <div className="mt-2 flex items-center rounded-xl border border-line bg-ink/60 px-4 focus-within:border-signal-dim transition-colors">
                <input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={daysInput}
                  onChange={(e) => setDaysInput(e.target.value)}
                  placeholder="0"
                  className="w-full bg-transparent py-3.5 px-2 font-mono text-ivory text-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-moss font-mono text-sm">days</span>
              </div>
            </label>
          </div>

          <div className="lg:col-span-2 rounded-2xl border border-signal-dim/40 bg-panel-raised p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs text-moss uppercase tracking-widest font-mono">Daily return</span>
                <p className="mt-1 font-display text-2xl font-semibold text-ivory">{formatUSD(dailyReturn)}</p>
              </div>
              <div>
                <span className="text-xs text-moss uppercase tracking-widest font-mono">Total return ({days || 0}d)</span>
                <p className="mt-1 font-display text-2xl font-semibold text-signal">+{formatUSD(totalReturn)}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line">
              <span className="text-xs text-moss uppercase tracking-widest font-mono">Final balance</span>
              <p className="mt-1 font-display text-3xl font-bold text-ivory">{formatUSD(finalBalance)}</p>
              <Link to="#register" className="mt-6 block text-center rounded-full bg-signal text-ink font-semibold px-6 py-3 hover:bg-signal-glow transition-colors">
                Start on Blockexa
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}