# Viral Reel Analyzer PRO

Micro-SaaS premium in Next.js App Router, TypeScript e Tailwind CSS per analizzare reel, TikTok, script UGC, caption e Meta Ads video senza API esterne.

## Avvio

```bash
npm install
npm run dev
```

## Verifiche consigliate

```bash
npm run typecheck
npm run build
```

Il motore di scoring vive in `lib/analyzer.ts` e usa segnali ponderati su hook, beneficio, CTA, storytelling, specificità, emozione, curiosità, lunghezza e coerenza caption/script.
