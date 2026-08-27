import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CLAUSES = [
  'By using Blockexa, you confirm that you have read, understood, and accepted the information, conditions, and terms published on our platform — all of which are publicly available for review at any time.',
  'By accepting this Agreement, you agree to be bound by these Terms & Conditions along with our other published policies, including our Privacy Policy, Payment Policy, Withdrawal Policy, and AML & KYC Policy. You accept this Agreement the moment you register an account and make a deposit, and — subject to Blockexa\u2019s approval — enter into a binding agreement with us from that point.',
  'These terms are considered accepted unconditionally once Blockexa receives your first deposit. From that moment, every action you take on the platform is governed by this Agreement and our other published policies.',
  'Every operation, transaction, order, or communication you make through your account is governed by, and must be carried out in accordance with, this Agreement and our other published terms.',
  'By accepting this Agreement, you confirm that you\u2019re able to receive information — including updates to these terms — by email or through the platform.',
  'A legal entity that wants to register with Blockexa may do so by emailing support@blockexa.ltd instead of registering directly on the platform. All terms in this Agreement apply to legal entities in the same way they apply to individual clients.',
];

const DEFINITIONS = [
  ['Account', 'A personal, verified profile registered in your name, containing a record of every deposit, plan, and withdrawal you make on Blockexa.'],
  ['Balance', 'The total value held in your account at any given time, including active plan value and available funds.'],
  ['Deposit', 'Funds you transfer into your Blockexa account in a supported cryptocurrency, used to fund an investment plan or an escrow agreement.'],
  ['Withdrawal', 'A request to move funds out of your Blockexa balance to an external wallet or payment method.'],
  ['Investment Plan', 'A fixed-rate arrangement under which Blockexa manages your deposited capital and settles returns to your balance on a daily basis.'],
  ['Daily Settlement', 'The process by which earnings from an active investment plan are calculated and credited to your account balance each day.'],
  ['Escrow Agreement', 'A contract under which Blockexa holds funds on behalf of a buyer and a seller until the agreed conditions of a transaction are met.'],
  ['Wallet Address', 'The blockchain address used to send or receive a supported cryptocurrency to or from your Blockexa account.'],
];

export default function TermsAndConditions() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tc-hero-reveal', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.from('.tc-block', {
        y: 18,
        opacity: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.tc-body', start: 'top 82%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* Hero — same structure as the other legal pages */}
      <section className="relative min-h-[46vh] flex items-center justify-center overflow-hidden bg-ink">
        {/*
          HERO BACKGROUND IMAGE — drop your image at:
            public/legal-hero.jpg
          Kept bright on purpose — just enough overlay for the centered text to read.
        */}
        <div className="absolute inset-0">
          <img
            src="/herobg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />
        </div>

        <div className="relative z-10 text-center px-6 pt-16">
          <h1 className="tc-hero-reveal font-display font-bold text-4xl sm:text-5xl text-ivory">
            Terms &amp; Conditions
          </h1>
          <p className="tc-hero-reveal mt-4 text-sm text-moss font-mono">Last updated: 12 August, 2025</p>
        </div>
      </section>

      {/* Body — full-width, flowing across columns instead of a narrow centered block */}
      <section className="tc-body relative py-20 bg-ink border-t border-line">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="tc-block max-w-3xl text-moss leading-relaxed mb-14">
            This Agreement governs the relationship between Blockexa and you,
            the client, whenever you use our platform. By registering an
            account and depositing funds, you accept the terms set out
            below, along with the other policies referenced throughout this
            page.
          </p>

          <h2 className="tc-block font-display font-bold text-2xl text-ivory mb-6">Agreement</h2>
          <div className="tc-block columns-1 md:columns-2 lg:columns-3 gap-10 [column-fill:balance]">
            {CLAUSES.map((c, i) => (
              <p key={i} className="text-moss leading-relaxed text-sm mb-6 break-inside-avoid">
                <span className="text-ivory font-mono text-xs mr-2">{i + 1}.</span>
                {c}
              </p>
            ))}
          </div>

          <h2 className="tc-block font-display font-bold text-2xl text-ivory mt-6 mb-6">Definitions</h2>
          <div className="tc-block columns-1 md:columns-2 lg:columns-3 gap-10 [column-fill:balance]">
            {DEFINITIONS.map(([term, def]) => (
              <p key={term} className="text-moss leading-relaxed text-sm mb-6 break-inside-avoid">
                <span className="text-ivory font-semibold">{term}</span> — {def}
              </p>
            ))}
          </div>

          <p className="tc-block text-sm text-moss leading-relaxed mt-6 border-t border-line pt-8 max-w-3xl">
            Questions about this Agreement? Reach us at{' '}
            <a href="mailto:support@blockexa.ltd" className="text-signal hover:text-signal-glow transition-colors">support@blockexa.ltd</a>.
          </p>
        </div>
      </section>
    </div>
  );
}