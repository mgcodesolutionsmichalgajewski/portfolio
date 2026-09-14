import LinkedInIcon from './LinkedInIcon';
import { ArrowUpRight } from 'lucide-react';

export default function About() {
  return (
    <section className="section wrap two" id="o-mnie">
      <div>
        <span className="kicker">01 / O mnie</span>
        <h2>
          Inżynierskie podejście.
          <br />
          <em>Ludzkie rozwiązania.</em>
        </h2>
      </div>
      <div className="prose">
        <p>
          Jestem absolwentem informatyki na Politechnice Łódzkiej z tytułem magistra. Zaczynałem od
          backendu w Javie — Spring, Hibernate i PostgreSQL. Z czasem poszerzyłem zakres pracy o
          frontend w React i Redux.
        </p>
        <p>
          Programuję zawodowo od 10 lat. Od sześciu lat rozwijam aplikacje rozszerzające Jira, Jira
          Service Management i Confluence. W ostatnich dwóch latach koncentruję się na Atlassian
          Forge, React i Node.js. Tworzę oraz utrzymuję także infrastrukturę w AWS.
        </p>
        <p>
          Po godzinach rozwijam własne aplikacje mobilne — to przestrzeń do eksperymentowania i
          sprawdzania nowych pomysłów.
        </p>
        <a
          className="inline-link"
          href="https://www.linkedin.com/in/michal-gajewsky/"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedInIcon className="linkedin-logo" />
          Poznaj mnie na LinkedIn <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}
