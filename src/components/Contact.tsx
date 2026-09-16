import { useRef, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MapPin,
  Paperclip,
  Phone,
  Send,
  Trash2,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LinkedInIcon from './LinkedInIcon';

export default function Contact() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [attachmentError, setAttachmentError] = useState('');
  const [selectedAttachments, setSelectedAttachments] = useState<File[]>([]);

  const validateAttachments = (files: File[]) => {
    const selectedFiles = files.filter((file) => file.name);
    if (selectedFiles.some((file) => !['image/png', 'image/jpeg'].includes(file.type)))
      return t('contact.attachmentTypeError');
    const totalSize = selectedFiles.reduce((size, file) => size + file.size, 0);
    if (totalSize > 10 * 1024 * 1024) return t('contact.attachmentSizeError');
    return '';
  };

  const clearAttachments = () => {
    if (attachmentInputRef.current) attachmentInputRef.current.value = '';
    setSelectedAttachments([]);
    setAttachmentError('');
    if (sendStatus === 'sent' || sendStatus === 'error') setSendStatus('idle');
  };

  function send(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const data = new FormData(form);
    const attachments = Array.from(attachmentInputRef.current?.files ?? []);
    const validationError = validateAttachments(attachments);
    setAttachmentError(validationError);
    if (validationError) {
      event.preventDefault();
      return;
    }
    if (String(data.get('_honey') || '').trim()) {
      event.preventDefault();
      setSendStatus('sent');
      return;
    }
    const subjectField = form.elements.namedItem('_subject') as HTMLInputElement;
    const urlField = form.elements.namedItem('_url') as HTMLInputElement;
    subjectField.value = String(data.get('subject') || '').trim();
    urlField.value = window.location.href;
    form.querySelectorAll('.generated-attachment').forEach((input) => input.remove());
    attachments.forEach((file, index) => {
      const input = document.createElement('input');
      const transfer = new DataTransfer();
      transfer.items.add(file);
      input.type = 'file';
      input.name = index === 0 ? 'attachment' : `attachment${index + 1}`;
      input.files = transfer.files;
      input.className = 'generated-attachment';
      input.hidden = true;
      form.append(input);
    });
    setSendStatus('sending');
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
          <form
            ref={formRef}
            action="https://formsubmit.co/kontakt@mgcodesolutions.pl"
            method="POST"
            encType="multipart/form-data"
            target="formsubmit-target"
            onSubmit={send}
            onChange={() => {
              if (sendStatus === 'sent' || sendStatus === 'error') setSendStatus('idle');
            }}
            data-reveal
          >
            <input type="hidden" name="_subject" />
            <input type="hidden" name="_url" />
            <input type="hidden" name="_captcha" value="false" />
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
            <div className="attachment-field">
              <label className="attachment-label" htmlFor="attachments">
                {t('contact.attachment')}
              </label>
              <div
                className={`attachment-control ${selectedAttachments.length > 0 ? 'has-selection' : ''}`}
              >
                <Paperclip className="attachment-paperclip" size={17} />
                <input
                  id="attachments"
                  ref={attachmentInputRef}
                  type="file"
                  accept="image/png,image/jpeg,.png,.jpg,.jpeg"
                  multiple
                  onChange={(event) => {
                    const files = Array.from(event.currentTarget.files ?? []);
                    const error = validateAttachments(files);
                    setAttachmentError(error);
                    if (error) {
                      event.currentTarget.value = '';
                      setSelectedAttachments([]);
                      return;
                    }
                    setSelectedAttachments(files);
                  }}
                />
                <span className="attachment-button-text">{t('contact.chooseFiles')}</span>
                <span className="attachment-selection">
                  {selectedAttachments.length === 0
                    ? t('contact.noFilesSelected')
                    : selectedAttachments.length === 1
                      ? selectedAttachments[0].name
                      : t('contact.selectedFilesCount', { count: selectedAttachments.length })}
                </span>
                {selectedAttachments.length > 0 && (
                  <button
                    className="attachment-clear"
                    type="button"
                    disabled={sendStatus === 'sending'}
                    aria-label={t('contact.clearAttachments')}
                    title={t('contact.clearAttachments')}
                    onClick={clearAttachments}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <small>{t('contact.attachmentHint')}</small>
              {attachmentError && <span className="attachment-error">{attachmentError}</span>}
            </div>
            <button className="btn primary" type="submit" disabled={sendStatus === 'sending'}>
              {sendStatus === 'sending' ? t('contact.sending') : t('contact.send')}{' '}
              <Send size={17} />
            </button>
            <div className={`form-status ${sendStatus}`} role="status" aria-live="polite">
              {sendStatus === 'sent' && <CheckCircle2 />}
              {sendStatus === 'error' && <AlertCircle />}
              {sendStatus === 'sending' && <LoaderCircle className="status-spinner" />}
              <span>
                {sendStatus === 'sent' && <strong>{t('contact.sentTitle')}</strong>}
                {statusMessage}
              </span>
            </div>
            <p className="form-provider">{t('contact.provider')}</p>
          </form>
          <iframe
            className="formsubmit-target"
            name="formsubmit-target"
            title={t('contact.deliveryFrame')}
            onLoad={() => {
              if (sendStatus !== 'sending') return;
              setSendStatus('sent');
              setAttachmentError('');
              setSelectedAttachments([]);
              formRef.current?.reset();
              formRef.current
                ?.querySelectorAll('.generated-attachment')
                .forEach((input) => input.remove());
            }}
          />
        </div>
      </div>
    </section>
  );
}
