import type { SkillCategory } from '../types/data'

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    type: 'language',
    years: '5y · 10y · 13y',
    items: ['TypeScript', 'Node.js', 'JavaScript', 'PHP', 'Go (learning)'],
  },
  {
    category: 'Frameworks',
    type: 'technical',
    years: 'since 2014',
    items: ['NestJS', 'Symfony', 'Yii', 'React', 'Vite'],
  },
  {
    category: 'Databases',
    type: 'technical',
    years: '7+ years',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Elasticsearch', 'Redis'],
  },
  {
    category: 'Messaging',
    type: 'technical',
    years: 'events & streams',
    items: ['Kafka', 'RabbitMQ', 'WebSockets'],
  },
  {
    category: 'Cloud & Infra',
    type: 'technical',
    years: '5+ years',
    items: ['AWS', 'GCP', 'Kubernetes', 'Docker'],
  },
  {
    category: 'Observability',
    type: 'technical',
    years: '8+ years',
    items: ['Datadog', 'Grafana', 'Prometheus', 'OpenTelemetry', 'StatsD'],
  },
  {
    category: 'AI',
    type: 'technical',
    years: '2 years',
    items: ['AWS Bedrock', 'Cursor', 'LLM-driven features'],
  },
  {
    category: 'Practices',
    type: 'technical',
    years: 'always',
    items: ['SOLID', 'DDD', 'Solution Design', 'API Design', 'Architecture Patterns'],
  },
  {
    category: 'Domains',
    type: 'domain',
    years: 'across roles',
    items: ['Bookings', 'Payments', 'E-commerce', 'Video Streaming', 'CMS', 'Marketing'],
  },
]
