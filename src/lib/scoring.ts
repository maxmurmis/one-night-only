import { QUESTIONS } from "./questions";
import { catalogItem } from "./catalog";
import { TIERS } from "./tiers";
import type {
  Answers,
  AnswerValue,
  MatchResult,
  PairDetail,
  Question,
  Tier,
} from "./types";

/*
 * Motor de compatibilidad de Movie Match.
 *
 *   raw   = Σ (peso · similitud) / Σ peso     sobre las preguntas que contestaron LOS DOS
 *   score = curva(raw) − castigo por dealbreakers
 *
 * Cuatro decisiones que no son obvias y sostienen el producto:
 *
 * 1. RAREZA (IDF). En las preguntas de catálogo, coincidir vale en proporción
 *    inversa a lo masivo que sea el título. Coincidir en Titanic (popularity 5)
 *    aporta 1; coincidir en In the Mood for Love (popularity 1) aporta 5. Es lo
 *    que hace que el desglose se sienta inteligente y no una encuesta.
 *
 * 2. COMPLEMENTO. Hay ejes donde ser distintos es MEJOR que ser iguales: uno
 *    dulce y otro salado comparten el balde. Ese es el chiste de Cinemark, y
 *    tiene su propio modo de scoring en vez de castigarse como una diferencia.
 *
 * 3. DEALBREAKER. Chocar en "¿hablás durante la película?" no es una diferencia
 *    más: es información que predice la cita. Resta aparte del promedio.
 *
 * 4. CURVA. Un promedio ponderado crudo entre desconocidos da ~0,28, y un 28%
 *    se lee como "no tenemos nada que ver" cuando en realidad es el piso
 *    estadístico. La curva mapea ese piso a ~47 y reserva los 90+ para
 *    coincidencias que de verdad son raras.
 */

const DEALBREAKER_PENALTY = 0.06; // por choque, sobre la escala 0..1
const MAX_DEALBREAKER_PENALTY = 0.18;
const MIN_SHARED_QUESTIONS = 5;

const QUESTION_BY_ID = new Map<string, Question>(QUESTIONS.map((q) => [q.id, q]));

/* ------------------------------------------------------------------ utils */

function asArray(v: AnswerValue | undefined): string[] {
  if (v === undefined || v === null) return [];
  if (Array.isArray(v)) return v.filter((x) => typeof x === "string" && x.length > 0);
  if (typeof v === "string") return v ? [v] : [];
  return [];
}

function isAnswered(v: AnswerValue | undefined): boolean {
  if (v === undefined || v === null) return false;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === "string") return v.trim().length > 0;
  if (typeof v === "number") return Number.isFinite(v);
  return false;
}

/** 5 para lo más de nicho, 1 para lo más masivo. Fuera del catálogo, 1. */
function rarity(q: Question, value: string): number {
  if (!q.catalog) return 1;
  const item = catalogItem(q.catalog, value);
  if (!item) return 1;
  return Math.max(1, 6 - Math.min(5, Math.max(1, item.popularity)));
}

export function labelFor(q: Question, v: AnswerValue | undefined): string {
  if (!isAnswered(v)) return "—";
  if (q.kind === "scale") {
    const n = Number(v);
    const [lo, hi] = q.scaleLabels ?? ["", ""];
    if (n <= 2) return lo || `${n}/5`;
    if (n >= 4) return hi || `${n}/5`;
    return "En el medio";
  }
  const values = asArray(v);
  const labels = values.map((val) => {
    if (q.catalog) return catalogItem(q.catalog, val)?.label ?? val;
    return q.options.find((o) => o.value === val)?.label ?? val;
  });
  return labels.join(", ");
}

/**
 * Coseno sobre los conteos de etiquetas de lo elegido por cada lado.
 * Devuelve null cuando el catálogo no tiene etiquetas (ej. la de caras), y ahí
 * la pregunta se puntúa sólo por coincidencia exacta.
 */
function tagSimilarity(q: Question, a: string[], b: string[]): number | null {
  if (!q.catalog) return null;

  const countTags = (ids: string[]): Map<string, number> => {
    const m = new Map<string, number>();
    for (const id of ids) {
      for (const t of catalogItem(q.catalog!, id)?.tags ?? []) {
        m.set(t, (m.get(t) ?? 0) + 1);
      }
    }
    return m;
  };

  const ta = countTags(a);
  const tb = countTags(b);
  if (ta.size === 0 || tb.size === 0) return null;

  let dot = 0;
  for (const [t, n] of ta) dot += n * (tb.get(t) ?? 0);
  const na = Math.sqrt([...ta.values()].reduce((s, n) => s + n * n, 0));
  const nb = Math.sqrt([...tb.values()].reduce((s, n) => s + n * n, 0));
  return na && nb ? dot / (na * nb) : 0;
}

function pairListed(
  pairs: [string, string][] | undefined,
  a: string,
  b: string,
): boolean {
  if (!pairs) return false;
  return pairs.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}

function complementHit(q: Question, a: string, b: string): boolean {
  return pairListed(q.complementPairs, a, b);
}

/**
 * Qué frase mostrar.
 *
 * Las preguntas de complemento tienen TRES desenlaces, no dos: se complementan
 * (1), contestaron lo mismo (0,65) o simplemente no se complementan (0,2). Con
 * dos textos, a dos personas que habían elegido las dos pochoclo dulce se les
 * mostraba "uno dulce y el otro salado" — y justo abajo, sus dos respuestas
 * iguales. Pasaba en un tercio de los pares.
 */
function copyFor(q: Question, agree: boolean, av: AnswerValue, bv: AnswerValue): string {
  if (q.scoringMode === "complement") {
    const a = asArray(av)[0] ?? "";
    const b = asArray(bv)[0] ?? "";
    if (complementHit(q, a, b)) return q.revealCopy;
    if (a === b) return q.sameCopy ?? q.revealCopy;
    return q.clashCopy;
  }
  return agree ? q.revealCopy : q.clashCopy;
}

function isHardClash(q: Question, av: AnswerValue, bv: AnswerValue): boolean {
  // Sin lista declarada, un dealbreaker se comporta como cualquier desacuerdo.
  if (!q.clashPairs?.length) return false;
  const a = asArray(av)[0] ?? "";
  const b = asArray(bv)[0] ?? "";
  return pairListed(q.clashPairs, a, b);
}

/* -------------------------------------------------------------- similitud */

function similarity(q: Question, av: AnswerValue, bv: AnswerValue): number {
  switch (q.scoringMode) {
    case "scale": {
      const a = Number(av);
      const b = Number(bv);
      if (!Number.isFinite(a) || !Number.isFinite(b)) return 0;
      return Math.max(0, 1 - Math.abs(a - b) / 4);
    }

    case "complement": {
      const a = asArray(av)[0] ?? "";
      const b = asArray(bv)[0] ?? "";
      if (complementHit(q, a, b)) return 1;
      if (a === b) return 0.65; // iguales está bien, pero el combo es mejor
      return 0.2;
    }

    case "jaccard": {
      const a = asArray(av);
      const b = asArray(bv);
      const A = new Set(a);
      const B = new Set(b);
      if (A.size === 0 || B.size === 0) return 0;

      let inter = 0;
      let union = 0;
      for (const v of new Set([...A, ...B])) {
        const w = rarity(q, v);
        union += w;
        if (A.has(v) && B.has(v)) inter += w;
      }
      const exact = union === 0 ? 0 : inter / union;

      // Crédito parcial por afinidad de género.
      //
      // Sin esto la pregunta de mayor peso del cuestionario ("qué peli elegirías
      // para una primera cita") casi nunca dispara: con 140 títulos y 3 picks,
      // dos desconocidos coinciden en un título el ~2% de las veces — medido.
      // Dos personas que eligen tres comedias románticas distintas SON
      // compatibles, y el score tiene que decirlo. El título exacto sigue
      // valiendo mucho más: es el premio mayor, no el piso.
      const tagSim = tagSimilarity(q, a, b);
      if (tagSim === null) return exact;
      return 0.7 * exact + 0.3 * tagSim;
    }

    case "dealbreaker":
    case "match":
    default: {
      const a = asArray(av);
      const b = asArray(bv);
      if (a.length === 1 && b.length === 1) return a[0] === b[0] ? 1 : 0;
      // Multi respondido en modo match: caemos a solapamiento simple.
      const A = new Set(a);
      const inter = b.filter((x) => A.has(x)).length;
      const union = new Set([...a, ...b]).size;
      return union === 0 ? 0 : inter / union;
    }
  }
}

/* ---------------------------------------------------------------- pública */

export function tierFor(score: number): Tier {
  const sorted = [...TIERS].sort((x, y) => y.min - x.min);
  return sorted.find((t) => score >= t.min) ?? sorted[sorted.length - 1];
}

/**
 * Curva de calibración, ajustada contra la distribución REAL del cuestionario
 * (medida con `npm run db:check`, 6.000 pares simulados):
 *
 *   raw 0,29 (mediana entre desconocidos) → 47
 *   raw 0,46 (p95 entre desconocidos)     → 62
 *   raw 0,72 (perfiles muy parecidos)     → 81
 *   raw 0,95 (perfiles idénticos)         → 97
 *   raw 1,00                              → 100
 *
 * El 100 exacto existe pero exige pochoclo COMPLEMENTARIO además de coincidir
 * en todo lo demás: dos personas idénticas llegan a 97, no a 100.
 *
 * Los parámetros dependen del banco de preguntas. Si tocás pesos, opciones o
 * el catálogo en content.ts, volvé a correr `npm run db:check` y reajustá.
 */
const CURVE_FLOOR = 0.11;
const CURVE_EXP = 0.72;

export function calibrate(raw: number): number {
  const clamped = Math.min(1, Math.max(0, raw));
  return 100 * (CURVE_FLOOR + (1 - CURVE_FLOOR) * Math.pow(clamped, CURVE_EXP));
}

export function compare(aAnswers: Answers, bAnswers: Answers): MatchResult {
  let weighted = 0;
  let totalWeight = 0;
  let penalty = 0;
  const details: PairDetail[] = [];

  for (const q of QUESTIONS) {
    const av = aAnswers?.[q.id];
    const bv = bAnswers?.[q.id];
    if (!isAnswered(av) || !isAnswered(bv)) continue;

    const s = similarity(q, av as AnswerValue, bv as AnswerValue);
    weighted += q.weight * s;
    totalWeight += q.weight;

    // El castigo extra sólo lo cobran los choques declarados, no cualquier
    // diferencia: con dos dealbreakers de 5 y 4 opciones, penalizar todo
    // desacuerdo le restaba 12 puntos al 64% de los pares — eso no es una
    // señal, es una constante. Medido con `npm run db:check`.
    if (q.scoringMode === "dealbreaker" && s < 0.5 && isHardClash(q, av, bv)) {
      penalty = Math.min(MAX_DEALBREAKER_PENALTY, penalty + DEALBREAKER_PENALTY);
    }

    const A = new Set(asArray(av as AnswerValue));
    const shared = asArray(bv as AnswerValue).filter((x) => A.has(x));

    // Compartir aunque sea UN título ya es una coincidencia, aunque la
    // similitud numérica quede baja: con 3 elecciones por lado, coincidir en
    // una peli da ~0,25 y caía del lado de los choques, donde el texto decía
    // "cero coincidencias" al lado de la peli que los dos habían elegido.
    const agree = s >= 0.6 || shared.length > 0;

    details.push({
      id: q.id,
      prompt: q.prompt,
      section: q.section,
      weight: q.weight,
      similarity: s,
      agree,
      copy: copyFor(q, agree, av as AnswerValue, bv as AnswerValue),
      aLabel: labelFor(q, av as AnswerValue),
      bLabel: labelFor(q, bv as AnswerValue),
      shared: shared.map((v) =>
        q.catalog ? (catalogItem(q.catalog, v)?.label ?? v) : (q.options.find((o) => o.value === v)?.label ?? v),
      ),
      impact: q.weight * s,
    });
  }

  const raw = totalWeight === 0 ? 0 : weighted / totalWeight;
  const score = Math.round(Math.max(5, Math.min(100, calibrate(raw) - penalty * 100)));

  const highlights = details
    .filter((d) => d.agree)
    .sort((x, y) => y.impact - x.impact)
    .slice(0, 4);

  // Los choques se ordenan por peso × desacuerdo: un desacuerdo total en una
  // pregunta pesada duele más que uno parcial, aunque las dos pesen lo mismo.
  const clashes = details
    .filter((d) => !d.agree)
    .sort((x, y) => y.weight * (1 - y.similarity) - x.weight * (1 - x.similarity))
    .slice(0, 2);

  return {
    score,
    raw,
    answeredBoth: details.length,
    totalQuestions: QUESTIONS.length,
    thin: details.length < MIN_SHARED_QUESTIONS,
    highlights,
    clashes,
    details,
    tier: tierFor(score),
  };
}

/** Cuántas de las preguntas contestó una persona (para la barra de progreso). */
export function completion(answers: Answers): { answered: number; total: number; pct: number } {
  const total = QUESTIONS.length;
  const answered = QUESTIONS.filter((q) => isAnswered(answers?.[q.id])).length;
  return { answered, total, pct: Math.round((answered / total) * 100) };
}

export function isComplete(answers: Answers): boolean {
  return completion(answers).answered >= QUESTIONS.length;
}

/**
 * "Sello" del perfil — el tatuaje temporal de la peli, traído a la app.
 * Se arma con las dos respuestas de mayor peso que la persona contestó, así que
 * no depende de un mapa de reglas que se desactualiza cuando cambian las preguntas.
 */
export function stamp(answers: Answers): string {
  const picks = QUESTIONS.filter(
    (q) => q.kind === "single" && isAnswered(answers?.[q.id]),
  )
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 2)
    .map((q) => labelFor(q, answers[q.id]));
  if (picks.length === 0) return "Sin revelar";
  return picks.join(" · ");
}

export function questionById(id: string): Question | undefined {
  return QUESTION_BY_ID.get(id);
}
