import LinkedInIcon from './LinkedInIcon';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
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
    <section className="section contact" id="kontakt">
      <div className="wrap">
        <div className="contact-heading" data-reveal>
          <span className="kicker">06 / Kontakt</span>
          <h2>
            Zostańmy
            <br />
            <em>w kontakcie.</em>
          </h2>
          <p>Napisz kilka słów o tym, czego potrzebujesz. Chętnie sprawdzę, jak mogę pomóc.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info" data-reveal>
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
              <LinkedInIcon className="linkedin-logo" />
              LinkedIn <ArrowUpRight size={17} />
            </a>
          </div>
          <form onSubmit={send} data-reveal>
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
                <input name="name" placeholder="Jak się nazywasz?" required autoComplete="name" />
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
              <textarea name="message" rows={5} placeholder="Napisz swoją wiadomość..." required />
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
  );
}
