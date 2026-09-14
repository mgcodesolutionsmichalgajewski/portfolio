import { publicAsset } from '../publicAsset';

export const screenshots = {
  docusign: [
    { src: publicAsset('docusign/01-podpis.png'), label: 'Akcja w Jira' },
    { src: publicAsset('docusign/02-lokalizacja.png'), label: 'Opcje podpisu' },
    { src: publicAsset('docusign/03-historia.png'), label: 'Historia' },
  ],
  kicia: [
    { src: publicAsset('kicia-kocia/01-start.png'), label: 'Biblioteczka' },
    { src: publicAsset('kicia-kocia/02-detail.png'), label: 'Szczegóły' },
    { src: publicAsset('kicia-kocia/03-polka.png'), label: 'Widok półki' },
    { src: publicAsset('kicia-kocia/04-lista-zyczen.png'), label: 'Lista życzeń' },
    { src: publicAsset('kicia-kocia/05-co-czytamy.png'), label: 'Czytamy' },
  ],
};
export type Gallery = 'docusign' | 'kicia';
