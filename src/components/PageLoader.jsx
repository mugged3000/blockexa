import { useEffect, useState } from 'react';

// Total time the loader stays on screen, in ms.
const LOAD_DURATION = 5000;
// How long the fade-out transition takes once loading completes.
const FADE_DURATION = 500;

/**
 * Full-screen branded loading screen shown once, on first app load, before
 * the actual site content is revealed underneath it.
 *
 * LOGO: drop your logo file in the `public/` folder and point `LOGO_SRC`
 * below at it (e.g. '/logo.png'). It currently reuses the same logo already
 * used in the Nav/Footer (public/logoexaa.jpg) so it stays consistent — swap
 * it out any time.
 */
const LOGO_SRC = '/loader.jpg';

// Short tagline shown under the logo. Keep it to a few words.
const TAGLINE = 'Invest With Confidence';

export default function PageLoader() {
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setFading(true), LOAD_DURATION);
    const hideTimer = window.setTimeout(
      () => setVisible(false),
      LOAD_DURATION + FADE_DURATION
    );

    // Lock scroll while the loader is up so the page can't jump around
    // underneath it.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = '';
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ink transition-opacity ease-out ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ transitionDuration: `${FADE_DURATION}ms` }}
      role="status"
      aria-live="polite"
      aria-busy={!fading}
    >
      {/* soft ambient glow behind the mark */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-signal/10 blur-[100px]" />
      </div>

      <div className="relative flex flex-col items-center gap-6">
        {/* Logo — moderate size (72px tall), slow 3D coin-style rotation so
            the mark stays readable most of the time rather than blurring
            past like a flat spin. */}
                {/* Logo — moderate size (72px tall), slow full 360° circular spin. */}
        <img
          src={LOGO_SRC}
          alt="Blockexa"
          className="h-18 w-auto rounded-2xl shadow-[0_0_50px_-10px_rgba(47,230,163,0.45)]"
          style={{ animation: 'loader-spin 3.2s linear infinite' }}
        />

        {/* Tagline */}
        <p
          className="text-sm sm:text-base font-display font-medium text-ivory/90 tracking-[0.08em] text-center"
          style={{ animation: 'loader-fade-in 0.8s ease-out 0.3s both' }}
        >
          {TAGLINE}
        </p>
      </div>
    </div>
  );
}