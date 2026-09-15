import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationHrefs } from '../data/navigation';
import { useTranslation } from 'react-i18next';
import FlagIcon from './FlagIcon';

export default function Header() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage === 'en' ? 'en' : 'pl';
  const labels = t('navigation', { returnObjects: true }) as string[];
  const nav = labels.map((label, index) => [label, navigationHrefs[index]] as const);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navigationInProgress = useRef(false);
  const navigationTimeout = useRef<number | undefined>(undefined);
  const navigationCleanup = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    const sections = navigationHrefs
      .map((href) => document.querySelector<HTMLElement>(href))
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

  async function changeLanguage(language: 'pl' | 'en') {
    const currentSection = document.querySelector<HTMLElement>(activeSection || '#start');
    const sectionTop = currentSection?.getBoundingClientRect().top;
    await i18n.changeLanguage(language);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!currentSection || sectionTop === undefined) return;
        const previousScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollBy(0, currentSection.getBoundingClientRect().top - sectionTop);
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
      });
    });
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
        <div className="language-switch" aria-label={t('accessibility.chooseLanguage')}>
          <button
            type="button"
            className={language === 'pl' ? 'active' : undefined}
            aria-pressed={language === 'pl'}
            aria-label={t('accessibility.polish')}
            title={t('accessibility.polish')}
            onClick={() => void changeLanguage('pl')}
          >
            <FlagIcon country="pl" />
          </button>
          <button
            type="button"
            className={language === 'en' ? 'active' : undefined}
            aria-pressed={language === 'en'}
            aria-label={t('accessibility.english')}
            title={t('accessibility.english')}
            onClick={() => void changeLanguage('en')}
          >
            <FlagIcon country="gb" />
          </button>
        </div>
        <button
          className="menu"
          aria-label={open ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
