import { skillGroups } from '../data/technologies';

export default function Technologies() {
  return (
    <section className="section tinted" id="technologie">
      <div className="wrap">
        <div className="heading">
          <div>
            <span className="kicker">04 / Mój warsztat</span>
            <h2>
              Technologie dobrane
              <br />
              <em>do zadania.</em>
            </h2>
          </div>
          <p>
            Pracuję w całym przekroju aplikacji — od interfejsu, przez logikę, po infrastrukturę.
          </p>
        </div>
        <div className="technology-groups">
          {skillGroups.map((group) => (
            <section className="technology-group" key={group.name}>
              <div className="technology-group-heading">
                <h3>{group.name}</h3>
                <p>{group.description}</p>
              </div>
              <div className="technology-grid">
                {group.items.map((item) => (
                  <div className="technology-tile" key={item.name}>
                    <span className="technology-logo">
                      <img
                        src={item.icon}
                        alt=""
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                        }}
                      />
                      <span aria-hidden="true">{item.name.slice(0, 2)}</span>
                    </span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
