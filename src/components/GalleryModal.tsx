import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { screenshots, type Gallery } from '../data/screenshots';

type GalleryState = { type: Gallery; index: number };

type Props = {
  gallery: GalleryState;
  onChange: (gallery: GalleryState) => void;
  onClose: () => void;
};

export default function GalleryModal({ gallery, onChange, onClose }: Props) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const items = screenshots[gallery.type];
  const current = items[gallery.index];
  const title = gallery.type === 'kicia' ? 'Kicia Kocia Books' : 'DocuSign for Jira';

  const move = (direction: number) => {
    onChange({ ...gallery, index: (gallery.index + direction + items.length) % items.length });
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [gallery]);

  return (
    <div
      className="gallery-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="gallery-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`Zrzuty ekranu: ${title}`}
      >
        <div className="gallery-top">
          <div>
            <strong>{title}</strong>
            <span>
              {gallery.index + 1} / {items.length}
            </span>
          </div>
          <button
            ref={closeButton}
            className="gallery-close"
            type="button"
            aria-label="Zamknij podgląd"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>
        <div className="gallery-view">
          <button
            className="gallery-arrow"
            type="button"
            aria-label="Poprzedni zrzut"
            onClick={() => move(-1)}
          >
            <ChevronLeft />
          </button>
          <img src={current.src} alt={current.label} />
          <button
            className="gallery-arrow"
            type="button"
            aria-label="Następny zrzut"
            onClick={() => move(1)}
          >
            <ChevronRight />
          </button>
        </div>
        <p>{current.label}</p>
      </div>
    </div>
  );
}
