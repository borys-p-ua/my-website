# Skill: Security + CSP

**Docs:** [TDD §14](../docs/TECHNICAL_DESIGN.md#14-security) · [BRD §6.4](../docs/BUSINESS_REQUIREMENTS.md#64-security)

---

## Key constraints

- No API keys anywhere in the codebase or `.env` files.
- No user data is ever sent to an external server — generation runs entirely on-device.
- No third-party analytics without explicit disclosure.

## CSP delivery

GitHub Pages cannot set custom HTTP headers, so CSP is delivered via `<meta http-equiv="Content-Security-Policy">` in `index.html`.

**Baseline policy:**

```
default-src 'self';
script-src  'self' 'unsafe-inline';
style-src   'self' 'unsafe-inline';
font-src    'self';
img-src     'self' data:;
connect-src 'self';
frame-src   'none';
object-src  'none';
```

`'unsafe-inline'` is required for the theme-detection inline script and Tailwind's runtime style injection. If a new feature needs an external origin (e.g., HuggingFace Hub for model download), `connect-src` must be extended explicitly.

## Hugging Face model download

When `@huggingface/transformers` downloads the model, it fetches from `https://huggingface.co`. At M5, `connect-src` must be updated to include that origin.

## Cover letter abuse prevention

Three-layer client-side gate (no server required). Detail: [TDD §9.9](../docs/TECHNICAL_DESIGN.md#99-abuse-prevention-resolves-brd-d-3).
Short: honeypot field + session rate limit (3/session) + `navigator.webdriver` check.
