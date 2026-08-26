import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARAGRAPHS = [
  'For the purposes of this policy, money laundering generally means engaging in acts designed to conceal or disguise the true origin of criminally derived proceeds, so that unlawful funds appear to come from legitimate sources.',
  'Money laundering usually happens in three stages. At the "placement" stage, cash from criminal activity enters the financial system — converted into monetary instruments or deposited into accounts. At the "layering" stage, those funds are moved between accounts and institutions to further distance them from their origin. At the "integration" stage, the funds are reintroduced into the economy to purchase legitimate assets or fund further activity. Terrorist financing works similarly, though the funds involved may not come from criminal proceeds at all — the goal is instead to conceal the origin or intended use of the money.',
  'Every Blockexa employee whose role involves dealing with clients, directly or indirectly, is expected to know the laws and regulations relevant to their responsibilities, and to carry out their duties in a way that complies with them at all times.',
  'Our program is informed by recognized international standards, including the Basel Committee\u2019s guidance on customer due diligence and account opening, the FATF Recommendations on money laundering, the USA PATRIOT Act, and applicable anti-money-laundering legislation in the jurisdictions we operate in.',
  'To carry this out, Blockexa\u2019s management maintains an ongoing compliance program designed to coordinate our regulatory obligations across the business, helping us manage our exposure to money laundering and terrorist financing across every unit and function.',
  'Every Blockexa affiliate is required to comply with this AML and KYC policy.',
  'Identification documents and service records are retained for the minimum period required by applicable local law.',
  'New employees complete anti-money-laundering training as part of onboarding, and all staff complete refresher AML and KYC training annually. Employees with day-to-day AML and KYC responsibilities take part in additional, targeted training.',
];

export default function AmlKyc() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.aml-hero-reveal', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.from('.aml-para', {
        y: 18,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.aml-body', start: 'top 80%' },
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
            src="/legal-hero.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />
        </div>

        <div className="relative z-10 text-center px-6 pt-16">
          <h1 className="aml-hero-reveal font-display font-bold text-4xl sm:text-5xl text-ivory">
            Anti-Money Laundering (AML) &amp; Know Your Customer (KYC) Policy
          </h1>
          <p className="aml-hero-reveal mt-4 text-sm text-moss font-mono">Last updated: 12 August, 2025</p>
        </div>
      </section>

      {/* Body — plain, centered, no cards or sidebars, just the text */}
      <section className="aml-body relative py-20 bg-ink border-t border-line">
        <div className="mx-auto max-w-2xl px-6 text-center space-y-8">
          {PARAGRAPHS.map((p, i) => (
            <p key={i} className="aml-para text-moss leading-relaxed">
              {p}
            </p>
          ))}

          <p className="aml-para text-sm text-moss leading-relaxed pt-4">
            Questions about this policy? Reach us at{' '}
            <a href="mailto:compliance@blockexa.com" className="text-signal hover:text-signal-glow transition-colors">compliance@blockexa.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
}