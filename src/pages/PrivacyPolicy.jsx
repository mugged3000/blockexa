import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use-it', label: 'How We Use Your Information' },
  { id: 'marketing-preferences', label: 'Marketing Preferences' },
  { id: 'sharing', label: 'How We Share Your Information' },
  { id: 'retention', label: 'Data Retention' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'security', label: 'Data Security' },
  { id: 'children', label: 'Children\u2019s Privacy' },
  { id: 'other-sites', label: 'Links to Other Websites' },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact Us' },
];

export default function PrivacyPolicy() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pp-hero-reveal', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.from('.pp-section', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.pp-body', start: 'top 80%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* Hero */}
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
          <h1 className="pp-hero-reveal font-display font-bold text-4xl sm:text-5xl text-ivory">
            Privacy Policy
          </h1>
          <p className="pp-hero-reveal mt-4 text-sm text-moss font-mono">Last updated: 12 August, 2025</p>
        </div>
      </section>

      {/* Body */}
      <section className="pp-body relative py-20 bg-ink border-t border-line">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-[240px_1fr] gap-16">
          {/* On this page */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-mono uppercase tracking-widest text-signal-dim mb-4">On this page</p>
              <ul className="space-y-2.5 border-l border-line pl-4">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-sm text-moss hover:text-ivory transition-colors">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content */}
          <div className="max-w-3xl space-y-16">
            <div className="pp-section">
              <p className="text-moss leading-relaxed">
                Welcome to Blockexa. We're committed to protecting your privacy and
                to being clear about what information we collect, why we
                collect it, and what you can do about it. This Privacy Policy
                explains our practices whenever you use the Blockexa platform,
                whether that's our website, mobile app, or any related service.
              </p>
              <p className="mt-4 text-moss leading-relaxed">
                Terms written with a capital letter that aren't defined here
                carry the same meaning given to them in our Terms and
                Conditions. This policy applies to clients and prospective
                clients of Blockexa — if you're a Blockexa employee, contractor,
                or vendor, a separate agreement governs how your information
                is handled.
              </p>
            </div>

            <div id="introduction" className="pp-section scroll-mt-28">
              <h2 className="font-display font-bold text-2xl text-ivory">Introduction</h2>
              <p className="mt-4 text-moss leading-relaxed">
                Investing in crypto through Blockexa means trusting us with
                real information about you — your identity, your funds, and
                how you use the platform. We take that seriously. This policy
                sets out what we collect, how we use it, who we share it
                with, and the rights you have over it at every stage.
              </p>
            </div>

            <div id="information-we-collect" className="pp-section scroll-mt-28">
              <h2 className="font-display font-bold text-2xl text-ivory">Information We Collect</h2>

              <h3 className="mt-6 font-display font-semibold text-lg text-ivory">Account information</h3>
              <p className="mt-2 text-moss leading-relaxed">
                When you register with Blockexa, we collect basic details
                like your name, email address, and other information needed
                to open and manage your account.
              </p>

              <h3 className="mt-6 font-display font-semibold text-lg text-ivory">Transaction information</h3>
              <p className="mt-2 text-moss leading-relaxed">
                To process deposits, plan activity, and withdrawals, we
                record transaction details such as wallet addresses and
                amounts moved in and out of your account.
              </p>

              <h3 className="mt-6 font-display font-semibold text-lg text-ivory">Verification information</h3>
              <p className="mt-2 text-moss leading-relaxed">
                Where required by law, we may ask for additional documents to
                confirm your identity, such as a government-issued ID, before
                you can deposit or withdraw.
              </p>

              <h3 className="mt-6 font-display font-semibold text-lg text-ivory">Cookies</h3>
              <p className="mt-2 text-moss leading-relaxed">
                Like most websites, Blockexa uses cookies — small files
                stored on your device — to keep you signed in, remember your
                preferences, and understand how the site is used. Cookies set
                by Blockexa don't include your name or contact details; they're
                used anonymously to see which pages are useful and to keep
                the platform running smoothly. You can disable cookies in
                your browser settings, though some parts of the site may not
                work as well without them.
              </p>
            </div>

            <div id="how-we-use-it" className="pp-section scroll-mt-28">
              <h2 className="font-display font-bold text-2xl text-ivory">How We Use Your Information</h2>
              <ul className="mt-4 space-y-4">
                {[
                  ['Account management', 'To create and manage your account, confirm your identity, and provide support when you need it.'],
                  ['Transaction processing', 'To process deposits, settlements, and withdrawals, and to keep your funds secure.'],
                  ['Compliance', 'To meet legal and regulatory obligations, including identity checks and anti-money-laundering (AML) requirements.'],
                  ['Communication', 'To contact you about your account, your transactions, and any important updates to our services.'],
                  ['Improving the platform', 'To understand how Blockexa is used so we can improve performance, usability, and new features.'],
                  ['Security and fraud prevention', 'To protect your account, our platform, and other investors from fraud, abuse, and unauthorized access.'],
                ].map(([title, desc]) => (
                  <li key={title} className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                    <p className="text-moss leading-relaxed">
                      <span className="text-ivory font-medium">{title}.</span> {desc}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-moss leading-relaxed">
                We will never use your data to promote a third party's
                products or services on their behalf.
              </p>
            </div>

            <div id="marketing-preferences" className="pp-section scroll-mt-28">
              <h2 className="font-display font-bold text-2xl text-ivory">Marketing Preferences</h2>
              <p className="mt-4 text-moss leading-relaxed">
                If you'd rather not receive marketing emails or updates from
                us, you can manage this at any time from your account under{' '}
                <span className="text-ivory">Account → Notification Settings</span>,
                or by emailing us at{' '}
                <a href="mailto:privacy@blockexa.com" className="text-signal hover:text-signal-glow transition-colors">privacy@blockexa.com</a>{' '}
                from your registered email address. We'll action opt-out
                requests within 7 business days.
              </p>
            </div>

            <div id="sharing" className="pp-section scroll-mt-28">
              <h2 className="font-display font-bold text-2xl text-ivory">How We Share Your Information</h2>
              <p className="mt-4 text-moss leading-relaxed">
                We don't sell your personal data. We do share it, in limited
                circumstances, with:
              </p>
              <ul className="mt-4 space-y-4">
                {[
                  ['Service providers', 'Trusted vendors who help us run our infrastructure, process payments, support customers, or run analytics — bound by confidentiality and data-protection agreements.'],
                  ['Regulators and authorities', 'Where legally required, or in response to a valid court order, and only to the extent required.'],
                  ['Business transfers', 'If Blockexa is involved in a merger, acquisition, or sale of assets, your data may transfer as part of that transaction, under the same protections.'],
                  ['Legal protection', 'Where we reasonably believe it\'s necessary to investigate fraud, protect our rights, or protect the safety of our users.'],
                ].map(([title, desc]) => (
                  <li key={title} className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                    <p className="text-moss leading-relaxed">
                      <span className="text-ivory font-medium">{title}.</span> {desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div id="retention" className="pp-section scroll-mt-28">
              <h2 className="font-display font-bold text-2xl text-ivory">Data Retention</h2>
              <p className="mt-4 text-moss leading-relaxed">
                We keep your data for as long as we need it to provide our
                services, and to meet our legal, tax, and reporting
                obligations. Account and transaction records are generally
                retained for at least 5 years after your account is closed.
                Most other data is deleted within 30 days of your account
                closing, unless we're required to keep it longer for legal
                reasons. When data is no longer needed, we delete it
                securely and ask any third parties we've shared it with to do
                the same.
              </p>
            </div>

            <div id="your-rights" className="pp-section scroll-mt-28">
              <h2 className="font-display font-bold text-2xl text-ivory">Your Rights</h2>
              <p className="mt-4 text-moss leading-relaxed">
                Depending on where you live, you may have the right to:
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  'Access the data we hold about you',
                  'Correct inaccurate or incomplete data',
                  'Request deletion of your data, where we\'re not required to keep it',
                  'Restrict how we use your data in certain circumstances',
                  'Receive a copy of your data in a portable format',
                  'Object to certain uses of your data',
                  'Withdraw consent, where consent is the basis for processing',
                  'Lodge a complaint with your local data protection authority',
                ].map((right) => (
                  <li key={right} className="flex items-start gap-2.5 text-moss leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                    {right}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-moss leading-relaxed">
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:privacy@blockexa.com" className="text-signal hover:text-signal-glow transition-colors">privacy@blockexa.com</a>{' '}
                from your registered email. We may ask for proof of identity
                before acting on a request, and we aim to respond within one
                month.
              </p>
            </div>

            <div id="security" className="pp-section scroll-mt-28">
              <h2 className="font-display font-bold text-2xl text-ivory">Data Security</h2>
              <p className="mt-4 text-moss leading-relaxed">
                We encrypt data in transit using industry-standard protocols,
                restrict internal access to your data on a need-to-know
                basis, and monitor our systems continuously for suspicious
                activity. Keeping your account secure is a shared
                responsibility — never share your password with anyone, and
                contact us immediately if you suspect unauthorized access to
                your account.
              </p>
            </div>

            <div id="children" className="pp-section scroll-mt-28">
              <h2 className="font-display font-bold text-2xl text-ivory">Children's Privacy</h2>
              <p className="mt-4 text-moss leading-relaxed">
                Blockexa is not directed at, and does not knowingly collect
                information from, anyone under the age of 18. We verify age
                as part of our identity checks and will close any account
                found to belong to a minor.
              </p>
            </div>

            <div id="other-sites" className="pp-section scroll-mt-28">
              <h2 className="font-display font-bold text-2xl text-ivory">Links to Other Websites</h2>
              <p className="mt-4 text-moss leading-relaxed">
                Our platform may link to third-party websites. We don't
                control those sites and aren't responsible for their content
                or privacy practices. We'd encourage you to review their
                policies before sharing any information with them.
              </p>
            </div>

            <div id="changes" className="pp-section scroll-mt-28">
              <h2 className="font-display font-bold text-2xl text-ivory">Changes to This Policy</h2>
              <p className="mt-4 text-moss leading-relaxed">
                We may update this policy from time to time to reflect
                changes in our practices or for legal reasons. When we do,
                we'll post the revised version here with a new "last updated"
                date. We'd encourage you to check back periodically.
              </p>
            </div>

            <div id="contact" className="pp-section scroll-mt-28">
              <h2 className="font-display font-bold text-2xl text-ivory">Contact Us</h2>
              <p className="mt-4 text-moss leading-relaxed">
                Questions about this policy or how your data is handled? Reach our
                privacy team at{' '}
                <a href="mailto:privacy@blockexa.com" className="text-signal hover:text-signal-glow transition-colors">privacy@blockexa.com</a>.
                We'll do our best to get back to you quickly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}