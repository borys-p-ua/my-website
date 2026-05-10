---
name: build-cover-letter
description: How to implement the browser LLM cover letter generator — Transformers.js integration, model selection, streaming, graceful degradation, and abuse prevention. Auto-invoked when working on the CoverLetter section or src/lib/llm/.
when_to_use: Implementing the CoverLetter section, anything inside src/lib/llm/, the abuse prevention gate, or model loading/streaming logic.
---

**Docs:** [TDD §9](../../../docs/TECHNICAL_DESIGN.md#9-browser-llm-integration) · [TDD §9.9 — abuse prevention](../../../docs/TECHNICAL_DESIGN.md#99-abuse-prevention-resolves-brd-d-3)

## Library

`@huggingface/transformers` v4 — **not yet installed** (add at milestone M5).

## Models

| Tier | Model | Size | Condition |
|---|---|---|---|
| Full | `meta-llama/Llama-3.2-3B-Instruct` (q4f16) | ~1.9 GB | GPU memory ≥ 4 GB |
| Compact | `HuggingFaceTB/SmolLM2-1.7B-Instruct` (q4f16) | ~600 MB | GPU memory < 4 GB |

Auto-select tier via `maxBufferSize`; expose a "Use smaller model" toggle for user override.

## Module boundary

Nothing outside `src/lib/llm/` may import `@huggingface/transformers` directly.

```
src/lib/llm/
├── index.ts          ← getLLMStatus(), generateCoverLetter()
├── availability.ts   ← WebGPU / WASM detection, model selection
├── engine.ts         ← pipeline lifecycle, streaming
├── prompt.ts         ← prompt builders
├── rateLimit.ts      ← sessionStorage rate limiter
├── botSignals.ts     ← navigator.webdriver check
└── gate.ts           ← combined abuse-prevention gate
```

## Graceful degradation

| Status | UI |
|---|---|
| `unavailable` | Info banner; Generate disabled |
| `needs-download` | Progress bar; button = "Download model & generate" |
| `ready` | Normal flow |
| Error | `role="alert"` banner + "Try again"; inputs preserved |

## Abuse prevention gate

Three layers evaluated in order before any generation:

1. **Honeypot** — hidden `<input name="website">`; non-empty = silently blocked.
2. **Bot signal** — `navigator.webdriver === true` = silently blocked.
3. **Rate limit** — 3 generations per session (`sessionStorage`); exceeded = user-visible message.

`evaluateGate(honeypotValue)` returns `'allow' | 'honeypot' | 'bot' | 'rate-limited'`.
Silent blocks show nothing; only `'rate-limited'` shows a message.
