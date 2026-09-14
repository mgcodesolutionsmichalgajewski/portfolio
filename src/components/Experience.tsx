export default function Experience() {
  return (
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
          <p>Od mocnego zaplecza backendowego do kompleksowego tworzenia aplikacji w chmurze.</p>
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
  );
}
