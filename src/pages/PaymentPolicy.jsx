import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    title: 'Financial Responsibility',
    summary: 'What Blockexa is responsible for, and when that responsibility starts and ends.',
    body: (
      <>
        <p>
          Blockexa is financially responsible for your account balance at
          every moment — from the first record of your deposit through to
          the full withdrawal of your funds. You can request any amount
          available in your account at the time of your request.
        </p>
        <p className="mt-4">
          Only the deposit and withdrawal methods listed on the official
          Blockexa website are supported. If a payment method is provided by
          one of our partners rather than by Blockexa directly, you take on
          the risk associated with using it — if something goes wrong with
          that payment system itself, that's between you and the payment
          provider, and we'd ask you to notify us as well so we can help
          where we can.
        </p>
        <p className="mt-4">
          Our responsibility for your funds begins the moment they arrive in
          a Blockexa-controlled account and that deposit is reflected on
          your balance, and ends the moment funds leave a Blockexa-controlled
          account as a withdrawal. If fraud is detected during or after a
          transaction, we reserve the right to reverse it and freeze the
          account involved while we investigate. The same applies if a
          technical error affects how a transaction was processed.
        </p>
      </>
    ),
  },
  {
    title: 'Account Verification',
    summary: 'The two steps every account goes through before it\u2019s fully active.',
    body: (
      <>
        <p>Opening a Blockexa account has two steps:</p>
        <ul className="mt-3 space-y-2">
          <li className="flex gap-2.5"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-signal shrink-0" />Registering with your real identity and contact details, and agreeing to our terms.</li>
          <li className="flex gap-2.5"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-signal shrink-0" />Verifying your identity with a valid passport or government ID.</li>
        </ul>
        <p className="mt-4">
          We may ask for additional documents where needed — a recent bill,
          bank confirmation, or a card scan, for example — to complete
          verification. This process is typically finished within 10
          business days of our request, though it can take up to 30 business
          days in more complex cases.
        </p>
      </>
    ),
  },
  {
    title: 'Making a Deposit',
    summary: 'How deposits are submitted and what affects how long they take.',
    body: (
      <>
        <p>
          To deposit, submit a request from your account, choose a payment
          method from the list provided, and fill in the required details.
        </p>
        <p className="mt-4">
          How long that takes depends entirely on the method you choose —
          it's not something Blockexa controls directly. Electronic payment
          methods can confirm in seconds or take a few days; a direct bank
          wire can take up to 45 business days depending on your bank and
          country.
        </p>
      </>
    ),
  },
  {
    title: 'Taxes',
    summary: 'Blockexa\u2019s position on tax reporting and third-party disclosure.',
    body: (
      <p>
        Blockexa is not a tax agent. We don't share your financial
        information with third parties for tax purposes, and won't disclose
        it unless we're formally required to by a government authority.
        Reporting and paying any taxes owed on your activity is your
        responsibility.
      </p>
    ),
  },
  {
    title: 'Card & One-Click Payments',
    summary: 'What you\u2019re agreeing to the moment you click "Pay".',
    body: (
      <>
        <p>
          When you use a saved card or one-click payment, you're agreeing to
          pay the full amount shown for anything you order on Blockexa,
          along with any applicable taxes or fees. Once you click "Pay", the
          transaction is treated as final and processed immediately — it
          can't be cancelled or reversed from your side afterward.
        </p>
        <p className="mt-4">
          By placing an order, you confirm you're not violating any law
          applicable to you, that you're old enough in your jurisdiction to
          use Blockexa's services, and that you're authorized to use the
          card or payment method provided. You take on legal responsibility
          for how you use the service in your jurisdiction.
        </p>
        <p className="mt-4">
          Our payment processing partners execute payments for the amount
          shown on Blockexa — they aren't responsible for pricing decisions,
          declined authorizations from your card issuer, or the quality of
          anything purchased. If you no longer want to use saved-card or
          one-click payments, you can turn this off from your account at any
          time. If you disagree with any part of this policy, we'd ask that
          you don't proceed with payment and instead contact our support
          team directly.
        </p>
      </>
    ),
  },
];

function AccordionItem({ index, item, isOpen, onToggle }) {
  return (
    <div className="pp-item border border-line rounded-2xl overflow-hidden bg-panel hover:border-signal-dim/50 transition-colors">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-5 px-6 sm:px-7 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className={`font-mono text-sm shrink-0 transition-colors ${isOpen ? 'text-signal' : 'text-signal-dim'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="flex-1">
          <span className="block font-display font-semibold text-lg text-ivory">{item.title}</span>
          <span className="block mt-1 text-sm text-moss">{item.summary}</span>
        </span>

        <span
          className={`w-8 h-8 rounded-full border border-line flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen ? 'border-signal-dim bg-panel-raised rotate-45' : ''
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="text-ivory/80" />
          </svg>
        </span>
      </button>

      <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="px-6 sm:px-7 pb-7 pl-[3.6rem] sm:pl-[3.9rem] -mt-1 text-moss leading-relaxed text-sm">
            {item.body}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPolicy() {
  const rootRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pp-hero-reveal', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.from('.pp-item', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.pp-accordion', start: 'top 82%' },
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
          <h1 className="pp-hero-reveal font-display font-bold text-4xl sm:text-5xl text-ivory">
            Payment Policy
          </h1>
          <p className="pp-hero-reveal mt-4 text-sm text-moss font-mono">Last updated: 12 August, 2025</p>
        </div>
      </section>

      {/* Body — accordion, deliberately different from the Privacy Policy layout */}
      <section className="relative py-20 bg-ink border-t border-line">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="text-moss leading-relaxed mb-12">
            This policy covers how deposits, withdrawals, verification, and
            payments work on Blockexa — what we're responsible for, what
            depends on your chosen payment method, and what you agree to
            each time you pay. Tap a section to expand it.
          </p>

          <div className="pp-accordion space-y-4">
            {SECTIONS.map((item, i) => (
              <AccordionItem
                key={item.title}
                index={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex((v) => (v === i ? -1 : i))}
              />
            ))}
          </div>

          <p className="mt-12 text-sm text-moss leading-relaxed">
            Questions about a specific payment or withdrawal? Reach our
            support desk at{' '}
            <a href="mailto:support@blockexa.com" className="text-signal hover:text-signal-glow transition-colors">support@blockexa.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
}