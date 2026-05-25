export const CHECKOUT_URL =
  "https://pellinidigital.com/cart/add?id=53617392714071&quantity=1&return_to=/checkout";

export const CONTENT_TYPES = [
  "Educativo",
  "Storytelling",
  "Vendita",
  "Tutorial",
  "Trend",
  "Faceless",
  "UGC",
  "Testimonianza"
] as const;

export const PLATFORMS = ["TikTok", "Instagram Reel", "YouTube Shorts", "Meta Ads video"] as const;

export type ContentType = (typeof CONTENT_TYPES)[number];
export type Platform = (typeof PLATFORMS)[number];

export type AnalyzerInput = {
  idea: string;
  script: string;
  caption: string;
  niche: string;
  target: string;
  goal: string;
  platform: Platform;
  duration: string;
  contentType: ContentType;
};

export type RiskLevel = "basso" | "medio" | "alto";

export type AnalyzerResult = {
  id: string;
  scores: {
    viral: number;
    hook: number;
    retention: number;
    cta: number;
    clarity: number;
    emotion: number;
    specificity: number;
    curiosity: number;
  };
  risk: RiskLevel;
  retentionEstimate: string;
  diagnosis: string;
  weakPoints: string[];
  friction: string[];
  flags: {
    slowHook: boolean;
    weakCta: boolean;
    tooLong: boolean;
    tooGeneric: boolean;
  };
  improvements: string[];
  improvedScript: string;
  hooks: string[];
  ctas: string[];
  optimizedCaption: string;
  checklist: string[];
  engagementAdvice: string;
  signals: string[];
};

type Signal = {
  name: string;
  impact: number;
  found: boolean;
};

const vagueWords = [
  "qualcosa",
  "molto",
  "varie",
  "diverse",
  "interessante",
  "bello",
  "utile",
  "incredibile",
  "pazzesco",
  "top",
  "semplice",
  "facile"
];

const ctaTerms = [
  "commenta",
  "salva",
  "condividi",
  "scrivimi",
  "clicca",
  "prova",
  "scarica",
  "acquista",
  "prenota",
  "manda",
  "dm",
  "link",
  "segui",
  "iscriviti",
  "rispondi"
];

const hookTerms = [
  "smetti",
  "non fare",
  "errore",
  "prima di",
  "nessuno",
  "se fai",
  "ti spiego",
  "ecco",
  "perché",
  "come",
  "3",
  "5",
  "7",
  "segreto",
  "verità",
  "attenzione",
  "problema"
];

const emotionTerms = [
  "paura",
  "ansia",
  "desiderio",
  "frustrazione",
  "vergogna",
  "orgoglio",
  "sollievo",
  "fiducia",
  "urgenza",
  "shock",
  "errore",
  "bloccato",
  "stanco",
  "perdi",
  "vinci"
];

const benefitTerms = [
  "ottieni",
  "aumenti",
  "riduci",
  "risparmi",
  "trasformi",
  "migliori",
  "vendi",
  "cresci",
  "trovi",
  "eviti",
  "impari",
  "guadagni",
  "prenotazioni",
  "lead",
  "clienti",
  "conversioni"
];

const storyTerms = [
  "quando",
  "prima",
  "dopo",
  "ieri",
  "oggi",
  "cliente",
  "mi sono accorto",
  "storia",
  "caso",
  "risultato",
  "test",
  "ho provato"
];

const curiosityTerms = [
  "ma",
  "però",
  "il motivo",
  "la cosa",
  "nessuno ti dice",
  "non è",
  "finché",
  "dietro",
  "verità",
  "trucco",
  "errore nascosto"
];

const diagnosisPool = [
  "La struttura ha potenziale commerciale, ma deve anticipare prima la promessa e rendere più visibile la tensione iniziale.",
  "Il contenuto comunica competenza, però la curva di retention dipende da quanto rapidamente trasformi l'idea in un problema urgente.",
  "La base è vendibile: manca ancora una progressione più netta tra hook, prova, payoff e azione.",
  "L'asset può funzionare bene se il primo blocco diventa più specifico e la CTA smette di sembrare un'aggiunta finale.",
  "Il messaggio è chiaro a tratti, ma serve una promessa più misurabile per far percepire valore nei primi secondi.",
  "Il contenuto sembra credibile, però deve ridurre l'attrito cognitivo e usare dettagli più concreti per trattenere lo scroll."
];

const improvementPool = [
  "Apri con una frizione riconoscibile invece di introdurre il tema in modo neutro.",
  "Inserisci un numero, una soglia o un risultato osservabile nella prima frase.",
  "Taglia una frase di contesto e porta il beneficio prima della spiegazione.",
  "Trasforma la CTA in una micro-azione specifica, non in un invito generico.",
  "Aggiungi una prova rapida: esempio, mini caso, confronto prima/dopo o errore comune.",
  "Chiudi ogni blocco con una ragione per restare fino al blocco successivo.",
  "Sostituisci aggettivi vaghi con conseguenze concrete per il target.",
  "Rendi caption e script coerenti: stessa promessa, stessa tensione, stesso payoff.",
  "Usa una frase ponte a metà video per riaprire curiosità prima del drop di attenzione.",
  "Fai emergere il costo del non agire: tempo perso, soldi lasciati, opportunità bruciate."
];

const weakPointPool = [
  "Hook troppo descrittivo per fermare uno scroll freddo.",
  "Beneficio presente ma non abbastanza misurabile.",
  "CTA poco collegata alla promessa del contenuto.",
  "Caption meno incisiva dello script.",
  "Pochi dettagli specifici su target, problema o risultato.",
  "Progressione narrativa non ancora abbastanza tesa.",
  "Mancano pattern di prova sociale o dimostrazione.",
  "Alcune frasi sembrano sostituibili da qualunque nicchia.",
  "Il payoff arriva dopo troppo contesto.",
  "La curiosità si apre ma non viene rilanciata a metà video."
];

const frictionPool = [
  "Introduzione troppo morbida prima del problema.",
  "Passaggi spiegati senza contrasto o posta in gioco.",
  "CTA compressa alla fine senza preparazione.",
  "Troppi concetti nella stessa frase.",
  "Promessa ampia ma poco visuale.",
  "Mancanza di un micro-cliffhanger tra apertura e corpo.",
  "Durata percepita più lunga del necessario.",
  "Tono più informativo che urgente.",
  "Caption non abbastanza orientata al salvataggio.",
  "Pochi trigger emotivi per il target."
];

const checklistPool = [
  "Hook leggibile entro 1,5 secondi.",
  "Primo frame con promessa o problema visibile.",
  "Una sola idea centrale.",
  "Caption coerente con lo script.",
  "CTA specifica e facile da eseguire.",
  "Sottotitoli con parole chiave evidenziate.",
  "Taglio di ogni pausa non intenzionale.",
  "Proof point inserito entro metà video.",
  "Finale che invita commento, salvataggio o DM.",
  "Thumbnail con tensione chiara.",
  "Nessuna frase generica nei primi 3 secondi.",
  "Durata compatibile con densità informativa."
];

const ctaPool = [
  "Salva questo video e usalo come checklist prima di pubblicare il prossimo reel.",
  "Commenta \"ANALISI\" e ti mando la versione applicabile al tuo caso.",
  "Se vuoi evitare questo errore, apri il link e parti dal framework pronto.",
  "Scrivimi in DM la parola \"REEL\" e ti dico quale parte sta frenando la retention.",
  "Condividilo con chi sta pubblicando tanto ma non sta convertendo.",
  "Provalo sul tuo prossimo video e confronta i primi 3 secondi con quello di oggi.",
  "Prenota la tua revisione se vuoi trasformare visualizzazioni in richieste vere.",
  "Lascia un commento con la tua nicchia e ti suggerisco un hook più forte."
];

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function countMatches(text: string, terms: string[]) {
  const normalized = normalize(text);
  return terms.reduce((total, term) => total + (normalized.includes(term) ? 1 : 0), 0);
}

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function hash(input: string) {
  let h = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    h ^= input.charCodeAt(index);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function seededPick<T>(items: T[], seed: number, count: number, avoid: string[] = []) {
  const scored = items
    .map((item, index) => {
      const text = String(item);
      const penalty = avoid.some((old) => old === text) ? 9000 : 0;
      return { item, score: hash(`${seed}:${index}:${text}`) + penalty };
    })
    .sort((a, b) => a.score - b.score)
    .map(({ item }) => item);
  return scored.slice(0, count);
}

function firstSentence(script: string) {
  return script.split(/[.!?\n]/).find((part) => part.trim().length > 0)?.trim() ?? "";
}

function wordCount(text: string) {
  return normalize(text).split(" ").filter(Boolean).length;
}

function hasNumber(text: string) {
  return /\b\d+([,.]\d+)?\b|%|€|\$/.test(text);
}

function estimateDurationSeconds(input: AnalyzerInput) {
  const numeric = input.duration.match(/\d+/)?.[0];
  if (numeric) {
    return Number(numeric);
  }
  return Math.ceil(wordCount(input.script) / 2.55);
}

function scoreSignals(input: AnalyzerInput) {
  const merged = `${input.idea} ${input.script} ${input.caption}`;
  const opening = `${input.idea} ${firstSentence(input.script)}`;
  const scriptWords = wordCount(input.script);
  const duration = estimateDurationSeconds(input);
  const hasCta = countMatches(merged, ctaTerms) > 0;
  const hasHook = countMatches(opening, hookTerms) > 0;
  const hasBenefit = countMatches(merged, benefitTerms) > 0;
  const hasStory = countMatches(input.script, storyTerms) > 0 || input.contentType === "Storytelling";
  const hasSpecificity = hasNumber(merged) || countMatches(merged, ["per", "senza", "entro", "in "]) >= 2;
  const hasEmotion = countMatches(merged, emotionTerms) > 0;
  const hasCuriosity = countMatches(opening, curiosityTerms) > 0 || /\?/.test(opening);
  const vagueCount = countMatches(merged, vagueWords);
  const captionOverlap = input.caption
    ? normalize(input.script)
        .split(" ")
        .filter((word) => word.length > 4 && normalize(input.caption).includes(word)).length
    : 0;
  const tooLong = scriptWords > 135 || duration > 58;
  const hookSlow = wordCount(firstSentence(input.script)) > 18 || !hasHook;

  const signals: Signal[] = [
    { name: "Hook forte nei primi secondi", impact: 15, found: hasHook && !hookSlow },
    { name: "Beneficio chiaro", impact: 15, found: hasBenefit },
    { name: "CTA forte", impact: 10, found: hasCta },
    { name: "Storytelling o prova contestuale", impact: 10, found: hasStory },
    { name: "Specificità e numeri concreti", impact: 10, found: hasSpecificity },
    { name: "Curiosità attiva", impact: 8, found: hasCuriosity },
    { name: "Emozione o tensione", impact: 8, found: hasEmotion },
    { name: "Coerenza caption/script", impact: 6, found: captionOverlap >= 3 || input.caption.length < 10 },
    { name: "Assenza CTA", impact: -15, found: !hasCta },
    { name: "Hook lento", impact: -12, found: hookSlow },
    { name: "Script troppo lungo", impact: -10, found: tooLong },
    { name: "Frasi vaghe", impact: -10, found: vagueCount >= 3 }
  ];

  const hook = clamp(46 + (hasHook ? 27 : -12) + (hasCuriosity ? 13 : 0) + (hasNumber(opening) ? 9 : 0) - (hookSlow ? 18 : 0));
  const cta = clamp(42 + (hasCta ? 32 : -20) + (countMatches(input.caption, ctaTerms) ? 12 : 0) + (input.goal ? 8 : 0));
  const clarity = clamp(48 + (hasBenefit ? 20 : -8) + (input.target ? 10 : 0) + (input.niche ? 8 : 0) - vagueCount * 3);
  const specificity = clamp(42 + (hasSpecificity ? 24 : -10) + (hasNumber(merged) ? 14 : 0) + (input.target.length > 8 ? 8 : 0));
  const emotion = clamp(40 + (hasEmotion ? 24 : -6) + (hasStory ? 12 : 0) + (countMatches(merged, ["perdi", "eviti", "paura"]) ? 8 : 0));
  const curiosity = clamp(44 + (hasCuriosity ? 24 : -8) + (/\?/.test(opening) ? 10 : 0) + (countMatches(opening, ["non", "errore", "verità"]) ? 9 : 0));
  const retention = clamp(
    45 + hook * 0.22 + clarity * 0.15 + curiosity * 0.16 + emotion * 0.12 + (hasStory ? 7 : 0) - (tooLong ? 12 : 0)
  );
  const viral = clamp(
    hook * 0.2 +
      retention * 0.18 +
      cta * 0.14 +
      clarity * 0.14 +
      emotion * 0.1 +
      specificity * 0.12 +
      curiosity * 0.12
  );

  return {
    scores: { viral, hook, retention, cta, clarity, emotion, specificity, curiosity },
    flags: {
      slowHook: hookSlow,
      weakCta: !hasCta || cta < 62,
      tooLong,
      tooGeneric: vagueCount >= 3 || specificity < 55
    },
    duration,
    signals
  };
}

function riskFromScore(score: number): RiskLevel {
  if (score >= 74) return "basso";
  if (score >= 55) return "medio";
  return "alto";
}

function hookTemplates(input: AnalyzerInput, seed: number, avoid: string[]) {
  const niche = input.niche || "questa nicchia";
  const target = input.target || "il tuo pubblico";
  const goal = input.goal || "ottenere più richieste";
  const templates = [
    `Se pubblichi su ${niche} e non stai ${goal}, probabilmente il problema è nei primi 3 secondi.`,
    `Il 90% dei contenuti per ${target} perde attenzione qui: la promessa arriva troppo tardi.`,
    `Smetti di iniziare i reel così se vuoi ${goal} senza sembrare generico.`,
    `Prima di girare un altro video su ${niche}, controlla questo dettaglio nel tuo hook.`,
    `La differenza tra un reel ignorato e uno salvato spesso è questa frase iniziale.`,
    `Se ${target} scrolla prima della CTA, non è colpa dell'algoritmo: guarda l'apertura.`,
    `Questo errore rende debole anche un buon contenuto ${input.contentType.toLowerCase()}.`,
    `Vuoi ${goal}? Allora non aprire il video con una spiegazione, aprilo con una tensione.`
  ];
  return seededPick(templates, seed + 17, 5, avoid);
}

function buildImprovedScript(input: AnalyzerInput, hooks: string[], ctas: string[]) {
  const target = input.target || "chi ti guarda";
  const niche = input.niche || "la tua nicchia";
  const goal = input.goal || "ottenere più risultati dal contenuto";
  const core = input.idea || "il tuo contenuto";

  return [
    hooks[0],
    `Il punto non è parlare di ${core.toLowerCase()} più a lungo: è far capire subito a ${target.toLowerCase()} cosa perde se continua a fare come prima.`,
    `Mostra un esempio concreto: una frase vaga, una versione più specifica e il motivo per cui la seconda trattiene meglio l'attenzione.`,
    `Poi collega tutto al risultato: in ${niche.toLowerCase()}, chiarezza + tensione + prova rendono il messaggio più memorabile e più facile da salvare.`,
    `${ctas[0]}`
  ].join("\n\n");
}

function buildCaption(input: AnalyzerInput, hooks: string[], ctas: string[]) {
  const target = input.target || "chi crea contenuti";
  const niche = input.niche || "la tua nicchia";
  return `${hooks[1]}\n\nPer ${target.toLowerCase()}, un reel non fallisce solo per l'idea: spesso fallisce perché promessa, prova e CTA non arrivano nell'ordine giusto.\n\nFormula rapida per ${niche.toLowerCase()}:\n1. Problema specifico\n2. Promessa misurabile\n3. Esempio concreto\n4. Micro-azione finale\n\n${ctas[1]}`;
}

export function analyzeContent(input: AnalyzerInput, previousOutputs: string[] = []): AnalyzerResult {
  const seed = hash(JSON.stringify(input) + previousOutputs.join("|") + Date.now().toString().slice(-4));
  const scored = scoreSignals(input);
  const risk = riskFromScore(scored.scores.viral);
  const hooks = hookTemplates(input, seed, previousOutputs);
  const ctas = seededPick(ctaPool, seed + 31, 3, previousOutputs);
  const weakPoints = seededPick(weakPointPool, seed + 41, 4, previousOutputs);
  const friction = seededPick(frictionPool, seed + 61, 4, previousOutputs);
  const improvements = seededPick(improvementPool, seed + 83, 6, previousOutputs);
  const checklist = seededPick(checklistPool, seed + 101, 7, previousOutputs);
  const diagnosis = seededPick(diagnosisPool, seed + scored.scores.viral, 1, previousOutputs)[0];
  const retentionWindow =
    scored.scores.retention >= 78
      ? "Alta: probabile tenuta fino al 70-85% se il montaggio resta denso."
      : scored.scores.retention >= 58
        ? "Media: buona apertura, ma rischio drop tra secondo 5 e 12."
        : "Critica: lo scroll può avvenire prima che il beneficio sia chiaro.";
  const engagementAdvice = seededPick(
    [
      "Chiudi con una domanda binaria: fa aumentare commenti perché riduce lo sforzo di risposta.",
      "Invita il pubblico a scrivere la propria nicchia: ti dà commenti utili e nuovi angoli contenuto.",
      "Usa il primo commento per ampliare la promessa e spingere salvataggi.",
      "Fissa un commento con una mini-checklist: aumenta permanenza e percezione premium.",
      "Trasforma la CTA in una parola chiave da commentare: è più semplice di una richiesta generica."
    ],
    seed + 211,
    1,
    previousOutputs
  )[0];

  return {
    id: `${seed}-${scored.scores.viral}`,
    scores: scored.scores,
    risk,
    retentionEstimate: retentionWindow,
    diagnosis,
    weakPoints,
    friction,
    flags: scored.flags,
    improvements,
    improvedScript: buildImprovedScript(input, hooks, ctas),
    hooks,
    ctas,
    optimizedCaption: buildCaption(input, hooks, ctas),
    checklist,
    engagementAdvice,
    signals: scored.signals
      .filter((signal) => signal.found)
      .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
      .slice(0, 8)
      .map((signal) => `${signal.impact > 0 ? "+" : ""}${signal.impact} ${signal.name}`)
  };
}

export const sampleInputs: AnalyzerInput[] = [
  {
    idea: "Aiutare freelance a capire perché i loro reel non portano clienti",
    script:
      "Se i tuoi reel fanno visualizzazioni ma zero richieste, guarda i primi 3 secondi. Stai probabilmente spiegando il tema invece di mostrare il problema. Prima: oggi parliamo di personal branding. Dopo: se i tuoi contenuti attirano curiosi ma non clienti, manca una promessa commerciale. Salva questa checklist prima di pubblicare il prossimo reel.",
    caption:
      "Visualizzazioni senza clienti? Il problema spesso è l'apertura. Salva questa formula e usala sul prossimo contenuto.",
    niche: "personal branding per freelance",
    target: "freelance che vendono servizi high-ticket",
    goal: "generare richieste in DM",
    platform: "Instagram Reel",
    duration: "34 secondi",
    contentType: "Educativo"
  },
  {
    idea: "UGC per una crema viso anti macchie",
    script:
      "Ho provato questa crema per 14 giorni perché avevo macchie visibili qui. La cosa che mi ha convinta non è stata la texture, ma il fatto che la pelle sembrava più uniforme già nella prima settimana. Ti faccio vedere il prima e dopo, poi ti dico per chi secondo me ha senso acquistarla. Usa il link se vuoi provarla con lo sconto attivo oggi.",
    caption: "Test reale di 14 giorni, prima/dopo e per chi conviene davvero.",
    niche: "skincare",
    target: "donne 30-45 con macchie leggere",
    goal: "vendere dal video UGC",
    platform: "Meta Ads video",
    duration: "42 secondi",
    contentType: "UGC"
  }
];
