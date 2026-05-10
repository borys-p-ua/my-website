/* global React, experience, projects, skills, I, CV */
const { useState, useMemo } = React;

/* ===== Experience ===== */
function Experience() {
  return (
    <section id="experience" className="pf-section alt" data-screen-label="04 Experience">
      <div className="pf-container">
        <div className="pf-section-head">
          <div className="left">
            <div className="pf-section-eyebrow">04 — Experience</div>
            <h2 className="pf-section-title">A timeline of roles, teams led, and platforms shipped.</h2>
            <p className="pf-section-lede">From technical engineer in 2008 to Principal Engineer today — eight roles, six companies, three industries.</p>
          </div>
          <div style={{display: "flex", gap: 12}}>
            <span className="pf-tag">{experience.length} roles</span>
            <span className="pf-tag solid">13+ years</span>
          </div>
        </div>
        <div className="pf-timeline">
          {experience.map((j, i) => (
            <article key={i} className="pf-job">
              <div className="pf-job-head">
                <div>
                  <h3 className="pf-job-role">{j.role}</h3>
                  <div className="pf-job-co">{j.co}{j.domain && <span className="domain">{j.domain}</span>}</div>
                </div>
                <div className="pf-job-dates">
                  {j.start} → {j.end}
                  <span className="span">{j.span}</span>
                </div>
              </div>
              {j.stack.length > 0 && (
                <div className="pf-job-stack">
                  {j.stack.map(s => <span key={s} className="pf-tag">{s}</span>)}
                </div>
              )}
              {j.bullets.length > 0 && (
                <ul className="pf-job-bullets">
                  {j.bullets.map((b, k) => <li key={k}>{b}</li>)}
                </ul>
              )}
              {j.achievement && (
                <div className="pf-job-ach">
                  <I.Star/>
                  <div>
                    <strong>Key achievement</strong>
                    {j.achievement}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Projects ===== */
function Projects() {
  return (
    <section id="projects" className="pf-section" data-screen-label="05 Projects">
      <div className="pf-container">
        <div className="pf-section-head">
          <div className="left">
            <div className="pf-section-eyebrow">05 — Selected work</div>
            <h2 className="pf-section-title">A handful of projects I'm proud of.</h2>
            <p className="pf-section-lede">A condensed view of the work behind the experience timeline — the platforms, services, and tools I led or shipped.</p>
          </div>
        </div>
        <div className="pf-projects">
          {projects.map(p => (
            <article key={p.num} className="pf-project">
              <div className="pf-project-head">
                <span className="pf-project-num">{p.num} / {String(projects.length).padStart(2, "0")}</span>
                <span className={`pf-project-status ${p.status.includes("In progress") ? "" : "archived"}`}>{p.status}</span>
              </div>
              <h3 className="pf-project-title">{p.title}</h3>
              <div style={{fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-muted)", marginBottom: 12}}>{p.company}</div>
              <p className="pf-project-desc">{p.desc}</p>
              <div className="pf-project-tags">
                {p.tags.map(t => <span key={t} className="pf-tag">{t}</span>)}
              </div>
              <div className="pf-project-links">
                <a className="pf-project-link" href="#"><I.External/> Case study</a>
                <a className="pf-project-link" href="#"><I.Github/> Code</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Resume ===== */
function Resume() {
  const [jd, setJd] = useState("");
  const [picked, setPicked] = useState(() => new Set(["TypeScript", "Node.js", "NestJS", "PostgreSQL", "AWS", "Kubernetes", "Solution Design"]));
  const allSkills = useMemo(() => skills.flatMap(c => c.items), []);
  const total = allSkills.length;
  const toggle = (s) => {
    setPicked(prev => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s); else next.add(s);
      return next;
    });
  };
  return (
    <section id="resume" className="pf-section alt" data-screen-label="06 Resume">
      <div className="pf-container">
        <div className="pf-section-head">
          <div className="left">
            <div className="pf-section-eyebrow">06 — Tailored résumé</div>
            <h2 className="pf-section-title">Build a résumé tuned to the role.</h2>
            <p className="pf-section-lede">Pick the skills you want emphasised and paste the job description — the generator filters experience bullets and stack tags into a focused single-page PDF.</p>
          </div>
        </div>
        <div className="pf-resume-grid">
          <div className="pf-resume-filter">
            <h3>Filter skills to highlight</h3>
            <div style={{fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 20}}>Selected skills surface first in the experience bullets and skill summary on the generated PDF.</div>
            <div className="pf-resume-cats">
              {skills.map(c => (
                <div key={c.cat}>
                  <div className="pf-resume-cat-title">{c.cat}</div>
                  <div className="pf-skill-tags">
                    {c.items.map(s => (
                      <span key={s} className={`pf-tag interactive ${picked.has(s) ? "selected" : ""}`} onClick={() => toggle(s)}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="pf-resume-jd">
              <div className="pf-input-label">Job description <span className="opt">Optional · improves filtering</span></div>
              <textarea className="pf-textarea" placeholder="Paste the JD or a few key responsibilities here..." value={jd} onChange={e => setJd(e.target.value)}/>
              <div className="pf-counter">{jd.length} / 4000 chars</div>
            </div>
          </div>
          <aside className="pf-resume-actions">
            <h3>Generate PDF</h3>
            <p className="sub">Filtered client-side, exported via pdf-lib. No server round trip.</p>
            <div className="pf-resume-summary">
              <div className="row"><span>Skills selected</span><strong>{picked.size} / {total}</strong></div>
              <div className="row"><span>Experience entries</span><strong>{experience.length}</strong></div>
              <div className="row"><span>Projects</span><strong>{projects.length}</strong></div>
              <div className="row"><span>JD context</span><strong>{jd.length > 0 ? `${jd.split(/\s+/).filter(Boolean).length} words` : "—"}</strong></div>
            </div>
            <button className="pf-btn pf-btn-primary"><I.Download/> Download tailored PDF</button>
            <button className="pf-btn pf-btn-secondary"><I.External/> Preview in browser</button>
            <div className="pf-divider"></div>
            <div style={{display: "flex", gap: 8, fontSize: 12, color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", alignItems: "center"}}>
              <I.Filter/> Default templates
            </div>
            <div style={{display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap"}}>
              <span className="pf-tag selected">Engineering Manager</span>
              <span className="pf-tag">Backend Lead</span>
              <span className="pf-tag">Principal Eng.</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ===== Cover Letter ===== */
function CoverLetter() {
  const [company, setCompany] = useState("Stripe");
  const [role, setRole] = useState("Staff Backend Engineer");
  const [hiring, setHiring] = useState("Hiring team");
  const [tone, setTone] = useState("Confident");

  const tones = ["Confident", "Warm", "Concise", "Story-led"];

  const body = (
    <>
      <p className="opener">Dear {hiring},</p>
      <p>
        I'm writing to express my interest in the <em>{role}</em> role at {company}. After thirteen years building and leading backend teams — most recently as Principal Engineer at Expedition Software, where I run three engineering streams across booking, ticketing and SSO — I'm looking for the next environment where rigorous design and pragmatic delivery sit side by side. {company}'s reputation for both is what drew me in.
      </p>
      <p>
        My career has split fairly evenly between writing software and growing the people who write it. At Aurora Global I led a 17-person cross-functional team and brought a video-streaming platform's average load time from 2 seconds to 600 milliseconds through profiling, query rewrites and a measured caching strategy. At Evolpay I designed and shipped ten cloud-native services with full test coverage and C4-level documentation. The throughline is the same: clean architecture, design-first reviews, and engineers who finish things.
      </p>
      <p>
        I'd be glad to talk through how that experience maps to {company}'s priorities. Either way, thank you for considering my application.
      </p>
      <p className="signoff">
        Warm regards,
        <span className="pf-paper-sig">Borys Polietaiev</span>
      </p>
    </>
  );

  return (
    <section id="cover-letter" className="pf-section" data-screen-label="07 Cover letter">
      <div className="pf-container">
        <div className="pf-section-head">
          <div className="left">
            <div className="pf-section-eyebrow">07 — Cover letter</div>
            <h2 className="pf-section-title">A cover letter, drafted on demand.</h2>
            <p className="pf-section-lede">Type the role and a few notes — generation runs on-device with WebGPU and renders into the document on the right.</p>
          </div>
        </div>
        <div className="pf-cl-grid">
          <div className="pf-cl-form">
            <h3>Address & tone</h3>
            <p className="helper">These fields populate the letter's salutation and the opening paragraph.</p>
            <div className="pf-field">
              <div className="pf-input-label">Company</div>
              <input className="pf-input" value={company} onChange={e => setCompany(e.target.value)}/>
            </div>
            <div className="pf-field">
              <div className="pf-input-label">Role you're applying for</div>
              <input className="pf-input" value={role} onChange={e => setRole(e.target.value)}/>
            </div>
            <div className="pf-field">
              <div className="pf-input-label">Salutation <span className="opt">Optional</span></div>
              <input className="pf-input" value={hiring} onChange={e => setHiring(e.target.value)} placeholder="Hiring team"/>
            </div>
            <div className="pf-field">
              <div className="pf-input-label">Tone</div>
              <div style={{display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4}}>
                {tones.map(t => (
                  <span key={t} className={`pf-tag interactive ${tone === t ? "selected" : ""}`} onClick={() => setTone(t)}>{t}</span>
                ))}
              </div>
            </div>
            <div className="pf-field">
              <div className="pf-input-label">Notes for the AI <span className="opt">Optional</span></div>
              <textarea className="pf-textarea" placeholder="e.g. emphasize streaming experience, mention London"/>
            </div>
            <div className="pf-cl-actions">
              <button className="pf-btn pf-btn-ghost">Reset</button>
              <button className="pf-btn pf-btn-primary"><I.Sparkle/> Generate letter</button>
            </div>
          </div>
          <div className="pf-cl-preview">
            <div className="pf-paper">
              <div className="pf-paper-corner">Draft · 02</div>
              <h3 className="pf-paper-letterhead">Borys Polietaiev</h3>
              <div className="pf-paper-letterhead-sub">Principal Engineer · Bath, UK · compparty1@gmail.com</div>
              <div className="pf-paper-meta">{new Date().toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric"})} &nbsp;·&nbsp; To: {company}</div>
              {body}
              <div className="pf-paper-stamp">Generated<br/>on-device</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Contact ===== */
function Contact() {
  return (
    <section id="contact" className="pf-section alt" data-screen-label="08 Contact">
      <div className="pf-container">
        <div className="pf-section-head">
          <div className="left">
            <div className="pf-section-eyebrow">08 — Contact</div>
            <h2 className="pf-section-title">Let's talk.</h2>
            <p className="pf-section-lede">Open to Principal / Staff backend & engineering management roles in the UK and remote-EU.</p>
          </div>
        </div>
        <div className="pf-contact-grid">
          <a className="pf-contact-card" href="mailto:compparty1@gmail.com">
            <div className="icon"><I.Mail/></div>
            <span className="label">Email</span>
            <span className="value">compparty1@gmail.com</span>
          </a>
          <a className="pf-contact-card" href="https://linkedin.com/in/poletayev" target="_blank" rel="noreferrer">
            <div className="icon"><I.LinkedinLg/></div>
            <span className="label">LinkedIn</span>
            <span className="value">linkedin.com/in/poletayev</span>
          </a>
          <a className="pf-contact-card" href="https://github.com/borys-p-ua" target="_blank" rel="noreferrer">
            <div className="icon"><I.GithubLg/></div>
            <span className="label">GitHub</span>
            <span className="value">github.com/borys-p-ua</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ===== Footer ===== */
function Footer() {
  return (
    <footer className="pf-footer">
      <div>© 2026 Borys Polietaiev · Bath, UK</div>
      <div className="pf-footer-links">
        <a href="https://github.com/borys-p-ua/my-website">borys-p-ua/my-website</a>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}

Object.assign(window, { Experience, Projects, Resume, CoverLetter, Contact, Footer });
