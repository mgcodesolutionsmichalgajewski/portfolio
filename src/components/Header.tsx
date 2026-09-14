import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { nav } from '../data/navigation';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="wrap nav">
        <a className="brand" href="#start">
          MG<span>.</span>
          <small>Code Solutions</small>
        </a>
        <nav className={open ? 'links open' : 'links'}>
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
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
