import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import About from './components/About';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Footer from './components/Footer';
import GalleryModal from './components/GalleryModal';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Technologies from './components/Technologies';
import type { Gallery } from './data/screenshots';

export default function App() {
  const [gallery, setGallery] = useState<{ type: Gallery; index: number } | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      '[data-reveal], .section > .heading, .section.two > div, .timeline .time-item, .technology-group',
    );
    elements.forEach((element) => element.classList.add('reveal'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects onOpenGallery={(type, index) => setGallery({ type, index })} />
        <Technologies />
        <Certificates />
        <Contact />
      </main>
      {gallery && (
        <GalleryModal gallery={gallery} onChange={setGallery} onClose={() => setGallery(null)} />
      )}
      <Footer />
      <a className="back-to-top" href="#start" aria-label="Wróć na górę">
        <ArrowUp size={20} />
      </a>
    </>
  );
}
