import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MARKETS = [
  { id: 'BINANCE:BTCUSDT', label: 'BTC / USDT' },
  { id: 'BINANCE:ETHUSDT', label: 'ETH / USDT' },
  { id: 'BINANCE:SOLUSDT', label: 'SOL / USDT' },
];

function TradingViewWidget({ symbol }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = '100%';
    widgetDiv.style.width = '100%';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: '15',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      backgroundColor: 'rgba(10, 28, 22, 1)',
      gridColor: 'rgba(23, 54, 43, 0.55)',
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      allow_symbol_change: false,
      support_host: 'https://www.tradingview.com',
    });

    container.appendChild(widgetDiv);
    container.appendChild(script);
  }, [symbol]);

  return (
    <div className="tradingview-widget-container h-full w-full" ref={containerRef} />
  );
}

export default function LiveChart() {
  const sectionRef = useRef(null);
  const [symbol, setSymbol] = useState(MARKETS[0].id);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.livechart-reveal', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-ink">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="livechart-reveal mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">Live on Blockexa</span>
            <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ivory">Watch the market Blockexa trades on</h2>
            <p className="mt-3 text-moss">Real-time pricing, straight from the exchange — the same feed our execution layer reads before every position.</p>
          </div>

          <div className="flex gap-2">
            {MARKETS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSymbol(m.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                  symbol === m.id ? 'bg-signal text-ink border-signal' : 'border-line text-moss hover:text-ivory hover:border-signal-dim'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="livechart-reveal rounded-2xl border border-line bg-panel overflow-hidden">
          <div className="h-[560px] sm:h-[600px]">
            <TradingViewWidget symbol={symbol} />
          </div>
        </div>
      </div>
    </section>
  );
}
