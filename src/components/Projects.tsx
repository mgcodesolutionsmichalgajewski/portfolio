import { ArrowUpRight } from 'lucide-react';
import { getScreenshots, type Gallery } from '../data/screenshots';
import { useTranslation } from 'react-i18next';
import { publicAsset } from '../publicAsset';

export default function Projects({
  onOpenGallery,
}: {
  onOpenGallery: (type: Gallery, index: number) => void;
}) {
  const { t } = useTranslation();
  const galleryLabels = t('projects.gallery', { returnObjects: true }) as {
    docusign: string[];
    kicia: string[];
  };
  const screenshots = getScreenshots(galleryLabels);
  return (
    <section className="section wrap" id="projekty">
      <div className="heading" data-reveal>
        <div>
          <span className="kicker">03 / {t('projects.kicker')}</span>
          <h2>
            {t('projects.title')}
            <br />
            <em>{t('projects.titleAccent')}</em>
          </h2>
        </div>
        <p>{t('projects.description')}</p>
      </div>
      <div className="projects">
        <article className="project project-commercial" data-reveal>
          <div className="project-art doc-art">
            <img
              className="market-shot market-left"
              src={publicAsset('docusign/01-podpis.png')}
              alt={t('projects.alt.docusignAction')}
            />
            <img
              className="market-shot market-right"
              src={publicAsset('docusign/02-lokalizacja.png')}
              alt={t('projects.alt.docusignSettings')}
            />
            <div className="art-note">{t('projects.marketplaceScreenshots')}</div>
          </div>
          <div className="project-body">
            <div className="project-meta">
              <span>{t('projects.commercial')}</span>
              <span>01 / 02</span>
            </div>
            <h3>DocuSign for Jira</h3>
            <p>{t('projects.docusignDescription')}</p>
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
                  onClick={() => onOpenGallery('docusign', index)}
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
              {t('projects.marketplaceLink')} <ArrowUpRight size={17} />
            </a>
          </div>
        </article>
        <article className="project project-personal" data-reveal>
          <div className="project-art cat-art">
            <img
              className="app-shot shot-back-left"
              src={publicAsset('kicia-kocia/04-lista-zyczen.png')}
              alt={t('projects.alt.wishList')}
            />
            <img
              className="app-shot shot-back-right"
              src={publicAsset('kicia-kocia/05-co-czytamy.png')}
              alt={t('projects.alt.drawing')}
            />
            <img
              className="app-shot shot-front"
              src={publicAsset('kicia-kocia/01-start.png')}
              alt={t('projects.alt.library')}
            />
            <div className="art-note">{t('projects.iosScreenshots')}</div>
          </div>
          <div className="project-body">
            <div className="project-meta">
              <span>{t('projects.personal')}</span>
              <span>02 / 02</span>
            </div>
            <h3>Kicia Kocia Books</h3>
            <p>{t('projects.kiciaDescription')}</p>
            <div className="tags">
              <span>React Native</span>
              <span>Expo</span>
              <span>iOS / Android</span>
            </div>
            <div className="shot-links">
              {screenshots.kicia.map((shot, index) => (
                <button type="button" key={shot.src} onClick={() => onOpenGallery('kicia', index)}>
                  {shot.label}
                </button>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
