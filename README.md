# My Website

Personal website built with React, TypeScript, Vite, and Tailwind CSS. Deployed to GitHub Pages via GitHub Actions.

**Live:** https://borys-p-ua.github.io/my-website/  
**Repo:** https://github.com/borys-p-ua/my-website

---

## Local Development

**Prerequisites:** Node.js 22+

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev
```

### Other commands

```bash
npm run build        # Production build → dist/
npm run preview      # Preview the production build locally
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
npm run test:coverage  # Run tests with coverage report
```

---

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/           # Page-level components
├── App.tsx          # Root component
├── main.tsx         # Entry point
└── index.css        # Global styles (Tailwind import)
```

---

## Docs

- [Project Foundation — Solution Design](docs/PROJECT_FOUNDATION_SOLUTION_DESIGN.md)
