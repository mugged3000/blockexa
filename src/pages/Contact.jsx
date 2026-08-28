import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';


gsap.registerPlugin(ScrollTrigger);

const CHANNELS = [
  {
    label: 'Email',
    value: 'support@blockexa.ltd',
    note: 'Replies within one business day',
    icon: 'mail',
  },
  {
    label: 'Live chat',
    value: 'Available in your dashboard',
    note: 'Mon–Fri, 8am–8pm WAT',
    icon: 'chat',
  },
  {
    label: 'Trading desk',
    value: '+1 (204) 555-0148',
    note: 'For Elite & VIP plan holders',
    icon: 'phone',
  },
];

const ICONS = {
  mail: <path d="M4 6h16v12H4V6Zm0 0 8 7 8-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  chat: <path d="M5 5h14v10H9l-4 4V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />,
  phone: <path d="M6 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />,
};

const TOPICS = ['General inquiry', 'Account & deposits', 'Withdrawals', 'Partnerships', 'Press'];

export default function Contact() {
  const sectionRef = useRef(null);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        y: 26,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div ref={sectionRef}>
      {/*
        HERO — background image, short text only. Drop your image at
        public/contact-hero.jpg (any filename is fine, just update the
        src below to match).
      */}
      <section className="relative overflow-hidden bg-ink min-h-[70dvh] flex flex-col">
        <div className="absolute inset-0">
          <img
            src="/contact-hero.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.8) saturate(0.9)' }}
          />
          <div className="absolute inset-0 bg-ink/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink" />
        </div>

        <div className="contact-reveal relative z-10 max-w-xl px-6 lg:px-10 pt-32 pb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">
            Get in touch
          </span>
          <h1 className="mt-3 font-display font-bold text-4xl sm:text-5xl leading-[1.1] text-ivory">
            Let's talk.
          </h1>
        </div>
      </section>

      {/* Channels + form */}
      <section className="relative py-20 bg-ink border-t border-line">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Contact channels */}
          <div className="lg:col-span-2 space-y-5">
            {CHANNELS.map((c) => (
              <div
                key={c.label}
                className="contact-reveal flex items-start gap-4 rounded-2xl border border-line bg-panel px-6 py-5 hover:border-signal-dim/50 transition-colors"
              >
                <div className="shrink-0 w-11 h-11 rounded-full border border-signal-dim/50 bg-panel-raised flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="18" height="18" className="text-signal">
                    {ICONS[c.icon]}
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">{c.label}</span>
                  <p className="mt-1 font-display font-semibold text-ivory">{c.value}</p>
                  <p className="mt-0.5 text-sm text-moss">{c.note}</p>
                </div>
              </div>
            ))}

            <div className="contact-reveal rounded-2xl border border-line bg-panel px-6 py-5">
              <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">Before you write in</span>
              <p className="mt-2 text-sm text-moss leading-relaxed">
                Withdrawal and KYC questions are usually answered faster in
                the{' '}
                <a href="/aml-kyc" className="text-signal hover:text-signal-glow transition-colors">
                  AML/KYC
                </a>{' '}
                and{' '}
                <a href="/withdrawal-policy" className="text-signal hover:text-signal-glow transition-colors">
                  Withdrawal Policy
                </a>{' '}
                pages than by message.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="contact-reveal lg:col-span-3 rounded-2xl border border-line bg-panel p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="w-14 h-14 rounded-full border border-signal-dim/60 bg-panel-raised flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="24" height="24" className="text-signal">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
                <h3 className="mt-5 font-display font-semibold text-xl text-ivory">Message sent</h3>
                <p className="mt-2 text-sm text-moss max-w-xs">
                  Thanks — someone from the team will reply to your email within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="text-sm text-moss">Name</span>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      className="mt-2 w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-ivory placeholder:text-moss/50 outline-none focus:border-signal-dim transition-colors"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-moss">Email</span>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-ivory placeholder:text-moss/50 outline-none focus:border-signal-dim transition-colors"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm text-moss">What's this about?</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {TOPICS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(t)}
                        className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                          topic === t
                            ? 'bg-signal text-ink border-signal'
                            : 'border-line text-moss hover:text-ivory hover:border-signal-dim'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </label>

                <label className="block">
                  <span className="text-sm text-moss">Message</span>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us what's going on..."
                    className="mt-2 w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-ivory placeholder:text-moss/50 outline-none focus:border-signal-dim transition-colors resize-none"
                  />
                </label>

                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-full bg-signal text-ink font-semibold px-8 py-3.5 hover:bg-signal-glow transition-colors"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative py-20 bg-ink border-t border-line">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="contact-reveal flex items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">Find us</span>
              <h2 className="mt-2 font-display font-bold text-2xl text-ivory">Our office</h2>
            </div>
            {/*
              Update this address to your real office address — it also
              drives the "Get directions" link below.
            */}
          </div>

          <div className="contact-reveal rounded-2xl border border-line overflow-hidden">
            <iframe
              title="Blockexa office location"
              src="https://www.google.com/maps?q=1+Infinite+Loop,+Cupertino,+CA&output=embed"
              width="100%"
              height="420"
              style={{ border: 0, filter: 'grayscale(0.3) invert(0.92) contrast(0.9)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>

          <div className="contact-reveal mt-4 flex flex-wrap items-center justify-between gap-4">
            {/* <p className="text-sm text-moss">1 Infinite Loop, Cupertino, CA — replace with your actual address</p> */}
            <Link
              to="https://www.google.com/maps/dir/?api=1&destination=1+Infinite+Loop,+Cupertino,+CA"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-signal hover:text-signal-glow transition-colors font-medium"
            >
              Get directions →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}