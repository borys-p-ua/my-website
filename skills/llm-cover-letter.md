# Skill: Browser LLM + Cover Letter

Full spec: [TDD §9](../docs/TECHNICAL_DESIGN.md#9-browser-llm-integration)
Abuse prevention detail: [TDD §9.9](../docs/TECHNICAL_DESIGN.md#99-abuse-prevention-resolves-brd-d-3)

## Library

`@huggingface/transformers` v4 — **not yet installed** (add at milestone M5).

## Models

| Tier | Model | Size | When used |
|---|---|---|---|
| Full | `meta-llama/Llama-3.2-3B-Instruct` (q4f16) | ~1.9 GB | GPU memory ≥ 4 GB |
| Compact | `HuggingFaceTB/SmolLM2-1.7B-Instruct` (q4f16) | ~600 MB | GPU memory < 4 GB |

Model tier is auto-selected on startup via `maxBufferSize`; user can override with a toggle.

## Module boundary

Nothing outside `src/lib/llm/` imports `@huggingface/transformers` directly.

```
src/lib/llm/
├── index.ts          ← public API: getLLMStatus(), generateCoverLetter()
├── availability.ts   ← WebGPU / WASM detection, model selection
├── engine.ts         ← pipeline lifecycle, model loading, streaming
├── prompt.ts         ← system + user prompt builders
├── rateLimit.ts      ← sessionStorage rate limiter
├── botSignals.ts     ← navigator.webdriver check
├── gate.ts           ← combined abuse-prevention gate
└── types.ts
```

## Public API

```ts
getLLMStatus(): Promise<'unavailable' | 'needs-download' | 'ready'>
generateCoverLetter({ jobDescription, companyName?, onChunk, onProgress? }): Promise<string>
```

## Streaming

Transformers.js returns an async generator. Output is pushed token-by-token via `onChunk` callback; the `<textarea>` updates in real time.

## Graceful degradation

| Status | UI behaviour |
|---|---|
| `unavailable` | Info banner; Generate button disabled |
| `needs-download` | Progress bar shown; button label "Download model & generate" |
| `ready` | Normal generation flow |
| Error | `role="alert"` banner + "Try again"; input preserved |

## Abuse prevention (three layers)

1. **Honeypot** — hidden `<input name="website">` hidden via CSS; non-empty value = silently blocked.
2. **Rate limit** — 3 generations per session (`sessionStorage`); 4th attempt shows message.
3. **Bot signal** — `navigator.webdriver === true` = silently blocked.

`evaluateGate(honeypotValue)` returns `'allow' | 'honeypot' | 'rate-limited' | 'bot'`.
`'honeypot'` and `'bot'` are silent; `'rate-limited'` shows a user-visible message.
