import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { nav } from '../data/navigation';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navigationInProgress = useRef(false);
  const navigationTimeout = useRef<number | undefined>(undefined);
  const navigationCleanup = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    const sections = nav
      .map(([, href]) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible && !navigationInProgress.current) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.25, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      window.clearTimeout(navigationTimeout.current);
      navigationCleanup.current?.();
    };
  }, []);

  function selectSection(href: string) {
    navigationCleanup.current?.();
    setOpen(false);
    setActiveSection(href);
    navigationInProgress.current = true;

    const finishNavigation = () => {
      navigationInProgress.current = false;
      window.clearTimeout(navigationTimeout.current);
      window.removeEventListener('scrollend', finishNavigation);
      navigationCleanup.current = undefined;
    };

    navigationCleanup.current = finishNavigation;
    window.addEventListener('scrollend', finishNavigation, { once: true });
    navigationTimeout.current = window.setTimeout(finishNavigation, 1500);
  }

  return (
    <header className="header">
      <div className="wrap nav">
        <a className="brand" href="#start">
          MG<span>.</span>
          <small>Code Solutions</small>
        </a>
        <nav className={open ? 'links open' : 'links'}>
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={activeSection === href ? 'active' : undefined}
              aria-current={activeSection === href ? 'location' : undefined}
              onClick={() => selectSection(href)}
            >
              {label}
            </a>
          ))}
        </nav>
        <button
          className="menu"
          aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
