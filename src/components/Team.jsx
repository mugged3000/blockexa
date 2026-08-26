import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const KITE_CLIP = 'polygon(32px 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%, 0 32px)';

/*
  STAFF PHOTOS — drop two images at:
    public/team/julian-cross.jpg
    public/team/sofia-marchetti.jpg
  Portrait orientation works best (roughly 4:5), min ~800px tall.
*/
const TEAM = [
  { name: 'Julian Cross', role: 'Founder & CEO', bio: 'Leads strategy and reserve management. Fifteen years across trading desks before founding Blockexa.', photo: '/team/julian-cross.jpg' },
  { name: 'Sofia Marchetti', role: 'Head of Trading & Risk', bio: 'Runs the desk that opens and closes every position, and the risk checks that gate them.', photo: '/team/sofia-marchettii.jpg' },
  { name: 'Marcus Bell', role: 'Head of Engineering', bio: 'Builds and maintains the escrow infrastructure, from smart contract logic to uptime.', photo: '/team/marcus-bell.jpg' },
  { name: 'Paul Mark', role: 'Compliance & Disputes', bio: 'Oversees dispute resolution and keeps every transaction within regulatory bounds.', photo: '/team/paul-mark.jpg' },
];

export default function Team() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-reveal', {
        y: 48,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="team" ref={sectionRef} className="relative py-28 bg-ink">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="team-reveal mb-14 max-w-xl">
          <span className="text-xs font-mono uppercase tracking-widest text-signal-dim">The people behind Blockexa</span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ivory">A small team, directly accountable</h2>
          <p className="mt-3 text-moss">No call centers, no anonymous support tickets — Blockexa is run by people you can actually name.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 lg:gap-10">
          {TEAM.map((member) => (
            <div key={member.name} className="team-reveal group relative">
              <div className="p-[1.5px] plan-shine transition-transform duration-500 ease-out group-hover:-translate-y-2" style={{ clipPath: KITE_CLIP }}>
                <div className="bg-panel overflow-hidden" style={{ clipPath: KITE_CLIP }}>
                  <div className="relative h-80 sm:h-96 overflow-hidden bg-panel-raised">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
                  </div>

                  <div className="px-7 py-7 sm:px-8 sm:py-8">
                    <h3 className="font-display font-bold text-xl text-ivory">{member.name}</h3>
                    <p className="mt-1 text-xs font-mono uppercase tracking-widest text-signal-dim">{member.role}</p>
                    <p className="mt-4 text-sm text-moss leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
