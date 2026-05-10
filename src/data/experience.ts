import type { ExperienceEntry } from '../types/data'

export const experience: ExperienceEntry[] = [
  {
    role: 'Principal Engineer · Tech Lead · Engineering Manager',
    company: 'Expedition Software',
    domain: '(formerly Regiondo · b2b booking)',
    startDate: '2023-11',
    stack: [
      'Node.js',
      'TypeScript',
      'NestJS',
      'PHP 7-8',
      'Symfony',
      'React',
      'AWS',
      'Kubernetes',
      'PostgreSQL',
    ],
    bullets: [
      'Lead three teams across five workstreams; substitute EM/PM for several streams.',
      'Solution design & architecture review across all engineering streams.',
      'Cross-timezone collaboration with offices in CA, AU, and EU.',
      'Engineering management and senior recruiting.',
    ],
    achievement:
      'Shipped three large streams — SSO, Ticketing, and Booking Management — and established a design-first review culture across the org.',
  },
  {
    role: 'Senior Software Engineer',
    company: 'Regiondo',
    domain: '(b2b booking software)',
    startDate: '2022-03',
    endDate: '2023-11',
    stack: ['PHP 7-8', 'Symfony', 'Node.js', 'NestJS', 'React', 'AWS', 'Kubernetes', 'PostgreSQL'],
    bullets: [
      'Building cloud-native microservices to replace the legacy platform.',
      'Event-sourcing for the new checkout pipeline.',
      'Mentoring the team on Symfony patterns.',
    ],
    achievement:
      'Built the checkout testing tool used during the platform migration; picked up React in production along the way.',
  },
  {
    role: 'Project Team Lead · Engineering Manager',
    company: 'NDA company',
    domain: '(gambling)',
    startDate: '2021-11',
    endDate: '2022-03',
    stack: ['PHP 7', 'Symfony', 'MySQL', 'Redis', 'RabbitMQ', 'GCP', 'Docker', 'Kubernetes'],
    bullets: [
      'Led a 17-person cross-functional team (front-end, back-end, QA).',
      'Project technical-debt and architecture cleanup.',
    ],
    achievement:
      'Retained two team leads who were preparing to leave the company through a difficult quarter.',
  },
  {
    role: 'Backend Core Team Lead',
    company: 'Evolpay Entertainment',
    startDate: '2020-06',
    endDate: '2021-11',
    stack: [
      'PHP 7',
      'Swoole',
      'Node.js',
      'Symfony',
      'MySQL',
      'Redis',
      'RabbitMQ',
      'AWS',
      'Kubernetes',
    ],
    bullets: [
      'Legacy monolith maintenance alongside greenfield service work.',
      'Hired and grew a team of four engineers.',
    ],
    achievement:
      'Designed and deployed 10 cloud-native services (incl. two Node.js) with 100% test coverage and full technical documentation.',
  },
  {
    role: 'Senior Software Engineer',
    company: 'Witty Tech',
    domain: '(fintech)',
    startDate: '2020-06',
    endDate: '2021-11',
    stack: ['PHP 7', 'Java', 'Symfony', 'Spring', 'MySQL', 'Docker'],
    bullets: [
      'Technical review and C4-model documentation of inherited services.',
      'Designed and implemented an authentication service with Face ID identification.',
    ],
  },
  {
    role: 'Software Engineer · Team Lead',
    company: 'Aurora Global',
    domain: '(video streaming · VOD · social)',
    startDate: '2012-09',
    endDate: '2020-04',
    stack: ['PHP 5-7', 'Yii', 'MySQL', 'Memcache', 'Redis', 'RabbitMQ', 'Elasticsearch'],
    bullets: [
      'Lead on a video-streaming interactive platform — task analysis, decomposition, performance.',
      'Cross-functional team management for a 17-person front/back-end/QA org.',
      'Worked on a VOD platform and supported a legacy dating-network monolith.',
    ],
    achievement:
      'Split full-stack into front-end & back-end teams, refactored the project end-to-end, and brought average load time from 2000ms+ down to ~600ms. Built A/B testing tooling and culture.',
  },
  {
    role: 'System Administrator · Software Engineer',
    company: 'UMH Radiogroup',
    startDate: '2009-06',
    endDate: '2012-09',
    stack: [],
    bullets: [],
  },
  {
    role: 'Technical Engineer',
    company: 'Sedna S',
    startDate: '2008-08',
    endDate: '2009-06',
    stack: [],
    bullets: [],
  },
]
