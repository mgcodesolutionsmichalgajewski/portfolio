import { ArrowUpRight } from 'lucide-react';
import { screenshots, type Gallery } from '../data/screenshots';
import { publicAsset } from '../publicAsset';

export default function Projects({
  onOpenGallery,
}: {
  onOpenGallery: (type: Gallery, index: number) => void;
}) {
  return (
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
              src={publicAsset('docusign/01-podpis.png')}
              alt="Akcja Sign with DocuSign w zgłoszeniu Jira"
            />
            <img
              className="market-shot market-right"
              src={publicAsset('docusign/02-lokalizacja.png')}
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
              Zobacz w Atlassian Marketplace <ArrowUpRight size={17} />
            </a>
          </div>
        </article>
        <article className="project">
          <div className="project-art cat-art">
            <img
              className="app-shot shot-back-left"
              src={publicAsset('kicia-kocia/04-lista-zyczen.png')}
              alt="Lista życzeń w aplikacji Kicia Kocia Books"
            />
            <img
              className="app-shot shot-back-right"
              src={publicAsset('kicia-kocia/05-co-czytamy.png')}
              alt="Losowanie książki do czytania w aplikacji"
            />
            <img
              className="app-shot shot-front"
              src={publicAsset('kicia-kocia/01-start.png')}
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
              Autorska aplikacja w React Native do prowadzenia kolekcji książek z serii Kicia Kocia.
              Pozwala wyszukiwać tytuły, oznaczać posiadane egzemplarze, tworzyć listę życzeń i
              losować książkę do wspólnego czytania.
            </p>
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
