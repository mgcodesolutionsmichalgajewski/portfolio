import { getSkillGroups } from '../data/technologies';
import { useTranslation } from 'react-i18next';

type TechnologyGroupText = { name: string; description: string };

export default function Technologies() {
  const { t } = useTranslation();
  const groups = t('technologies.groups', { returnObjects: true }) as TechnologyGroupText[];
  const skillGroups = getSkillGroups(groups);
  return (
    <section className="section tinted" id="technologie">
      <div className="wrap">
        <div className="heading">
          <div>
            <span className="kicker">04 / {t('technologies.kicker')}</span>
            <h2>
              {t('technologies.title')}
              <br />
              <em>{t('technologies.titleAccent')}</em>
            </h2>
          </div>
          <p>{t('technologies.description')}</p>
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
