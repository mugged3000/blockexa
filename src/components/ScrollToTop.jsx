import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    if (hash) {
      const id = hash.replace('#', '');
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
        html.style.scrollBehavior = previous;
      });
    } else {
      window.scrollTo(0, 0);
      html.style.scrollBehavior = previous;
    }
  }, [pathname, hash]);

  return null;
}