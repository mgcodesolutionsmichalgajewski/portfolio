import { useTranslation } from 'react-i18next';

type TimelineItem = { period: string; title: string; description: string };

export default function Experience() {
  const { t } = useTranslation();
  const timeline = t('experience.timeline', { returnObjects: true }) as TimelineItem[];
  return (
    <section className="section tinted" id="doswiadczenie">
      <div className="wrap">
        <div className="heading">
          <div>
            <span className="kicker">02 / {t('experience.kicker')}</span>
            <h2>
              {t('experience.title')}
              <br />
              <em>{t('experience.titleAccent')}</em>
            </h2>
          </div>
          <p>{t('experience.description')}</p>
        </div>
        <div className="timeline">
          {timeline.map((item) => (
            <div className="time-item" key={item.title}>
              <span className="dot" />
              <strong>{item.period}</strong>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
