/* global React, ReactDOM, Header, Hero, About, Skills, Experience, Projects, Resume, CoverLetter, Contact, Footer,
          TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle, useTweaks */
const { useEffect, useState } = React;

const TWEAK_DEFAULTS_FULL = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "sky",
  "showDecoration": true
}/*EDITMODE-END*/;

const ACCENTS_FULL = [
  { value: "sky",     label: "Sky",     color: "#38BDF8" },
  { value: "indigo",  label: "Indigo",  color: "#818CF8" },
  { value: "emerald", label: "Emerald", color: "#34D399" },
  { value: "amber",   label: "Amber",   color: "#FBBF24" },
  { value: "rose",    label: "Rose",    color: "#FB7185" },
];

function applyTokensFull(t) {
  const root = document.documentElement;
  root.setAttribute("data-theme", t.theme);
  root.setAttribute("data-accent", t.accent);
  root.setAttribute("data-show-decoration", String(t.showDecoration));
  // Also apply to the .pf-full element for any selectors scoped that way.
  document.querySelectorAll(".pf-full").forEach(el => {
    el.setAttribute("data-theme", t.theme);
    el.setAttribute("data-accent", t.accent);
    el.setAttribute("data-show-decoration", String(t.showDecoration));
  });
}

function AppFull() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS_FULL);
  const [active, setActive] = useState("home");

  useEffect(() => { applyTokensFull(t); }, [t]);

  // Active section tracking
  useEffect(() => {
    const ids = ["home", "about", "skills", "experience", "projects", "resume", "cover-letter", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div className="pf-full" data-theme={t.theme} data-accent={t.accent} data-show-decoration={String(t.showDecoration)}>
        <Header active={active} theme={t.theme} onToggleTheme={() => setTweak("theme", t.theme === "dark" ? "light" : "dark")}/>
        <main className="pf-main">
          <Hero/>
          <About/>
          <Skills/>
          <Experience/>
          <Projects/>
          <Resume/>
          <CoverLetter/>
          <Contact/>
        </main>
        <Footer/>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Theme">
          <TweakRadio
            label="Mode"
            value={t.theme}
            onChange={v => setTweak("theme", v)}
            options={[{ value: "dark", label: "Dark" }, { value: "light", label: "Light" }]}
          />
          <TweakColor
            label="Accent"
            value={t.accent}
            onChange={v => setTweak("accent", v)}
            options={ACCENTS_FULL.map(a => ({ value: a.value, label: a.label, color: a.color }))}
          />
        </TweakSection>
        <TweakSection title="Decoration">
          <TweakToggle
            label="Background dot grid"
            value={t.showDecoration}
            onChange={v => setTweak("showDecoration", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AppFull/>);
