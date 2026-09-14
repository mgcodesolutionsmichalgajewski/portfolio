const logo = (name: string) => `/icons/${name}.svg`;
export const skillGroups = [
  {
    name: 'Atlassian & Forge',
    description: 'Aplikacje i rozszerzenia dla ekosystemu Atlassian.',
    items: [
      { name: 'Atlassian Forge', icon: logo('atlassian') },
      { name: 'Jira', icon: logo('jira') },
      { name: 'Jira Service Management', icon: logo('jira') },
      { name: 'Confluence', icon: logo('confluence') },
    ],
  },
  {
    name: 'Frontend',
    description: 'Interfejsy webowe i aplikacje mobilne.',
    items: [
      { name: 'React', icon: logo('react') },
      { name: 'Redux', icon: logo('redux') },
      { name: 'JavaScript', icon: logo('javascript') },
      { name: 'TypeScript', icon: logo('typescript') },
    ],
  },
  {
    name: 'Backend',
    description: 'Logika aplikacji, integracje i API.',
    items: [
      { name: 'Java', icon: logo('java') },
      { name: 'Spring Boot', icon: logo('spring') },
      { name: 'Hibernate', icon: logo('hibernate') },
      { name: 'Node.js', icon: logo('nodejs') },
    ],
  },
  {
    name: 'Dane & chmura',
    description: 'Bazy danych i środowiska aplikacyjne.',
    items: [
      { name: 'AWS', icon: logo('amazonwebservices') },
      { name: 'PostgreSQL', icon: logo('postgresql') },
      { name: 'Terraform', icon: logo('terraform') },
    ],
  },
];
