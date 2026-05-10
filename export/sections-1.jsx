/* global React */
const { useState } = React;

/* ===== Icons ===== */
const I = {
  Download: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Arrow: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Sun: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
  Moon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  Map: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Clock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Briefcase: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  Star: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  External: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  Github: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.4-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.3.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>,
  Linkedin: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.42v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45z"/></svg>,
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  GithubLg: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.4-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.3.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>,
  LinkedinLg: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.42v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45z"/></svg>,
  Sparkle: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5z"/></svg>,
  Filter: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
};

/* ===== CV Data (from resume) ===== */
const CV = {
  name: "Borys Polietaiev",
  short: "Borys",
  title: "Principal Engineer · Tech Lead · Engineering Manager",
  email: "compparty1@gmail.com",
  phone: "+44 7441 346 294",
  linkedin: "linkedin.com/in/poletayev",
  github: "github.com/borys-p-ua",
  location: "Bath, Somerset · United Kingdom",
  yearsTotal: 13,
};

const skills = [
  { cat: "Languages", years: "5y · 10y · 13y", items: ["TypeScript", "Node.js", "JavaScript", "PHP", "Go (learning)"] },
  { cat: "Frameworks", years: "since 2014", items: ["NestJS", "Symfony", "Yii", "React", "Vite"] },
  { cat: "Databases", years: "7+ years", items: ["PostgreSQL", "MySQL", "MongoDB", "Elasticsearch", "Redis"] },
  { cat: "Messaging", years: "events & streams", items: ["Kafka", "RabbitMQ", "WebSockets"] },
  { cat: "Cloud & Infra", years: "5+ years", items: ["AWS", "GCP", "Kubernetes", "Docker"] },
  { cat: "Observability", years: "8+ years", items: ["Datadog", "Grafana", "Prometheus", "OpenTelemetry", "StatsD"] },
  { cat: "AI", years: "2 years", items: ["AWS Bedrock", "Cursor", "LLM-driven features"] },
  { cat: "Practices", years: "always", items: ["SOLID", "DDD", "Solution Design", "API Design", "Architecture Patterns"] },
  { cat: "Domains", years: "across roles", items: ["Bookings", "Payments", "E-commerce", "Video Streaming", "CMS", "Marketing"] },
];

const experience = [
  {
    role: "Principal Engineer · Tech Lead · Engineering Manager",
    co: "Expedition Software", domain: "(formerly Regiondo · b2b booking)",
    start: "Nov 2023", end: "Present", span: "~2.5 years",
    stack: ["Node.js", "TypeScript", "NestJS", "PHP 7-8", "Symfony", "React", "AWS", "Kubernetes", "PostgreSQL"],
    bullets: [
      "Lead three teams across five workstreams; substitute EM/PM for several streams.",
      "Solution design & architecture review across all engineering streams.",
      "Cross-timezone collaboration with offices in CA, AU, and EU.",
      "Engineering management and senior recruiting.",
    ],
    achievement: "Shipped three large streams — SSO, Ticketing, and Booking Management — and established a design-first review culture across the org.",
  },
  {
    role: "Senior Software Engineer",
    co: "Regiondo", domain: "(b2b booking software)",
    start: "Mar 2022", end: "Nov 2023", span: "~1.5 years",
    stack: ["PHP 7-8", "Symfony", "Node.js", "NestJS", "React", "AWS", "Kubernetes", "PostgreSQL"],
    bullets: [
      "Building cloud-native microservices to replace the legacy platform.",
      "Event-sourcing for the new checkout pipeline.",
      "Mentoring the team on Symfony patterns.",
    ],
    achievement: "Built the checkout testing tool used during the platform migration; picked up React in production along the way.",
  },
  {
    role: "Project Team Lead · Engineering Manager",
    co: "NDA company", domain: "(gambling)",
    start: "Nov 2021", end: "Mar 2022", span: "5 months",
    stack: ["PHP 7", "Symfony", "MySQL", "Redis", "RabbitMQ", "GCP", "Docker", "Kubernetes"],
    bullets: [
      "Led a 17-person cross-functional team (front-end, back-end, QA).",
      "Project technical-debt and architecture cleanup.",
    ],
    achievement: "Retained two team leads who were preparing to leave the company through a difficult quarter.",
  },
  {
    role: "Backend Core Team Lead",
    co: "Evolpay Entertainment",
    start: "Jun 2020", end: "Nov 2021", span: "1.5 years",
    stack: ["PHP 7", "Swoole", "Node.js", "Symfony", "MySQL", "Redis", "RabbitMQ", "AWS", "Kubernetes"],
    bullets: [
      "Legacy monolith maintenance alongside greenfield service work.",
      "Hired and grew a team of four engineers.",
    ],
    achievement: "Designed and deployed 10 cloud-native services (incl. two Node.js) with 100% test coverage and full technical documentation.",
  },
  {
    role: "Senior Software Engineer",
    co: "Witty Tech", domain: "(fintech)",
    start: "Jun 2020", end: "Nov 2021", span: "1.5 years",
    stack: ["PHP 7", "Java", "Symfony", "Spring", "MySQL", "Docker"],
    bullets: [
      "Technical review and C4-model documentation of inherited services.",
      "Designed and implemented an authentication service with Face ID identification.",
    ],
  },
  {
    role: "Software Engineer · Team Lead",
    co: "Aurora Global", domain: "(video streaming · VOD · social)",
    start: "Sep 2012", end: "Apr 2020", span: "~7 years",
    stack: ["PHP 5-7", "Yii", "MySQL", "Memcache", "Redis", "RabbitMQ", "Elasticsearch"],
    bullets: [
      "Lead on a video-streaming interactive platform — task analysis, decomposition, performance.",
      "Cross-functional team management for a 17-person front/back-end/QA org.",
      "Worked on a VOD platform and supported a legacy dating-network monolith.",
    ],
    achievement: "Split full-stack into front-end & back-end teams, refactored the project end-to-end, and brought average load time from 2000ms+ down to ~600ms. Built A/B testing tooling and culture.",
  },
  {
    role: "System Administrator · Software Engineer",
    co: "UMH Radiogroup",
    start: "Jun 2009", end: "Sep 2012", span: "~3 years",
    stack: [],
    bullets: [],
  },
  {
    role: "Technical Engineer",
    co: "Sedna S",
    start: "Aug 2008", end: "Jun 2009", span: "~1 year",
    stack: [],
    bullets: [],
  },
];

const projects = [
  {
    num: "01",
    title: "Booking Suite — SSO, Ticketing & Booking Management",
    company: "Expedition Software",
    desc: "Three concurrent workstreams behind a unified b2b booking suite. Designed and shepherded the cross-team architecture from kickoff to GA, with design-first reviews driving the rollout.",
    tags: ["NestJS", "TypeScript", "PostgreSQL", "Kubernetes", "Architecture"],
    status: "Shipped · 2024-25",
  },
  {
    num: "02",
    title: "Cloud-Native Microservices Platform",
    company: "Regiondo · Evolpay",
    desc: "Ten event-sourced services with 100% test coverage replacing a monolith. Documented end-to-end with C4 diagrams. The replacement platform now runs alongside the legacy stack during a phased migration.",
    tags: ["Symfony", "Node.js", "Event Sourcing", "AWS", "RabbitMQ"],
    status: "Shipped · 2021-23",
  },
  {
    num: "03",
    title: "Streaming Platform Performance Overhaul",
    company: "Aurora Global",
    desc: "Brought the average load time of an interactive video-streaming product from 2000ms+ down to ~600ms through profiling, query rewrites, and caching strategy. Split the full-stack team into front-end & back-end groups.",
    tags: ["PHP", "Yii", "Elasticsearch", "Redis", "Performance"],
    status: "Shipped · 2017",
  },
  {
    num: "04",
    title: "Face ID Authentication Service",
    company: "Witty Tech",
    desc: "Greenfield biometric authentication service backing a fintech onboarding flow. Designed for low-latency mobile clients with full audit logging and a Spring + Symfony interop layer.",
    tags: ["Symfony", "Spring", "Biometrics", "Auth"],
    status: "Shipped · 2021",
  },
  {
    num: "05",
    title: "Checkout Testing Toolkit",
    company: "Regiondo",
    desc: "Internal tool for replaying real production checkout traffic through the new event-sourced pipeline before cutover. First React project in production at Regiondo.",
    tags: ["React", "TypeScript", "Replay", "Testing"],
    status: "Shipped · 2023",
  },
  {
    num: "06",
    title: "Personal Site (this one)",
    company: "borys-p-ua/my-website",
    desc: "Single-page React 19 + Vite + Tailwind v4 site with on-device LLM cover-letter generation, client-side filtered PDF resume export, and a strict design-system codebase. Built in public.",
    tags: ["React 19", "Vite", "Tailwind v4", "WebGPU", "pdf-lib"],
    status: "In progress · 2026",
  },
];

/* ===== Header ===== */
function Header({ active = "home", theme, onToggleTheme }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "resume", label: "Resume" },
    { id: "cover-letter", label: "Cover letter" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <header className="pf-header scrolled">
      <div className="pf-logo"><span className="pf-logo-mark">B</span><span>borys-p.dev</span></div>
      <nav className="pf-nav">
        {links.map(l => <a key={l.id} href={`#${l.id}`} className={`pf-nav-link ${l.id === active ? "active" : ""}`}>{l.label}</a>)}
      </nav>
      <div className="pf-nav-trail">
        <button className="pf-icon-btn" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <I.Sun/> : <I.Moon/>}
        </button>
        <a href="#resume" className="pf-btn pf-btn-primary" style={{padding: "8px 16px", fontSize: 13}}>
          Résumé <I.Download/>
        </a>
      </div>
    </header>
  );
}

/* ===== Hero ===== */
function Hero() {
  return (
    <section id="home" className="pf-hero" data-screen-label="01 Hero">
      <div className="pf-dotgrid"></div>
      <div className="pf-container">
        <div>
          <div className="pf-hero-eyebrow">Principal Engineer · Tech Lead · Engineering Manager</div>
          <h1 className="pf-hero-name">{CV.name}</h1>
          <p className="pf-hero-headline">13+ years shipping backend systems, web platforms & teams that move.</p>
          <p className="pf-hero-summary">Currently leading three teams and five workstreams at Expedition Software (formerly Regiondo). Background spans booking platforms, fintech, video streaming, and AI-driven product work — across Node, TypeScript, PHP/Symfony, and a growing pile of Go.</p>
          <div className="pf-hero-cta">
            <a href="#resume" className="pf-btn pf-btn-primary"><I.Download/> Download résumé</a>
            <a href="#projects" className="pf-btn pf-btn-secondary">See my work <I.Arrow/></a>
          </div>
          <div className="pf-hero-meta">
            <div>Based in<strong>Bath, UK · GMT</strong></div>
            <div>Experience<strong>13+ years</strong></div>
            <div>Currently<strong>Principal @ Expedition</strong></div>
          </div>
        </div>
        <div className="pf-hero-photo pf-img-placeholder">portrait · 4:5 · webp</div>
      </div>
    </section>
  );
}

/* ===== About ===== */
function About() {
  return (
    <section id="about" className="pf-section alt" data-screen-label="02 About">
      <div className="pf-container">
        <div className="pf-section-head">
          <div className="left">
            <div className="pf-section-eyebrow">02 — About</div>
            <h2 className="pf-section-title">A career split evenly between writing software and growing the people who write it.</h2>
          </div>
        </div>
        <div className="pf-about-grid">
          <div className="pf-about-photo pf-img-placeholder">avatar · 1:1</div>
          <div className="pf-about-bio">
            <p>I've spent thirteen years building software in earnest — most of it backend, much of it leading teams, and a good chunk of it deep in solution design before code was written.</p>
            <p>Right now I'm a Principal Engineer at Expedition Software, formerly Regiondo, where I lead three engineering teams and five workstreams across booking, ticketing, and SSO. Before that I shipped microservices at Evolpay, a Face-ID auth service at Witty Tech, and spent seven years scaling an interactive video streaming platform at Aurora Global — including a refactor that cut average load time from 2 seconds to 600ms.</p>
            <p>I care about clean architecture, design-first reviews, and engineers who finish things. I'm actively learning Go, AWS Bedrock, and modern AI tooling because the next decade of software won't be written quite the same way as the last.</p>
            <div className="pf-about-facts">
              <div className="pf-fact"><I.Map/><span>Based in <strong>Bath, UK</strong></span></div>
              <div className="pf-fact"><I.Briefcase/><span><strong>Principal Engineer</strong> at Expedition</span></div>
              <div className="pf-fact"><I.Clock/><span><strong>13+ years</strong> in software</span></div>
              <div className="pf-fact"><I.Star/><span>Bachelor's, <strong>National Aviation University</strong></span></div>
              <div className="pf-fact"><I.Check/><span>Open to <strong>remote / hybrid</strong> roles</span></div>
              <div className="pf-fact"><I.Sparkle/><span>Currently learning <strong>Go</strong> & on-device AI</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Skills ===== */
function Skills() {
  const total = skills.reduce((s, c) => s + c.items.length, 0);
  const [selected, setSelected] = useState(() => new Set([
    "TypeScript", "Node.js", "PHP", "NestJS", "Symfony", "PostgreSQL", "Kubernetes", "AWS", "Solution Design", "Architecture Patterns"
  ]));
  const toggle = (s) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s); else next.add(s);
      return next;
    });
  };
  return (
    <section id="skills" className="pf-section" data-screen-label="03 Skills">
      <div className="pf-container">
        <div className="pf-section-head">
          <div className="left">
            <div className="pf-section-eyebrow">03 — Skills</div>
            <h2 className="pf-section-title">The stack I've shipped with — and the practices behind it.</h2>
            <p className="pf-section-lede">Tap any tag to flag it; the selected set drives the tailored résumé and cover-letter generation below.</p>
          </div>
        </div>
        <div className="pf-skills-toolbar">
          <div className="pf-skills-counter"><strong>{selected.size}</strong> of {total} selected</div>
          <div style={{display: "flex", gap: 8}}>
            <button className="pf-btn pf-btn-ghost" onClick={() => setSelected(new Set())}>Clear all</button>
            <button className="pf-btn pf-btn-ghost" onClick={() => setSelected(new Set(skills.flatMap(c => c.items)))}>Select all</button>
          </div>
        </div>
        <div className="pf-skills-grid">
          {skills.map(c => (
            <div key={c.cat} className="pf-skill-cat">
              <h3 className="pf-skill-cat-title">{c.cat}</h3>
              <div className="pf-skill-cat-meta">{c.years}</div>
              <div className="pf-skill-tags">
                {c.items.map(s => (
                  <span key={s} className={`pf-tag interactive ${selected.has(s) ? "selected" : ""}`} onClick={() => toggle(s)}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { I, CV, skills, experience, projects, Header, Hero, About, Skills });
