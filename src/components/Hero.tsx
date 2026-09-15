import { ArrowDown, ArrowUpRight, Cloud, Code2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { publicAsset } from '../publicAsset';

export default function Hero() {
  const { t } = useTranslation();
  return (
    <>
      <section className="hero wrap" id="start">
        <div>
          <div className="pill">● &nbsp; {t('hero.eyebrow')}</div>
          <h1>
            {t('hero.title')}
            <br />
            <em>{t('hero.titleAccent')}</em>
          </h1>
          <p>{t('hero.description')}</p>
          <div className="actions">
            <a className="btn primary" href="#projekty">
              {t('hero.projectsButton')} <ArrowUpRight size={17} />
            </a>
            <a className="btn outline" href="#o-mnie">
              {t('hero.aboutButton')} <ArrowDown size={17} />
            </a>
          </div>
          <div className="facts">
            <span>
              <b>10</b> {t('hero.programmerYears')}
            </span>
            <span>
              <b>6</b> {t('hero.atlassianYears')}
            </span>
          </div>
        </div>
        <div className="hero-art">
          <div className="circle c1" />
          <div className="circle c2" />
          <div className="portrait">
            <img src={publicAsset('profil.jpg')} alt="Michał Gajewski" />
          </div>
          <div className="floating float-a">
            <Code2 />
            <span>
              <small>{t('hero.specialization')}</small>
              <b>Atlassian Forge</b>
            </span>
          </div>
          <div className="floating float-b">
            <Cloud />
            <span>
              <small>{t('hero.technologies')}</small>
              <b>React · Java · Node · AWS</b>
            </span>
          </div>
        </div>
      </section>
      <div className="strip">
        <div className="wrap strip-inner">
          <span>{t('hero.strip')}</span>
          <b>Jira</b>
          <b>JSM</b>
          <b>Confluence</b>
          <b>Atlassian Forge</b>
          <b>AWS</b>
        </div>
      </div>
    </>
  );
}
