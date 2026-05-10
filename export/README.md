# Borys Polietaiev — Portfolio (Full)

Self-contained export of the canonical-PDS portfolio page.

## Files

- `Portfolio Full.html` — entry point, open this in a browser
- `styles.css` — design-system tokens + base components
- `styles-full.css` — full-page section styles
- `tweaks-panel.jsx` — floating Tweaks panel + controls
- `sections-1.jsx` — Header, Hero, About, Skills, CV data
- `sections-2.jsx` — Experience, Projects, Resume, Cover Letter, Contact, Footer
- `main-full.jsx` — App shell + Tweaks wiring

## Running locally

The `.jsx` files are transpiled in-browser by Babel (CDN). Browsers block
`<script src="…">` from `file://` URLs in some cases, so serve over HTTP:

```bash
cd export
python3 -m http.server 8000
# then open http://localhost:8000/Portfolio%20Full.html
```

Any static server works (`npx serve`, `php -S`, etc.).

## External CDNs (loaded via `<script>`/`<link>`)

- React 18.3.1 + ReactDOM (unpkg)
- Babel Standalone 7.29 (unpkg)
- Google Fonts — Inter, JetBrains Mono

If you need a fully offline build, vendor those URLs into the `export/`
folder and update the `<head>` references.

## Editing

- Tweak defaults live in `main-full.jsx` between the
  `/*EDITMODE-BEGIN*/` … `/*EDITMODE-END*/` markers.
- CV content (skills, experience, projects) lives at the top of
  `sections-1.jsx` (`CV`, `skills`, `experience`, `projects`).
