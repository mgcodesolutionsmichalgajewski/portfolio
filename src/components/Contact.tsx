import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Mail, MapPin, Paperclip, Phone, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LinkedInIcon from './LinkedInIcon';

export default function Contact() {
  const { t } = useTranslation();
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [attachmentError, setAttachmentError] = useState('');

  const validateAttachments = (files: File[]) => {
    const selectedFiles = files.filter((file) => file.name);
    if (selectedFiles.some((file) => !['image/png', 'image/jpeg'].includes(file.type)))
      return t('contact.attachmentTypeError');
    const totalSize = selectedFiles.reduce((size, file) => size + file.size, 0);
    if (totalSize > 10 * 1024 * 1024) return t('contact.attachmentSizeError');
    return '';
  };

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const attachments = data
      .getAll('attachment')
      .filter((entry): entry is File => entry instanceof File);
    const validationError = validateAttachments(attachments);
    setAttachmentError(validationError);
    if (validationError) return;
    if (String(data.get('_honey') || '').trim()) {
      setSendStatus('sent');
      return;
    }
    data.set('_subject', String(data.get('subject') || '').trim());
    data.set('_honey', '');
    data.set('_url', window.location.href);
    setSendStatus('sending');
    try {
      const response = await fetch('https://formsubmit.co/ajax/kontakt@mgcodesolutions.pl', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const result = (await response.json()) as { success?: boolean | string };
      if (!response.ok || (result.success !== true && result.success !== 'true'))
        throw new Error('Message could not be sent');
      setSendStatus('sent');
      setAttachmentError('');
      form.reset();
    } catch {
      setSendStatus('error');
    }
  }

  const statusMessage =
    sendStatus === 'sent'
      ? t('contact.sent')
      : sendStatus === 'error'
        ? t('contact.error')
        : t('contact.idle');
  return (
    <section className="section contact" id="kontakt">
      <div className="wrap">
        <div className="contact-heading" data-reveal>
          <span className="kicker">06 / {t('contact.kicker')}</span>
          <h2>
            {t('contact.title')}
            <br />
            <em>{t('contact.titleAccent')}</em>
          </h2>
          <p>{t('contact.description')}</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info" data-reveal>
            <h3>
              MG Code Solutions
              <br />
              Michał Gajewski
            </h3>
            <a href="mailto:kontakt@mgcodesolutions.pl">
              <Mail /> kontakt@mgcodesolutions.pl
            </a>
            <a href="tel:+48691235088">
              <Phone /> +48 691 235 088
            </a>
            <div>
              <MapPin />
              <span>
                ul. Broniewskiego 9<br />
                99-418 Bełchów, {t('contact.country')}
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
                {t('contact.fullName')}
                <input
                  name="name"
                  placeholder={t('contact.fullNamePlaceholder')}
                  required
                  autoComplete="name"
                />
              </label>
              <label>
                {t('contact.email')}
                <input
                  name="email"
                  type="email"
                  placeholder={t('contact.emailPlaceholder')}
                  required
                  autoComplete="email"
                />
              </label>
            </div>
            <label>
              {t('contact.subject')}
              <input name="subject" placeholder={t('contact.subjectPlaceholder')} required />
            </label>
            <label>
              {t('contact.message')}
              <textarea
                name="message"
                rows={5}
                placeholder={t('contact.messagePlaceholder')}
                required
              />
            </label>
            <label className="attachment-field">
              {t('contact.attachment')}
              <span className="attachment-control">
                <Paperclip size={17} />
                <input
                  name="attachment"
                  type="file"
                  accept="image/png,image/jpeg,.png,.jpg,.jpeg"
                  multiple
                  onChange={(event) => {
                    const error = validateAttachments(Array.from(event.currentTarget.files ?? []));
                    setAttachmentError(error);
                    if (error) event.currentTarget.value = '';
                  }}
                />
              </span>
              <small>{t('contact.attachmentHint')}</small>
              {attachmentError && <span className="attachment-error">{attachmentError}</span>}
            </label>
            <button className="btn primary" type="submit" disabled={sendStatus === 'sending'}>
              {sendStatus === 'sending' ? t('contact.sending') : t('contact.send')}{' '}
              <Send size={17} />
            </button>
            <p className={`form-note ${sendStatus === 'error' ? 'error' : ''}`} role="status">
              {statusMessage}
            </p>
            <p className="form-provider">{t('contact.provider')}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
