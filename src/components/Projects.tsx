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
    library: string[];
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
            <button
              className="project-preview-button"
              type="button"
              onClick={() => onOpenGallery('docusign', 0)}
            >
              <img
                className="project-preview"
                src={publicAsset('project-previews/docusign.png')}
                alt={t('projects.alt.docusignAction')}
              />
            </button>
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
            <button
              className="project-preview-button"
              type="button"
              onClick={() => onOpenGallery('library', 0)}
            >
              <img
                className="project-preview"
                src={publicAsset('private-library/preview.png')}
                alt={t('projects.alt.library')}
              />
            </button>
            <div className="project-preview-status" aria-label={t('projects.status.label')}>
              <strong>{t('projects.status.private')}</strong>
              <span>{t('projects.status.educational')}</span>
              <small>{t('projects.status.suspended')}</small>
            </div>
            <div className="art-note">{t('projects.anonymizedScreenshots')}</div>
          </div>
          <div className="project-body">
            <div className="project-meta">
              <span>{t('projects.privateProject')}</span>
              <span>02 / 02</span>
            </div>
            <h3>{t('projects.libraryTitle')}</h3>
            <p>{t('projects.libraryDescription')}</p>
            <div className="tags">
              <span>React Native</span>
              <span>Expo</span>
              <span>iOS / Android</span>
            </div>
            <div className="shot-links">
              {screenshots.library.map((shot, index) => (
                <button
                  type="button"
                  key={shot.src}
                  onClick={() => onOpenGallery('library', index)}
                >
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
