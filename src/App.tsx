import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Send,
  Award,
  Code2,
  Cloud,
} from 'lucide-react';
const nav = [
  ['O mnie', '#o-mnie'],
  ['Doświadczenie', '#doswiadczenie'],
  ['Projekty', '#projekty'],
  ['Technologie', '#technologie'],
  ['Kontakt', '#kontakt'],
];
const logo = (name: string, variant = 'original') =>
  `https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/${name}/${name}-${variant}.svg`;
const skillGroups = [
  {
    name: 'Atlassian & Forge',
    description: 'Aplikacje i rozszerzenia dla ekosystemu Atlassian.',
    items: [
      { name: 'Atlassian Forge', icon: 'https://cdn.simpleicons.org/atlassian/0052CC' },
      { name: 'Jira', icon: logo('jira') },
      { name: 'Jira Service Management', icon: logo('jira') },
      { name: 'Confluence', icon: logo('confluence') },
    ],
  },
  {
    name: 'Frontend',
    description: 'Interfejsy webowe i aplikacje mobilne.',
    items: [
      { name: 'React', icon: logo('react') },
      { name: 'Redux', icon: logo('redux') },
      { name: 'JavaScript', icon: logo('javascript') },
      { name: 'TypeScript', icon: logo('typescript') },
    ],
  },
  {
    name: 'Backend',
    description: 'Logika aplikacji, integracje i API.',
    items: [
      { name: 'Java', icon: logo('java') },
      { name: 'Spring Boot', icon: logo('spring') },
      { name: 'Hibernate', icon: logo('hibernate') },
      { name: 'Node.js', icon: logo('nodejs') },
    ],
  },
  {
    name: 'Dane & chmura',
    description: 'Bazy danych i środowiska aplikacyjne.',
    items: [
      { name: 'AWS', icon: logo('amazonwebservices', 'original-wordmark') },
      { name: 'PostgreSQL', icon: logo('postgresql') },
      { name: 'Terraform', icon: logo('terraform') },
    ],
  },
];
const screenshots = {
  docusign: [
    { src: '/docusign/01-podpis.png', label: 'Akcja w Jira' },
    { src: '/docusign/02-lokalizacja.png', label: 'Opcje podpisu' },
    { src: '/docusign/03-historia.png', label: 'Historia' },
  ],
  kicia: [
    { src: '/kicia-kocia/01-start.png', label: 'Biblioteczka' },
    { src: '/kicia-kocia/02-detail.png', label: 'Szczegóły' },
    { src: '/kicia-kocia/03-polka.png', label: 'Widok półki' },
    { src: '/kicia-kocia/04-lista-zyczen.png', label: 'Lista życzeń' },
    { src: '/kicia-kocia/05-co-czytamy.png', label: 'Czytamy' },
  ],
};
type Gallery = 'docusign' | 'kicia';
export default function Home() {
  const [open, setOpen] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [gallery, setGallery] = useState<{ type: Gallery; index: number } | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!gallery) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setGallery(null);
      if (event.key === 'ArrowRight')
        setGallery((current) =>
          current
            ? { ...current, index: (current.index + 1) % screenshots[current.type].length }
            : null,
        );
      if (event.key === 'ArrowLeft')
        setGallery((current) =>
          current
            ? {
                ...current,
                index:
                  (current.index - 1 + screenshots[current.type].length) %
                  screenshots[current.type].length,
              }
            : null,
        );
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [gallery?.type]);
  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    if (String(d.get('_honey') || '').trim()) {
      setSendStatus('sent');
      return;
    }
    setSendStatus('sending');
    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/mgcodesolutions.michalgajewski@gmail.com',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: String(d.get('name') || '').trim(),
            email: String(d.get('email') || '').trim(),
            subject: String(d.get('subject') || '').trim(),
            _subject: String(d.get('subject') || '').trim(),
            message: String(d.get('message') || '').trim(),
            _honey: '',
            _url: window.location.href,
          }),
        },
      );
      const result = (await response.json()) as { success?: boolean | string };
      if (!response.ok || (result.success !== true && result.success !== 'true'))
        throw new Error('Wysyłka nie powiodła się');
      setSendStatus('sent');
      form.reset();
    } catch {
      setSendStatus('error');
    }
  }
  return (
    <>
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
      <main id="start">
        <section className="hero wrap">
          <div>
            <div className="pill">● &nbsp; Software engineer · Atlassian · Polska</div>
            <h1>
              Buduję rozwiązania,
              <br />
              <em>które ułatwiają pracę.</em>
            </h1>
            <p>
              Cześć, jestem Michał. Tworzę aplikacje dla ekosystemu Atlassian, łącząc doświadczenie
              backendowe z Reactem, Forge i chmurą AWS.
            </p>
            <div className="actions">
              <a className="btn primary" href="#projekty">
                Poznaj moje projekty <ArrowUpRight size={17} />
              </a>
              <a className="btn outline" href="#o-mnie">
                Więcej o mnie <ArrowDown size={17} />
              </a>
            </div>
            <div className="facts">
              <span>
                <b>10</b> lat jako programista
              </span>
              <span>
                <b>6</b> lat w ekosystemie Atlassian
              </span>
            </div>
          </div>
          <div className="hero-art">
            <div className="circle c1" />
            <div className="circle c2" />
            <div className="portrait">
              <img src="/profil.jpg" alt="Michał Gajewski" />
            </div>
            <div className="floating float-a">
              <Code2 />
              <span>
                <small>Specjalizacja</small>
                <b>Atlassian Forge</b>
              </span>
            </div>
            <div className="floating float-b">
              <Cloud />
              <span>
                <small>Technologie</small>
                <b>React · Java · Node · AWS</b>
              </span>
            </div>
          </div>
        </section>
        <div className="strip">
          <div className="wrap strip-inner">
            <span>Pracuję na styku produktu i technologii</span>
            <b>Jira</b>
            <b>JSM</b>
            <b>Confluence</b>
            <b>Atlassian Forge</b>
            <b>AWS</b>
          </div>
        </div>
        <section className="section wrap two" id="o-mnie">
          <div>
            <span className="kicker">01 / O mnie</span>
            <h2>
              Inżynierskie podejście.
              <br />
              <em>Ludzkie rozwiązania.</em>
            </h2>
          </div>
          <div className="prose">
            <p>
              Jestem absolwentem informatyki na Politechnice Łódzkiej z tytułem magistra. Zaczynałem
              od backendu w Javie — Spring, Hibernate i PostgreSQL. Z czasem poszerzyłem zakres
              pracy o frontend w React i Redux.
            </p>
            <p>
              Programuję zawodowo od 10 lat. Od sześciu lat rozwijam aplikacje rozszerzające Jira,
              Jira Service Management i Confluence. W ostatnich dwóch latach koncentruję się na
              Atlassian Forge, React i Node.js. Tworzę oraz utrzymuję także infrastrukturę w AWS.
            </p>
            <p>
              Po godzinach rozwijam własne aplikacje mobilne — to przestrzeń do eksperymentowania i
              sprawdzania nowych pomysłów.
            </p>
            <a
              className="inline-link"
              href="https://www.linkedin.com/in/michal-gajewsky/"
              target="_blank"
              rel="noreferrer"
            >
              Poznaj mnie na LinkedIn <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
        <section className="section tinted" id="doswiadczenie">
          <div className="wrap">
            <div className="heading">
              <div>
                <span className="kicker">02 / Droga zawodowa</span>
                <h2>
                  Doświadczenie, które
                  <br />
                  <em>przekłada się na produkt.</em>
                </h2>
              </div>
              <p>
                Od mocnego zaplecza backendowego do kompleksowego tworzenia aplikacji w chmurze.
              </p>
            </div>
            <div className="timeline">
              {[
                [
                  'Ostatnie 2 lata',
                  'Atlassian Forge & aplikacje cloud',
                  'Rozwój rozszerzeń produktów Atlassian z użyciem Forge, React i Node.js. Praca przy integracjach oraz infrastrukturze AWS.',
                ],
                [
                  'Od 6 lat',
                  'Ekosystem Atlassian',
                  'Rozwój aplikacji dla Jira, Jira Service Management i Confluence, w tym integracja z usługami zewnętrznymi.',
                ],
                [
                  'Wcześniej',
                  'Fundamenty full-stack',
                  'Backend w Java, Spring i PostgreSQL, następnie rozwój interfejsów w React i Redux.',
                ],
              ].map(([period, title, desc]) => (
                <div className="time-item" key={title}>
                  <span className="dot" />
                  <strong>{period}</strong>
                  <div>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section wrap" id="projekty">
          <div className="heading">
            <div>
              <span className="kicker">03 / Wybrane projekty</span>
              <h2>
                Rozwiązania z życia.
                <br />
                <em>Pomysły po godzinach.</em>
              </h2>
            </div>
            <p>Przykłady pracy przy produkcie dla klienta i własnych eksperymentów.</p>
          </div>
          <div className="projects">
            <article className="project">
              <div className="project-art doc-art">
                <img
                  className="market-shot market-left"
                  src="/docusign/01-podpis.png"
                  alt="Akcja Sign with DocuSign w zgłoszeniu Jira"
                />
                <img
                  className="market-shot market-right"
                  src="/docusign/02-lokalizacja.png"
                  alt="Ustawienia podpisu w aplikacji DocuSign for Jira"
                />
                <div className="art-note">Zrzuty z Atlassian Marketplace</div>
              </div>
              <div className="project-body">
                <div className="project-meta">
                  <span>Projekt komercyjny</span>
                  <span>01 / 02</span>
                </div>
                <h3>DocuSign for Jira</h3>
                <p>
                  Dla Transition Technologies PSC rozwijam aplikację, która łączy obieg dokumentów w
                  Jira i Jira Service Management z podpisem elektronicznym DocuSign.
                </p>
                <div className="tags">
                  <span>Jira</span>
                  <span>JSM</span>
                  <span>Atlassian Forge</span>
                  <span>React</span>
                </div>
                <div className="doc-links">
                  {screenshots.docusign.map((shot, index) => (
                    <button
                      type="button"
                      key={shot.src}
                      onClick={() => setGallery({ type: 'docusign', index })}
                    >
                      {shot.label}
                    </button>
                  ))}
                </div>
                <a
                  className="project-link"
                  href="https://marketplace.atlassian.com/apps/1234423/docusign-for-jira"
                  target="_blank"
                  rel="noreferrer"
                >
                  Zobacz w Atlassian Marketplace <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
            <article className="project">
              <div className="project-art cat-art">
                <img
                  className="app-shot shot-back-left"
                  src="/kicia-kocia/04-lista-zyczen.png"
                  alt="Lista życzeń w aplikacji Kicia Kocia Books"
                />
                <img
                  className="app-shot shot-back-right"
                  src="/kicia-kocia/05-co-czytamy.png"
                  alt="Losowanie książki do czytania w aplikacji"
                />
                <img
                  className="app-shot shot-front"
                  src="/kicia-kocia/01-start.png"
                  alt="Biblioteczka Kicia Kocia Books"
                />
                <div className="art-note">Zrzuty z działającej aplikacji iOS</div>
              </div>
              <div className="project-body">
                <div className="project-meta">
                  <span>Projekt własny</span>
                  <span>02 / 02</span>
                </div>
                <h3>Kicia Kocia Books</h3>
                <p>
                  Autorska aplikacja w React Native do prowadzenia kolekcji książek z serii Kicia
                  Kocia. Pozwala wyszukiwać tytuły, oznaczać posiadane egzemplarze, tworzyć listę
                  życzeń i losować książkę do wspólnego czytania.
                </p>
                <div className="tags">
                  <span>React Native</span>
                  <span>Expo</span>
                  <span>iOS / Android</span>
                </div>
                <div className="shot-links">
                  {screenshots.kicia.map((shot, index) => (
                    <button
                      type="button"
                      key={shot.src}
                      onClick={() => setGallery({ type: 'kicia', index })}
                    >
                      {shot.label}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>
        <section className="section tinted" id="technologie">
          <div className="wrap">
            <div className="heading">
              <div>
                <span className="kicker">04 / Mój warsztat</span>
                <h2>
                  Technologie dobrane
                  <br />
                  <em>do zadania.</em>
                </h2>
              </div>
              <p>
                Pracuję w całym przekroju aplikacji — od interfejsu, przez logikę, po
                infrastrukturę.
              </p>
            </div>
            <div className="technology-groups">
              {skillGroups.map((group) => (
                <section className="technology-group" key={group.name}>
                  <div className="technology-group-heading">
                    <h3>{group.name}</h3>
                    <p>{group.description}</p>
                  </div>
                  <div className="technology-grid">
                    {group.items.map((item) => (
                      <div className="technology-tile" key={item.name}>
                        <span className="technology-logo">
                          <img
                            src={item.icon}
                            alt=""
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.style.display = 'none';
                            }}
                          />
                          <span aria-hidden="true">{item.name.slice(0, 2)}</span>
                        </span>
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
        <section className="section wrap two certs" id="certyfikaty">
          <div>
            <span className="kicker">05 / Potwierdzone umiejętności</span>
            <h2>
              Rozwijam się
              <br />
              <em>nieustannie.</em>
            </h2>
            <p>Moje certyfikaty można zweryfikować bezpośrednio w serwisie Credly.</p>
          </div>
          <div className="cert-list">
            {[
              [
                '0c846bc6-178c-4a78-aa16-e5dffd25902b',
                'HashiCorp Certified: Terraform Associate (002)',
              ],
              [
                '581a21a6-c968-454d-a053-942a6204b39d',
                'Oracle Certified Associate, Java SE 8 Programmer',
              ],
            ].map(([id, name], i) => (
              <a
                key={id}
                href={`https://www.credly.com/badges/${id}?source=linked_in_profile`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="award">
                  <Award />
                </span>
                <span>
                  <small>Credly · certyfikat 0{i + 1}</small>
                  <b>{name}</b>
                </span>
                <ArrowUpRight size={19} />
              </a>
            ))}
          </div>
        </section>
        <section className="section contact" id="kontakt">
          <div className="wrap">
            <div className="contact-heading">
              <span className="kicker">06 / Kontakt</span>
              <h2>
                Masz projekt lub pomysł?
                <br />
                <em>Porozmawiajmy.</em>
              </h2>
              <p>Napisz kilka słów o tym, czego potrzebujesz. Chętnie sprawdzę, jak mogę pomóc.</p>
            </div>
            <div className="contact-grid">
              <div className="contact-info">
                <h3>
                  MG Code Solutions
                  <br />
                  Michał Gajewski
                </h3>
                <a href="mailto:mgcodesolutions.michalgajewski@gmail.com">
                  <Mail /> mgcodesolutions.michalgajewski@gmail.com
                </a>
                <a href="tel:+48691235088">
                  <Phone /> +48 691 235 088
                </a>
                <div>
                  <MapPin />
                  <span>
                    ul. Broniewskiego 9<br />
                    99-418 Bełchów, Polska
                  </span>
                </div>
                <a
                  className="linkedin"
                  href="https://www.linkedin.com/in/michal-gajewsky/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <ArrowUpRight size={17} />
                </a>
              </div>
              <form onSubmit={send}>
                <input
                  className="honeypot"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="form-row">
                  <label>
                    Imię i nazwisko
                    <input
                      name="name"
                      placeholder="Jak się nazywasz?"
                      required
                      autoComplete="name"
                    />
                  </label>
                  <label>
                    Adres e-mail
                    <input
                      name="email"
                      type="email"
                      placeholder="twoj@email.pl"
                      required
                      autoComplete="email"
                    />
                  </label>
                </div>
                <label>
                  Temat
                  <input name="subject" placeholder="O czym chcesz porozmawiać?" required />
                </label>
                <label>
                  Wiadomość
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Opowiedz mi o swoim projekcie..."
                    required
                  />
                </label>
                <button className="btn primary" type="submit" disabled={sendStatus === 'sending'}>
                  {sendStatus === 'sending' ? 'Wysyłanie…' : 'Wyślij wiadomość'} <Send size={17} />
                </button>
                <p className={`form-note ${sendStatus === 'error' ? 'error' : ''}`} role="status">
                  {sendStatus === 'sent'
                    ? 'Wiadomość została przyjęta. Dziękuję!'
                    : sendStatus === 'error'
                      ? 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz bezpośrednio na podany adres.'
                      : 'Wiadomość zostanie wysłana bez opuszczania strony.'}
                </p>
                <p className="form-provider">Wysyłkę obsługuje FormSubmit.</p>
              </form>
            </div>
          </div>
        </section>
      </main>
      {gallery && (
        <div
          className="gallery-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setGallery(null);
          }}
        >
          <div
            className="gallery-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`Zrzuty ekranu: ${gallery.type === 'kicia' ? 'Kicia Kocia Books' : 'DocuSign for Jira'}`}
          >
            <div className="gallery-top">
              <div>
                <strong>
                  {gallery.type === 'kicia' ? 'Kicia Kocia Books' : 'DocuSign for Jira'}
                </strong>
                <span>
                  {gallery.index + 1} / {screenshots[gallery.type].length}
                </span>
              </div>
              <button
                ref={closeButton}
                className="gallery-close"
                type="button"
                aria-label="Zamknij podgląd"
                onClick={() => setGallery(null)}
              >
                <X size={22} />
              </button>
            </div>
            <div className="gallery-view">
              <button
                className="gallery-arrow"
                type="button"
                aria-label="Poprzedni zrzut"
                onClick={() =>
                  setGallery((current) =>
                    current
                      ? {
                          ...current,
                          index:
                            (current.index - 1 + screenshots[current.type].length) %
                            screenshots[current.type].length,
                        }
                      : null,
                  )
                }
              >
                <ChevronLeft />
              </button>
              <img
                src={screenshots[gallery.type][gallery.index].src}
                alt={screenshots[gallery.type][gallery.index].label}
              />
              <button
                className="gallery-arrow"
                type="button"
                aria-label="Następny zrzut"
                onClick={() =>
                  setGallery((current) =>
                    current
                      ? {
                          ...current,
                          index: (current.index + 1) % screenshots[current.type].length,
                        }
                      : null,
                  )
                }
              >
                <ChevronRight />
              </button>
            </div>
            <p>{screenshots[gallery.type][gallery.index].label}</p>
          </div>
        </div>
      )}
      <footer>
        <div className="wrap footer">
          <a className="brand" href="#start">
            MG<span>.</span>
            <small>Code Solutions</small>
          </a>
          <span>© {new Date().getFullYear()} MG Code Solutions Michał Gajewski</span>
          <a href="#start">Wróć na górę ↑</a>
        </div>
      </footer>
    </>
  );
}
