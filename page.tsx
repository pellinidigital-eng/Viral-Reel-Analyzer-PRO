"use client";

import {
  ArrowRight,
  BarChart3,
  Check,
  Clipboard,
  Copy,
  Crown,
  Download,
  Flame,
  Gauge,
  Loader2,
  RefreshCcw,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  analyzeContent,
  CHECKOUT_URL,
  CONTENT_TYPES,
  PLATFORMS,
  sampleInputs
} from "@/lib/analyzer";
import type { AnalyzerInput, AnalyzerResult } from "@/lib/analyzer";

const emptyInput: AnalyzerInput = {
  idea: "",
  script: "",
  caption: "",
  niche: "",
  target: "",
  goal: "",
  platform: "Instagram Reel",
  duration: "",
  contentType: "Educativo"
};

type CopyKey = "analysis" | "script" | "hooks" | "caption";

function scoreColor(score: number) {
  if (score >= 78) return "text-signal";
  if (score >= 58) return "text-voltage";
  return "text-ember";
}

function riskStyle(risk: AnalyzerResult["risk"]) {
  if (risk === "basso") return "border-signal/40 bg-signal/10 text-signal";
  if (risk === "medio") return "border-voltage/40 bg-voltage/10 text-voltage";
  return "border-ember/40 bg-ember/10 text-ember";
}

function serializeResult(result: AnalyzerResult) {
  return [
    `Viral score: ${result.scores.viral}/100`,
    `Hook: ${result.scores.hook}/100 | Retention: ${result.scores.retention}/100 | CTA: ${result.scores.cta}/100`,
    `Rischio flop: ${result.risk}`,
    "",
    "Diagnosi:",
    result.diagnosis,
    "",
    "Punti deboli:",
    ...result.weakPoints.map((item) => `- ${item}`),
    "",
    "Miglioramenti:",
    ...result.improvements.map((item) => `- ${item}`),
    "",
    "Script migliorato:",
    result.improvedScript,
    "",
    "Hook alternativi:",
    ...result.hooks.map((item) => `- ${item}`),
    "",
    "CTA alternative:",
    ...result.ctas.map((item) => `- ${item}`),
    "",
    "Caption ottimizzata:",
    result.optimizedCaption
  ].join("\n");
}

function GaugeCard({ label, score, icon: Icon }: { label: string; score: number; icon: typeof Zap }) {
  const circumference = 2 * Math.PI * 44;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="premium-panel rounded-lg p-4 transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:shadow-glow">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Icon className="h-4 w-4 text-voltage" />
          {label}
        </div>
        <span className={`text-sm font-semibold ${scoreColor(score)}`}>{score}/100</span>
      </div>
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 110 110" className="h-24 w-24 shrink-0 -rotate-90">
          <circle cx="55" cy="55" r="44" stroke="rgba(255,255,255,.08)" strokeWidth="10" fill="none" />
          <circle
            cx="55"
            cy="55"
            r="44"
            stroke="url(#scoreGradient)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#7DD3FC" />
              <stop offset="55%" stopColor="#6EE7B7" />
              <stop offset="100%" stopColor="#E7D8B8" />
            </linearGradient>
          </defs>
        </svg>
        <div className="min-w-0">
          <div className="text-3xl font-semibold tracking-normal text-white">{score}</div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-voltage via-signal to-champagne transition-all duration-1000"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CopyButton({ onClick, copied, label }: { onClick: () => void; copied: boolean; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-3 text-sm text-slate-100 transition hover:border-voltage/50 hover:bg-voltage/10"
    >
      {copied ? <Check className="h-4 w-4 text-signal" /> : <Copy className="h-4 w-4" />}
      {label}
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="premium-panel rounded-lg p-5">
      <h2 className="mb-4 text-base font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

export default function Home() {
  const [input, setInput] = useState<AnalyzerInput>(emptyInput);
  const [result, setResult] = useState<AnalyzerResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<CopyKey | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("vra-history");
      if (stored) setHistory(JSON.parse(stored).slice(-20));
    } catch {
      setHistory([]);
    }
  }, []);

  const formReady = useMemo(() => {
    return input.idea.trim().length > 8 && input.script.trim().length > 24 && input.target.trim().length > 3;
  }, [input]);

  function updateField<K extends keyof AnalyzerInput>(key: K, value: AnalyzerInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function runAnalysis(nextInput = input) {
    if (!formReady && nextInput === input) return;
    setLoading(true);
    window.setTimeout(() => {
      const analysis = analyzeContent(nextInput, history);
      const signature = [
        analysis.diagnosis,
        ...analysis.hooks,
        ...analysis.improvements.slice(0, 3),
        analysis.optimizedCaption
      ];
      const nextHistory = [...history, ...signature].slice(-60);
      setResult(analysis);
      setHistory(nextHistory);
      try {
        window.localStorage.setItem("vra-history", JSON.stringify(nextHistory));
      } catch {
        // Private browsing can block storage; the analysis still works for the current session.
      }
      setLoading(false);
    }, 1250);
  }

  async function copyText(key: CopyKey, value: string) {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1500);
  }

  function loadSample(index: number) {
    const sample = sampleInputs[index];
    setInput(sample);
    setLoading(true);
    window.setTimeout(() => {
      const analysis = analyzeContent(sample, history);
      setResult(analysis);
      setLoading(false);
    }, 900);
  }

  function exportAnalysis() {
    if (!result) return;
    const blob = new Blob([serializeResult(result)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `viral-reel-analysis-${result.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen overflow-hidden px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-premium backdrop-blur-xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-voltage to-transparent" />
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-champagne/20 bg-champagne/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-champagne">
                <Crown className="h-3.5 w-3.5" />
                Premium content intelligence
              </div>
              <h1 className="text-3xl font-semibold tracking-normal text-white sm:text-5xl">
                Viral Reel Analyzer PRO
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                Analizza reel, TikTok, script UGC, caption e Meta Ads video con un sistema di scoring realistico su hook,
                retention, CTA, specificità e rischio flop.
              </p>
            </div>
            <a
              href={CHECKOUT_URL}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-champagne to-signal px-5 text-sm font-semibold text-obsidian transition hover:scale-[1.02] hover:shadow-glow"
            >
              Sblocca PRO
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)]">
          <section className="premium-panel rounded-lg p-4 sm:p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-white">Console analisi</h2>
                <p className="mt-1 text-sm text-slate-400">Compila i segnali principali o carica un esempio.</p>
              </div>
              <Sparkles className="h-5 w-5 text-champagne" />
            </div>

            <div className="mb-5 grid grid-cols-2 gap-3">
              {sampleInputs.map((sample, index) => (
                <button
                  key={sample.idea}
                  type="button"
                  onClick={() => loadSample(index)}
                  className="rounded-md border border-white/10 bg-white/[0.05] px-3 py-3 text-left text-sm text-slate-200 transition hover:border-voltage/50 hover:bg-voltage/10"
                >
                  {sample.contentType}
                  <span className="block truncate text-xs text-slate-400">{sample.niche}</span>
                </button>
              ))}
            </div>

            <div className="grid gap-4">
              <label className="grid gap-2 text-sm text-slate-300">
                Idea reel
                <input
                  className="field min-h-11 rounded-md px-3"
                  value={input.idea}
                  onChange={(event) => updateField("idea", event.target.value)}
                  placeholder="Es. perché i contenuti fanno views ma non vendono"
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Script
                <textarea
                  className="field min-h-36 rounded-md p-3 premium-scrollbar"
                  value={input.script}
                  onChange={(event) => updateField("script", event.target.value)}
                  placeholder="Incolla apertura, corpo e finale del video..."
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Caption
                <textarea
                  className="field min-h-24 rounded-md p-3 premium-scrollbar"
                  value={input.caption}
                  onChange={(event) => updateField("caption", event.target.value)}
                  placeholder="Caption attuale o bozza..."
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-slate-300">
                  Nicchia
                  <input
                    className="field min-h-11 rounded-md px-3"
                    value={input.niche}
                    onChange={(event) => updateField("niche", event.target.value)}
                    placeholder="Skincare, fitness, consulenza..."
                  />
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  Target
                  <input
                    className="field min-h-11 rounded-md px-3"
                    value={input.target}
                    onChange={(event) => updateField("target", event.target.value)}
                    placeholder="Chi deve agire dopo il video?"
                  />
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  Obiettivo
                  <input
                    className="field min-h-11 rounded-md px-3"
                    value={input.goal}
                    onChange={(event) => updateField("goal", event.target.value)}
                    placeholder="DM, lead, vendite, salvataggi..."
                  />
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  Durata stimata
                  <input
                    className="field min-h-11 rounded-md px-3"
                    value={input.duration}
                    onChange={(event) => updateField("duration", event.target.value)}
                    placeholder="Es. 35 secondi"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-slate-300">
                  Piattaforma
                  <select
                    className="field min-h-11 rounded-md px-3"
                    value={input.platform}
                    onChange={(event) => updateField("platform", event.target.value as AnalyzerInput["platform"])}
                  >
                    {PLATFORMS.map((platform) => (
                      <option key={platform}>{platform}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  Tipo contenuto
                  <select
                    className="field min-h-11 rounded-md px-3"
                    value={input.contentType}
                    onChange={(event) => updateField("contentType", event.target.value as AnalyzerInput["contentType"])}
                  >
                    {CONTENT_TYPES.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-3">
                <button
                  type="button"
                  disabled={!formReady || loading}
                  onClick={() => runAnalysis()}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-voltage via-signal to-champagne px-4 text-sm font-semibold text-obsidian transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                  Analizza contenuto
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInput(emptyInput);
                    setResult(null);
                  }}
                  className="inline-flex min-h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-white/[0.06] text-slate-100 transition hover:border-ember/50 hover:bg-ember/10"
                  title="Nuova analisi"
                >
                  <RefreshCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>

          <section className="grid content-start gap-5">
            {loading && (
              <div className="premium-panel relative min-h-72 overflow-hidden rounded-lg p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-scan" />
                <div className="relative flex min-h-60 flex-col items-center justify-center text-center">
                  <div className="mb-5 rounded-full border border-voltage/30 bg-voltage/10 p-4 shadow-glow animate-pulseGlow">
                    <BarChart3 className="h-8 w-8 text-voltage" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Analisi retention in corso</h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                    Sto leggendo apertura, promessa, CTA, coerenza e segnali di drop per generare una diagnosi non ripetitiva.
                  </p>
                </div>
              </div>
            )}

            {!loading && !result && (
              <div className="premium-panel rounded-lg p-7 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">
                  <Gauge className="h-8 w-8 text-voltage" />
                </div>
                <h2 className="text-xl font-semibold text-white">Dashboard pronta</h2>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">
                  Inserisci uno script reale: il sistema genererà score, diagnosi, criticità, hook alternativi, CTA, caption e checklist di pubblicazione.
                </p>
              </div>
            )}

            {!loading && result && (
              <div className="grid gap-5 animate-rise">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <GaugeCard label="Viral score" score={result.scores.viral} icon={Flame} />
                  <GaugeCard label="Hook" score={result.scores.hook} icon={Zap} />
                  <GaugeCard label="Retention" score={result.scores.retention} icon={BarChart3} />
                  <GaugeCard label="CTA" score={result.scores.cta} icon={ArrowRight} />
                </div>

                <div className="premium-panel rounded-lg p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${riskStyle(result.risk)}`}>
                          Rischio flop {result.risk}
                        </span>
                        {result.signals.map((signal) => (
                          <span key={signal} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300">
                            {signal}
                          </span>
                        ))}
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-300">{result.diagnosis}</p>
                      <p className="mt-2 text-sm text-slate-400">{result.retentionEstimate}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:w-72">
                      <CopyButton copied={copied === "analysis"} label="Copia analisi" onClick={() => copyText("analysis", serializeResult(result))} />
                      <button
                        type="button"
                        onClick={exportAnalysis}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-3 text-sm text-slate-100 transition hover:border-champagne/50 hover:bg-champagne/10"
                      >
                        <Download className="h-4 w-4" />
                        Esporta
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: "Chiarezza", score: result.scores.clarity },
                    { label: "Emozione", score: result.scores.emotion },
                    { label: "Specificità", score: result.scores.specificity },
                    { label: "Curiosity", score: result.scores.curiosity }
                  ].map(({ label, score }) => (
                    <div key={label} className="premium-panel rounded-lg p-4">
                      <div className="mb-3 flex items-center justify-between text-sm">
                        <span className="text-slate-300">{label}</span>
                        <span className={`font-semibold ${scoreColor(score)}`}>{score}/100</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-ember via-voltage to-signal transition-all duration-1000"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-5 xl:grid-cols-2">
                  <Section title="Punti deboli">
                    <ul className="grid gap-3 text-sm text-slate-300">
                      {result.weakPoints.map((item) => (
                        <li key={item} className="rounded-md border border-white/10 bg-white/[0.04] p-3">{item}</li>
                      ))}
                    </ul>
                  </Section>
                  <Section title="Cosa rallenta il contenuto">
                    <ul className="grid gap-3 text-sm text-slate-300">
                      {result.friction.map((item) => (
                        <li key={item} className="rounded-md border border-white/10 bg-white/[0.04] p-3">{item}</li>
                      ))}
                    </ul>
                  </Section>
                </div>

                <Section title="Controlli critici">
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                      ["Hook lento?", result.flags.slowHook],
                      ["CTA debole?", result.flags.weakCta],
                      ["Script troppo lungo?", result.flags.tooLong],
                      ["Troppo generico?", result.flags.tooGeneric]
                    ].map(([label, active]) => (
                      <div key={String(label)} className="rounded-md border border-white/10 bg-white/[0.04] p-3">
                        <div className="text-sm text-slate-400">{label}</div>
                        <div className={active ? "mt-1 font-semibold text-ember" : "mt-1 font-semibold text-signal"}>
                          {active ? "Sì, da correggere" : "No, buon segnale"}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section title="Miglioramenti concreti">
                  <ul className="grid gap-3 text-sm text-slate-300">
                    {result.improvements.map((item) => (
                      <li key={item} className="flex gap-3 rounded-md border border-white/10 bg-white/[0.04] p-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Section>

                <Section title="Script migliorato">
                  <div className="mb-3 flex justify-end">
                    <CopyButton copied={copied === "script"} label="Copia script" onClick={() => copyText("script", result.improvedScript)} />
                  </div>
                  <pre className="premium-scrollbar whitespace-pre-wrap rounded-md border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-200">
                    {result.improvedScript}
                  </pre>
                </Section>

                <div className="grid gap-5 xl:grid-cols-2">
                  <Section title="5 hook alternativi">
                    <div className="mb-3 flex justify-end">
                      <CopyButton copied={copied === "hooks"} label="Copia hook" onClick={() => copyText("hooks", result.hooks.join("\n"))} />
                    </div>
                    <ol className="grid gap-3 text-sm text-slate-300">
                      {result.hooks.map((hook, index) => (
                        <li key={hook} className="rounded-md border border-white/10 bg-white/[0.04] p-3">
                          <span className="mr-2 text-voltage">{index + 1}.</span>
                          {hook}
                        </li>
                      ))}
                    </ol>
                  </Section>
                  <Section title="3 CTA alternative">
                    <ul className="grid gap-3 text-sm text-slate-300">
                      {result.ctas.map((cta) => (
                        <li key={cta} className="rounded-md border border-white/10 bg-white/[0.04] p-3">{cta}</li>
                      ))}
                    </ul>
                  </Section>
                </div>

                <Section title="Caption ottimizzata">
                  <div className="mb-3 flex justify-end">
                    <CopyButton copied={copied === "caption"} label="Copia caption" onClick={() => copyText("caption", result.optimizedCaption)} />
                  </div>
                  <pre className="premium-scrollbar whitespace-pre-wrap rounded-md border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-200">
                    {result.optimizedCaption}
                  </pre>
                </Section>

                <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
                  <Section title="Checklist finale pubblicazione">
                    <ul className="grid gap-2 text-sm text-slate-300">
                      {result.checklist.map((item) => (
                        <li key={item} className="flex gap-3">
                          <Clipboard className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Section>
                  <Section title="Consiglio engagement finale">
                    <p className="text-sm leading-6 text-slate-300">{result.engagementAdvice}</p>
                    <a
                      href={CHECKOUT_URL}
                      className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-white text-sm font-semibold text-obsidian transition hover:bg-champagne"
                    >
                      Porta l'analisi in PRO
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Section>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
