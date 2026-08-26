import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const NODES = [
  { id: 'signal', title: 'Signal Engine', desc: 'Scans 300+ market metrics' },
  { id: 'risk', title: 'Risk Shield', desc: 'Live portfolio heat map' },
  { id: 'execution', title: 'Execution Layer', desc: '9 exchange routes' },
  { id: 'sentiment', title: 'Sentiment Pulse', desc: 'Market mood & flow' },
];

const VB_W = 1000;
const VB_H = 640;
const NODE_Y = [80, 240, 400, 560];
const SPINE_X = 430;
const CONSENSUS_X = 620;
const CONSENSUS_Y = 320;
const OPERATION_X = 900;

export default function ConsensusDiagram() {
  const sectionRef = useRef(null);
  const feedPathsRef = useRef([]);
  const outPathRef = useRef(null);
  const feedDotsRef = useRef([]);
  const outDotRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.diagram-reveal', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });

      feedDotsRef.current.forEach((dot, i) => {
        gsap.to(dot, {
          motionPath: { path: feedPathsRef.current[i], align: feedPathsRef.current[i], alignOrigin: [0.5, 0.5] },
          duration: 2.6,
          delay: i * 0.5,
          repeat: -1,
          repeatDelay: 1.2,
          ease: 'power1.inOut',
        });
      });

      gsap.to(outDotRef.current, {
        motionPath: { path: outPathRef.current, align: outPathRef.current, alignOrigin: [0.5, 0.5] },
        duration: 1.6,
        delay: 2.6,
        repeat: -1,
        repeatDelay: 2.2,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 bg-ink overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="diagram-reveal mb-16 max-w-xl">
          <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">How Blockexa trades</span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ivory">Four checks confirm every move before we trade</h2>
          <p className="mt-3 text-moss">Blockexa never acts on a single input. Every position is cross-checked against market signal, risk exposure, execution routing, and sentiment data before capital moves.</p>
        </div>

        <div className="relative grid lg:grid-cols-[minmax(0,340px)_1fr] gap-8 items-center">
          <div className="diagram-reveal flex flex-col gap-6 relative z-10">
            {NODES.map((n) => (
              <div key={n.id} className="rounded-xl border border-line bg-panel px-5 py-4 hover:border-signal-dim/60 transition-colors">
                <h3 className="font-display font-semibold text-ivory text-sm">{n.title}</h3>
                <p className="text-xs text-moss mt-1">{n.desc}</p>
              </div>
            ))}
          </div>

          <div className="diagram-reveal relative h-[460px] sm:h-[520px] lg:h-[560px]">
            <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" aria-hidden="true">
              {NODE_Y.map((y, i) => (
                <path
                  key={i}
                  ref={(el) => (feedPathsRef.current[i] = el)}
                  d={`M 0 ${y} L ${SPINE_X} ${y} L ${SPINE_X} ${CONSENSUS_Y} L ${CONSENSUS_X - 60} ${CONSENSUS_Y}`}
                  fill="none"
                  stroke="rgba(47,230,163,0.18)"
                  strokeWidth="1.5"
                />
              ))}
              <path
                ref={outPathRef}
                d={`M ${CONSENSUS_X + 60} ${CONSENSUS_Y} L ${OPERATION_X} ${CONSENSUS_Y}`}
                fill="none"
                stroke="rgba(47,230,163,0.18)"
                strokeWidth="1.5"
              />

              {NODE_Y.map((y, i) => (
                <circle key={i} cx={SPINE_X} cy={y} r="3" fill="#1c8f68" />
              ))}

              {NODE_Y.map((_, i) => (
                <circle key={i} ref={(el) => (feedDotsRef.current[i] = el)} r="4" fill="#7dffce" style={{ filter: 'drop-shadow(0 0 6px #2fe6a3)' }} />
              ))}
              <circle ref={outDotRef} r="4" fill="#7dffce" style={{ filter: 'drop-shadow(0 0 6px #2fe6a3)' }} />

              <circle cx={CONSENSUS_X} cy={CONSENSUS_Y} r="88" fill="rgba(15,40,32,0.9)" stroke="#2fe6a3" strokeWidth="2" />
              <text x={CONSENSUS_X} y={CONSENSUS_Y - 8} textAnchor="middle" fill="#eaf5ef" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="22">CONSENSUS</text>
              <text x={CONSENSUS_X} y={CONSENSUS_Y + 20} textAnchor="middle" fill="#9fb8ab" fontFamily="JetBrains Mono, monospace" fontSize="17">4/4 AGREE</text>

              <rect x={OPERATION_X - 10} y={CONSENSUS_Y - 38} width="110" height="76" rx="12" fill="rgba(15,40,32,0.9)" stroke="#1c8f68" strokeWidth="2" />
              <text x={OPERATION_X + 45} y={CONSENSUS_Y - 6} textAnchor="middle" fill="#2fe6a3" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="18">TRADE</text>
              <text x={OPERATION_X + 45} y={CONSENSUS_Y + 20} textAnchor="middle" fill="#9fb8ab" fontFamily="JetBrains Mono, monospace" fontSize="14">EXECUTED</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}