import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LinkedInIcon from './LinkedInIcon';

export default function About() {
  const { t } = useTranslation();
  const paragraphs = t('about.paragraphs', { returnObjects: true }) as string[];
  return (
    <section className="section wrap two" id="o-mnie">
      <div>
        <span className="kicker">01 / {t('about.kicker')}</span>
        <h2>
          {t('about.title')}
          <br />
          <em>{t('about.titleAccent')}</em>
        </h2>
      </div>
      <div className="prose">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <a
          className="inline-link"
          href="https://www.linkedin.com/in/michal-gajewsky/"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedInIcon className="linkedin-logo" />
          {t('about.linkedIn')} <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}
