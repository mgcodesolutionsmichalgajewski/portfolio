import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { publicAsset } from '../publicAsset';

const certificates = [
  {
    id: '0c846bc6-178c-4a78-aa16-e5dffd25902b',
    name: 'HashiCorp Certified: Terraform Associate (002)',
    image: 'certificates/terraform-associate.png',
  },
  {
    id: '581a21a6-c968-454d-a053-942a6204b39d',
    name: 'Oracle Certified Associate, Java SE 8 Programmer',
    image: 'certificates/oracle-java-se-8.png',
  },
];

export default function Certificates() {
  const { t } = useTranslation();
  return (
    <section className="section wrap two certs" id="certyfikaty">
      <div data-reveal>
        <span className="kicker">05 / {t('certificates.kicker')}</span>
        <h2>
          {t('certificates.title')}
          <br />
          <em>{t('certificates.titleAccent')}</em>
        </h2>
        <p>{t('certificates.description')}</p>
      </div>
      <div className="cert-list">
        {certificates.map(({ id, name, image }) => (
          <article className="certificate-card" key={id} data-reveal>
            <a
              href={`https://www.credly.com/badges/${id}?source=linked_in_profile`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="certificate-image-frame">
                <img className="certificate-image" src={publicAsset(image)} alt={name} />
              </span>
              <span className="certificate-name">
                <span>{name}</span>
                <ArrowUpRight size={19} />
              </span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
