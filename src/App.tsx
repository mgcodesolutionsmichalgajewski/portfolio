import { useState } from 'react';
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

  return (
    <>
      <Header />
      <main id="start">
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
    </>
  );
}
