import { publicAsset } from '../publicAsset';

const screenshotData = {
  docusign: [
    { src: publicAsset('docusign/01-podpis.png'), label: 'Akcja w Jira' },
    { src: publicAsset('docusign/02-lokalizacja.png'), label: 'Opcje podpisu' },
    { src: publicAsset('docusign/03-historia.png'), label: 'Historia' },
  ],
  library: [
    { src: publicAsset('private-library/01-start-anonymized.png'), label: 'Biblioteczka' },
    { src: publicAsset('private-library/02-detail-anonymized.png'), label: 'Szczegóły' },
    { src: publicAsset('private-library/03-polka-anonymized.png'), label: 'Widok półki' },
    { src: publicAsset('private-library/04-lista-zyczen-anonymized.png'), label: 'Lista życzeń' },
    { src: publicAsset('private-library/05-co-czytamy-anonymized.png'), label: 'Czytamy' },
  ],
};

export const getScreenshots = (labels: { docusign: string[]; library: string[] }) => {
  return {
    docusign: screenshotData.docusign.map((item, index) => ({
      ...item,
      label: labels.docusign[index],
    })),
    library: screenshotData.library.map((item, index) => ({
      ...item,
      label: labels.library[index],
    })),
  };
};

export const screenshots = screenshotData;
export type Gallery = 'docusign' | 'library';
