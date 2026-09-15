import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="wrap footer">
        <a className="brand" href="#start">
          MG<span>.</span>
          <small>Code Solutions</small>
        </a>
        <span>© {new Date().getFullYear()} MG Code Solutions Michał Gajewski</span>
        <a href="#start">{t('accessibility.backToTop')} ↑</a>
      </div>
    </footer>
  );
}
