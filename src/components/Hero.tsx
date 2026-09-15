import { ArrowUpRight, ArrowDown, Code2, Cloud } from 'lucide-react';
import { publicAsset } from '../publicAsset';

export default function Hero() {
  return (
    <>
      <section className="hero wrap" id="start">
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
            <img src={publicAsset('profil.jpg')} alt="Michał Gajewski" />
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
    </>
  );
}
