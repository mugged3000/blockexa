import { useState, useEffect } from 'react';

/**
 * Cycles through a list of short phrases, typing and deleting each one.
 * Respects prefers-reduced-motion by just showing the first phrase.
 */
export default function Typewriter({
  phrases,
  typingSpeed = 55,
  deletingSpeed = 30,
  pauseAfterType = 1600,
  pauseAfterDelete = 300,
  className = '',
}) {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setText(phrases[0]);
      return;
    }

    const current = phrases[phraseIndex];
    let timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pauseAfterType);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
    } else if (deleting && text.length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, pauseAfterDelete);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete, reducedMotion]);

  return (
    <span className={className}>
      {text}
      <span className="inline-block w-[2px] h-[0.9em] bg-signal ml-1 align-middle animate-pulse" />
    </span>
  );
}