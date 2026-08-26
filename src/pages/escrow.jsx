import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    title: 'Create the agreement',
    desc: 'Both parties agree on terms — amount, asset, and the exact conditions for release — inside a shared escrow contract.',
  },
  {
    num: '02',
    title: 'Buyer deposits funds',
    desc: 'The buyer sends crypto into the Blockexa escrow wallet, where it\u2019s held and can\u2019t move until conditions are met.',
  },
  {
    num: '03',
    title: 'Seller delivers',
    desc: 'The seller completes their side of the deal — goods, service, or transfer — and marks the order fulfilled.',
  },
  {
    num: '04',
    title: 'Funds release',
    desc: 'Once the buyer confirms, funds release automatically. If there\u2019s a dispute, our resolution team steps in.',
  },
];

const ADVANTAGES = [
  {
    num: '01',
    title: 'A neutral third party you can verify',
    desc: 'Blockexa never takes a side. Funds sit in a shared wallet neither the buyer nor the seller controls alone, and every movement is visible on the contract — not promised, shown.',
    icon: (
      <path d="M12 2 3.5 5.5v6.1c0 5.6 3.6 10.4 8.5 11.9 4.9-1.5 8.5-6.3 8.5-11.9V5.5L12 2Zm0 2.2 6.5 2.4v5c0 4.5-2.8 8.5-6.5 9.7-3.7-1.2-6.5-5.2-6.5-9.7v-5L12 4.2Zm-1.1 10.6 4.9-4.9-1.3-1.3-3.6 3.6-1.6-1.6-1.3 1.3 2.9 2.9Z" />
    ),
  },
  {
    num: '02',
    title: 'Protection that runs both directions',
    desc: 'A buyer can\u2019t vanish after receiving goods, and a seller can\u2019t vanish after receiving payment. Funds only move once both sides of the agreement are actually met.',
    icon: (
      <path d="M12 1 2 6v6c0 5.5 3.8 10.7 10 12 6.2-1.3 10-6.5 10-12V6l-10-5Zm-1 15.4-4.2-4.2 1.4-1.4L11 13.6l4.8-4.8 1.4 1.4L11 16.4Z" />
    ),
  },
  {
    num: '03',
    title: 'A process that doesn\u2019t slow you down',
    desc: 'Setting up an agreement takes minutes, deposits confirm on-chain, and release is instant once conditions are met — no manual back-and-forth to push a deal through.',
    icon: (
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    ),
  },
  {
    num: '04',
    title: 'Somewhere to go if it goes wrong',
    desc: 'If the two sides can\u2019t agree, it doesn\u2019t just stall. A resolution team reviews the evidence and makes a call — logged on the contract, not left to guesswork.',
    icon: (
      <path d="M12 2a9 9 0 0 0-9 9v5a3 3 0 0 0 3 3h2v-8H5v-1a7 7 0 0 1 14 0v1h-3v8h2a3 3 0 0 0 3-3v-5a9 9 0 0 0-9-9Z" />
    ),
  },
];

// Interactive explainer replacing the old trust marquee — shows the
// actual mechanics of an escrow deal instead of listing stats.
const FLOW_STAGES = [
  {
    id: 'created',
    label: 'Agreement created',
    desc: 'Buyer and seller define the terms — amount, asset, and release conditions — inside a shared contract.',
  },
  {
    id: 'funded',
    label: 'Funds locked',
    desc: 'The buyer deposits into the escrow vault. From this point, neither side can move the funds alone.',
  },
  {
    id: 'delivered',
    label: 'Seller delivers',
    desc: 'The seller completes their side of the deal and marks the order fulfilled on the contract.',
  },
  {
    id: 'released',
    label: 'Funds released',
    desc: 'The buyer confirms delivery and the vault releases funds to the seller automatically.',
  },
];

function BuyerIcon() {
  return <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4 0-8 2-8 5v2h16v-2c0-3-4-5-8-5Z" />;
}
function VaultIcon() {
  return (
    <path d="M12 2 3.5 5.5v6.1c0 5.6 3.6 10.4 8.5 11.9 4.9-1.5 8.5-6.3 8.5-11.9V5.5L12 2Zm0 2.2 6.5 2.4v5c0 4.5-2.8 8.5-6.5 9.7-3.7-1.2-6.5-5.2-6.5-9.7v-5L12 4.2Z" />
  );
}
function SellerIcon() {
  return <path d="M9 4a2 2 0 0 0-2 2v1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3V6a2 2 0 0 0-2-2H9Zm0 2h6v1H9V6Zm-5 5h16v2H4v-2Z" />;
}

function EscrowFlow() {
  const [active, setActive] = useState(0);
  const fillLeftRef = useRef(null);
  const fillRightRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((v) => (v + 1) % FLOW_STAGES.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (fillLeftRef.current) {
      gsap.to(fillLeftRef.current, {
        scaleX: active >= 1 ? 1 : 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
    if (fillRightRef.current) {
      gsap.to(fillRightRef.current, {
        scaleX: active >= 3 ? 1 : 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }, [active]);

  const buyerActive = active <= 1;
  const vaultActive = active === 1 || active === 2;
  const sellerActive = active >= 2;

  return (
    <div className="rounded-3xl border border-line bg-panel/60 p-8 sm:p-12">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <div className="flex flex-col items-center gap-3 w-20">
          <div
            className={`w-16 h-16 rounded-full border flex items-center justify-center transition-colors duration-300 ${
              buyerActive ? 'border-signal bg-signal/10' : 'border-line bg-ink'
            }`}
          >
            <svg viewBox="0 0 24 24" className={`w-7 h-7 transition-colors duration-300 ${buyerActive ? 'fill-signal' : 'fill-moss'}`}>
              <BuyerIcon />
            </svg>
          </div>
          <span className="text-xs text-moss font-mono uppercase tracking-wider">Buyer</span>
        </div>

        <div className="flex-1 h-px bg-line relative overflow-hidden mx-2 sm:mx-4">
          <div ref={fillLeftRef} className="absolute inset-0 bg-signal origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>

        <div className="flex flex-col items-center gap-3 w-20">
          <div
            className={`w-16 h-16 rounded-full border flex items-center justify-center transition-colors duration-300 ${
              vaultActive ? 'border-signal bg-signal/10' : 'border-line bg-ink'
            }`}
          >
            <svg viewBox="0 0 24 24" className={`w-7 h-7 transition-colors duration-300 ${vaultActive ? 'fill-signal' : 'fill-moss'}`}>
              <VaultIcon />
            </svg>
          </div>
          <span className="text-xs text-moss font-mono uppercase tracking-wider">Vault</span>
        </div>

        <div className="flex-1 h-px bg-line relative overflow-hidden mx-2 sm:mx-4">
          <div ref={fillRightRef} className="absolute inset-0 bg-signal origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>

        <div className="flex flex-col items-center gap-3 w-20">
          <div
            className={`w-16 h-16 rounded-full border flex items-center justify-center transition-colors duration-300 ${
              sellerActive ? 'border-signal bg-signal/10' : 'border-line bg-ink'
            }`}
          >
            <svg viewBox="0 0 24 24" className={`w-7 h-7 transition-colors duration-300 ${sellerActive ? 'fill-signal' : 'fill-moss'}`}>
              <SellerIcon />
            </svg>
          </div>
          <span className="text-xs text-moss font-mono uppercase tracking-wider">Seller</span>
        </div>
      </div>

      <div className="mt-12 max-w-lg mx-auto text-center">
        <h3 className="font-display font-semibold text-xl text-ivory">{FLOW_STAGES[active].label}</h3>
        <p className="mt-2 text-sm text-moss leading-relaxed">{FLOW_STAGES[active].desc}</p>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {FLOW_STAGES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            aria-label={s.label}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? 'w-8 bg-signal' : 'w-4 bg-line hover:bg-moss'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function EscrowService() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.es-hero-reveal', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      });

      gsap.from('.es-flow-reveal', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.es-flow-section', start: 'top 78%' },
      });

      gsap.from('.step-reveal', {
        x: -30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.es-steps-list', start: 'top 75%' },
      });

      document.querySelectorAll('.es-advantage-row').forEach((row, i) => {
        gsap.from(row, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 82%' },
        });
      });

      gsap.from('.es-cta-reveal', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.es-cta', start: 'top 80%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* Hero — simplified, minimal text */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <img
            src="/escrobg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-10 pt-20">
  <div className="max-w-xl">
    <span className="es-hero-reveal inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-3 py-1 text-xs text-moss font-mono">
      <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
      Escrow Service
    </span>

    <h1 className="es-hero-reveal font-display font-bold text-4xl sm:text-5xl leading-[1.1] tracking-tight text-ivory mt-6">
      Secure, <span className="text-signal">trustless</span> escrow.
    </h1>

    <p className="es-hero-reveal text-base text-moss max-w-sm leading-relaxed mt-3">
      Blockexa holds the funds until both sides deliver.
    </p>

    <div className="es-hero-reveal flex flex-col gap-4 mt-10">
      <a
        href="#es-how"
        className="group inline-flex items-center gap-2 w-fit text-sm font-semibold text-ivory border-b border-signal/60 pb-1 hover:border-signal transition-colors"
      >
        See how escrow works
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current transition-transform group-hover:translate-x-0.5">
          <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      <p className="text-xs text-moss font-mono uppercase tracking-wider">
        Contract-enforced · Non-custodial · Dispute resolution included
      </p>
    </div>
  </div>
</div>
      </section>

      {/* Escrow flow — functional interactive explainer */}
      <section className="es-flow-section relative py-24 bg-panel border-y border-line overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="es-flow-reveal mb-12 text-center max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">See it in motion</span>
            <h2 className="mt-3 font-display font-bold text-2xl sm:text-3xl text-ivory">Where the money sits, at every stage</h2>
          </div>
          <div className="es-flow-reveal">
            <EscrowFlow />
          </div>
        </div>
      </section>

      {/* Four steps */}
      <section id="es-how" className="relative py-28 bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_30%,rgba(47,230,163,0.06),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <div className="mb-16 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">How escrow works</span>
            <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ivory">Four steps from agreement to release</h2>
            <p className="mt-3 text-moss">Every deal moves through the same contract, so both sides always know exactly what stage it's at.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="es-steps-list relative">
              <div className="absolute left-7 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-line to-transparent" />
              {STEPS.map((s) => (
                <div key={s.num} className="step-reveal relative flex gap-6 pb-14 last:pb-0">
                  <div className="relative z-10 shrink-0 w-14 h-14 rounded-full border border-signal-dim/50 bg-ink flex items-center justify-center font-display font-bold text-signal text-lg">
                    {s.num}
                  </div>
                  <div className="pt-3">
                    <h3 className="font-display font-semibold text-xl text-ivory">{s.title}</h3>
                    <p className="mt-2.5 text-sm text-moss leading-relaxed max-w-md">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:sticky lg:top-28">
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="relative py-28 bg-ink border-t border-line overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="mb-20 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">Why it works</span>
            <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ivory">What escrow actually buys you</h2>
            <p className="mt-3 text-moss">Four reasons a deal through Blockexa holds up better than a handshake.</p>
          </div>

          <div>
            {ADVANTAGES.map((a, i) => (
              <div key={a.num}>
                <div
                  className={`es-advantage-row flex flex-col sm:flex-row gap-8 sm:gap-12 py-12 items-start ${
                    i % 2 === 1 ? 'sm:flex-row-reverse text-left sm:text-right' : ''
                  }`}
                >
                  <div className={`flex items-center gap-4 shrink-0 ${i % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}>
                    <span className="font-mono text-xs text-signal-dim">{a.num}</span>
                    <div className="w-14 h-14 rounded-full border border-signal-dim/40 bg-panel flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-signal">
                        {a.icon}
                      </svg>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display font-bold text-2xl text-ivory">{a.title}</h3>
                    <p className={`mt-3 text-moss leading-relaxed max-w-xl ${i % 2 === 1 ? 'sm:ml-auto' : ''}`}>{a.desc}</p>
                  </div>
                </div>
                {i < ADVANTAGES.length - 1 && <div className="h-px bg-line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}