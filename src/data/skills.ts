import type { SkillCategory } from '../types/data'

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    years: '5y · 10y · 13y',
    items: ['TypeScript', 'Node.js', 'JavaScript', 'PHP', 'Go (learning)'],
  },
  {
    category: 'Frameworks',
    years: 'since 2014',
    items: ['NestJS', 'Symfony', 'Yii', 'React', 'Vite'],
  },
  {
    category: 'Databases',
    years: '7+ years',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Elasticsearch', 'Redis'],
  },
  {
    category: 'Messaging',
    years: 'events & streams',
    items: ['Kafka', 'RabbitMQ', 'WebSockets'],
  },
  {
    category: 'Cloud & Infra',
    years: '5+ years',
    items: ['AWS', 'GCP', 'Kubernetes', 'Docker'],
  },
  {
    category: 'Observability',
    years: '8+ years',
    items: ['Datadog', 'Grafana', 'Prometheus', 'OpenTelemetry', 'StatsD'],
  },
  {
    category: 'AI',
    years: '2 years',
    items: ['AWS Bedrock', 'Cursor', 'LLM-driven features'],
  },
  {
    category: 'Practices',
    years: 'always',
    items: ['SOLID', 'DDD', 'Solution Design', 'API Design', 'Architecture Patterns'],
  },
  {
    category: 'Domains',
    years: 'across roles',
    items: ['Bookings', 'Payments', 'E-commerce', 'Video Streaming', 'CMS', 'Marketing'],
  },
]
