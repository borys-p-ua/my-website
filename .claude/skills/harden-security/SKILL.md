---
name: harden-security
description: CSP policy rules, no-API-key invariant, and when to extend connect-src. Auto-invoked when modifying security headers, adding network origins, or reviewing data flow for privacy compliance.
when_to_use: Editing the Content-Security-Policy meta tag, adding a new external resource origin, reviewing whether any data leaves the browser, implementing the Hugging Face model download.
---

**Docs:** [TDD §14](../../../docs/TECHNICAL_DESIGN.md#14-security) · [BRD §6.4](../../../docs/BUSINESS_REQUIREMENTS.md#64-security)

## Hard constraints

- No API keys anywhere in the codebase or `.env` files — ever.
- No user data may be sent to an external server — all generation is on-device.
- No third-party analytics scripts without explicit disclosure.

## CSP delivery

GitHub Pages cannot set HTTP headers. Deliver CSP via `<meta http-equiv="Content-Security-Policy">` in `index.html`.

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

`'unsafe-inline'` is required for the theme-detection inline script and Tailwind's runtime style injection.

## Extending connect-src at M5

When `@huggingface/transformers` downloads the model it fetches from `https://huggingface.co`. At milestone M5, extend `connect-src` to include that origin before the feature ships.
