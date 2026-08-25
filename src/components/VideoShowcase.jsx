import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const KITE_CLIP = 'polygon(28px 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%, 0 28px)';

export default function VideoShowcase() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.video-reveal', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <section ref={sectionRef} className="relative py-28 bg-ink">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="video-reveal">
            <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">See Blockexa in motion</span>
            <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ivory">A quick look inside the platform</h2>
            <p className="mt-4 text-moss leading-relaxed">
              From deposit to daily settlement, here's what managing your investment on Blockexa actually looks like — no jargon, no guesswork, just your balance updating in real time.
            </p>
            <a href="#plans" className="mt-8 inline-block rounded-full bg-signal text-ink font-semibold px-7 py-3.5 hover:bg-signal-glow transition-colors">
              Explore plans
            </a>
          </div>

          <div className="video-reveal relative">
            <div className="p-[1.5px] plan-shine" style={{ clipPath: KITE_CLIP }}>
              <div className="relative bg-panel overflow-hidden h-[460px] sm:h-[560px] lg:h-[640px]" style={{ clipPath: KITE_CLIP }}>
                {/*
                  SHOWCASE CLIP — drop your video file at public/showcase-clip.mp4
                  (a few seconds, looping, works best — keep it short and lightweight)
                */}
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/showcase-clip.mp4"
                  autoPlay
                  loop
                  muted={muted}
                  playsInline
                />

                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-ink/70 border border-line backdrop-blur-sm flex items-center justify-center text-ivory hover:border-signal-dim transition-colors"
                  aria-label={muted ? 'Unmute video' : 'Mute video'}
                >
                  {muted ? (
                    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-ivory"><path d="M16.5 12a4.5 4.5 0 0 0-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.42.05-.63Zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.7 8.7 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-ivory"><path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12ZM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77Z" /></svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
