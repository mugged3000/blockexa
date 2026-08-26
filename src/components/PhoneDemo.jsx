import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const CHART_PATH = 'M 4 78 C 30 70, 45 82, 66 60 S 100 20, 130 34 S 170 10, 196 16';

export default function PhoneDemo() {
  const wrapRef = useRef(null);
  const balanceRef = useRef(null);
  const plRef = useRef(null);
  const chartPathRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(wrapRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 82%' },
      });

      // Balance counts up
      const balCounter = { value: 0 };
      gsap.to(balCounter, {
        value: 24186.52,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 82%' },
        onUpdate: () => {
          if (balanceRef.current) {
            balanceRef.current.textContent = `$${balCounter.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        },
      });

      const plCounter = { value: 0 };
      gsap.to(plCounter, {
        value: 214.36,
        duration: 2,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 82%' },
        onUpdate: () => {
          if (plRef.current) {
            plRef.current.textContent = `+$${plCounter.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        },
      });

      // Chart line draws in
      const len = chartPathRef.current.getTotalLength();
      gsap.set(chartPathRef.current, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(chartPathRef.current, {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 82%' },
      });

      // Glow dot travels the chart line, looping
      gsap.to(dotRef.current, {
        motionPath: { path: chartPathRef.current, align: chartPathRef.current, alignOrigin: [0.5, 0.5] },
        duration: 3.2,
        delay: 1.8,
        repeat: -1,
        ease: 'power1.inOut',
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative mx-auto w-[280px] sm:w-[300px]">
      {/* Ambient glow behind the phone */}
      <div className="absolute inset-0 -m-8 bg-signal/10 blur-3xl rounded-full" />

      {/* Phone frame */}
      <div className="relative rounded-[2.75rem] border-[6px] border-[#0d0d0d] bg-[#0d0d0d] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-24 h-5 bg-[#0d0d0d] rounded-b-2xl z-10" />

        <div className="relative rounded-[2.25rem] overflow-hidden bg-panel aspect-[9/19]">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-4 text-[10px] font-mono text-ivory/70">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <span className="w-3 h-2 border border-ivory/50 rounded-[2px]" />
            </div>
          </div>

          {/* App header */}
          <div className="flex items-center gap-2 px-6 mt-5">
            <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">Blockexa</span>
          </div>

          {/* Balance */}
          <div className="px-6 mt-6">
            <p className="text-[11px] text-moss">Portfolio balance</p>
            <p ref={balanceRef} className="mt-1 font-display font-bold text-2xl text-ivory">$0.00</p>
            <p ref={plRef} className="mt-1 text-xs font-mono text-signal">+$0.00 today</p>
          </div>

          {/* Chart */}
          <div className="mt-5 px-4">
            <svg viewBox="0 0 200 90" className="w-full h-auto">
              <defs>
                <linearGradient id="phoneChartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2fe6a3" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#2fe6a3" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`${CHART_PATH} L 196 90 L 4 90 Z`} fill="url(#phoneChartFill)" stroke="none" />
              <path ref={chartPathRef} d={CHART_PATH} fill="none" stroke="#2fe6a3" strokeWidth="2" strokeLinecap="round" />
              <circle ref={dotRef} r="3.5" fill="#7dffce" style={{ filter: 'drop-shadow(0 0 5px #2fe6a3)' }} />
            </svg>
          </div>

          {/* Mini stat rows */}
          <div className="px-6 mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-panel-raised border border-line px-3.5 py-3">
              <span className="text-xs text-ivory/80">Active plan</span>
              <span className="text-xs font-mono text-signal-dim">Growth · 1.4%/day</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-panel-raised border border-line px-3.5 py-3">
              <span className="text-xs text-ivory/80">Next settlement</span>
              <span className="text-xs font-mono text-moss">Today, 00:00 UTC</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-panel to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}