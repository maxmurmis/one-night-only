/**
 * Chequeo del algoritmo: `npm run db:check`
 *
 * No toca la base. Simula pares de perfiles y reporta la distribución de scores
 * para poder ver, en un vistazo, si la calibración quedó donde tiene que estar:
 *
 *   · desconocidos al azar → mediana ~45-52 (nadie ve un 8% deprimente)
 *   · el escalón más alto  → menos del 5% de los pares
 *   · dos perfiles idénticos → 100
 *
 * Si tocás pesos o preguntas en content.ts, corré esto antes de deployar.
 */
import { QUESTIONS } from "../src/lib/questions";
import { MOVIES, PEOPLE } from "../src/lib/catalog";
import { TIERS } from "../src/lib/tiers";
import { compare, calibrate } from "../src/lib/scoring";
import type { Answers, Question } from "../src/lib/types";

function rnd<T>(a: T[]): T {
  return a[Math.floor(Math.random() * a.length)];
}

function randomAnswer(q: Question): Answers[string] {
  if (q.kind === "scale") return 1 + Math.floor(Math.random() * 5);
  if (q.catalog) {
    const pool = q.catalog === "movies" ? MOVIES : PEOPLE;
    const weighted = pool.flatMap((i) => Array(i.popularity).fill(i.id) as string[]);
    const out = new Set<string>();
    while (out.size < (q.maxSelect ?? 3)) out.add(rnd(weighted));
    return [...out];
  }
  const v = rnd(q.options).value;
  return q.kind === "multi" ? [v] : v;
}

function randomProfile(): Answers {
  const a: Answers = {};
  for (const q of QUESTIONS) a[q.id] = randomAnswer(q);
  return a;
}

function mutate(base: Answers, rate: number): Answers {
  const a: Answers = {};
  for (const q of QUESTIONS) a[q.id] = Math.random() < rate ? randomAnswer(q) : base[q.id];
  return a;
}

function pctile(sorted: number[], p: number): number {
  return sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * p))];
}

function report(name: string, scores: number[]) {
  const s = [...scores].sort((a, b) => a - b);
  console.log(
    `  ${name.padEnd(26)} min ${String(s[0]).padStart(3)}  p25 ${String(pctile(s, 0.25)).padStart(3)}  mediana ${String(pctile(s, 0.5)).padStart(3)}  p75 ${String(pctile(s, 0.75)).padStart(3)}  p95 ${String(pctile(s, 0.95)).padStart(3)}  max ${String(s[s.length - 1]).padStart(3)}`,
  );
}

/* ------------------------------------------------------------------ checks */

console.log(`\n🎬 Movie Match — chequeo del algoritmo\n`);
console.log(`Preguntas: ${QUESTIONS.length}  ·  Películas: ${MOVIES.length}  ·  Caras: ${PEOPLE.length}`);
console.log(`Peso total: ${QUESTIONS.reduce((s, q) => s + q.weight, 0)}\n`);

const N = 4000;

const strangers: number[] = [];
for (let i = 0; i < N; i++) {
  strangers.push(compare(randomProfile(), randomProfile()).score);
}

const nearby: number[] = [];
for (let i = 0; i < N; i++) {
  const base = randomProfile();
  nearby.push(compare(base, mutate(base, 0.35)).score);
}

const twins: number[] = [];
for (let i = 0; i < 500; i++) {
  const base = randomProfile();
  twins.push(compare(base, base).score);
}

console.log("Distribución de scores:");
report("desconocidos al azar", strangers);
report("parecidos (35% mutado)", nearby);
report("perfiles idénticos", twins);

console.log("\nEn qué escalón cae cada par (desconocidos al azar):");
const buckets = new Map<string, number>();
for (const s of strangers) {
  const t = [...TIERS].sort((a, b) => b.min - a.min).find((x) => s >= x.min);
  const key = `${t?.emoji ?? "?"} ${t?.name ?? "?"} (${t?.min ?? 0}+)`;
  buckets.set(key, (buckets.get(key) ?? 0) + 1);
}
for (const [k, v] of [...buckets].sort(
  (a, b) => Number(b[0].match(/\((\d+)\+/)?.[1]) - Number(a[0].match(/\((\d+)\+/)?.[1]),
)) {
  const pct = ((v / N) * 100).toFixed(1);
  console.log(`  ${k.padEnd(34)} ${String(pct).padStart(5)}%  ${"█".repeat(Math.round(Number(pct) / 2))}`);
}

console.log("\nCurva de calibración (raw → score):");
for (const r of [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1]) {
  console.log(`  raw ${r.toFixed(2)} → ${Math.round(calibrate(r))}`);
}

/* ------------------------------------------------------- integridad del contenido */

const problems: string[] = [];
const ids = new Set<string>();
for (const q of QUESTIONS) {
  if (ids.has(q.id)) problems.push(`id de pregunta duplicado: ${q.id}`);
  ids.add(q.id);
  if (!q.catalog && q.kind !== "scale" && q.options.length < 2) {
    problems.push(`${q.id}: menos de 2 opciones`);
  }
  if (q.kind === "scale" && (!q.scaleLabels || q.scaleLabels.length !== 2)) {
    problems.push(`${q.id}: scale sin scaleLabels`);
  }
  if (q.scoringMode === "complement" && !q.complementPairs?.length) {
    problems.push(`${q.id}: complement sin complementPairs`);
  }
  // Una pregunta de complemento tiene TRES desenlaces y necesita tres textos.
  if (q.scoringMode === "complement" && !q.sameCopy) {
    problems.push(`${q.id}: complement sin sameCopy (el texto para cuando contestan lo MISMO)`);
  }
  if (q.scoringMode === "dealbreaker" && !q.clashPairs?.length) {
    problems.push(`${q.id}: dealbreaker sin clashPairs — no va a castigar nada`);
  }
  for (const p of q.clashPairs ?? []) {
    for (const v of p) {
      if (!q.options.some((o) => o.value === v)) {
        problems.push(`${q.id}: clashPair apunta a una opción inexistente (${v})`);
      }
    }
  }
  for (const p of q.complementPairs ?? []) {
    for (const v of p) {
      if (!q.options.some((o) => o.value === v)) {
        problems.push(`${q.id}: complementPair apunta a una opción inexistente (${v})`);
      }
    }
  }
  if (!q.revealCopy || !q.clashCopy) problems.push(`${q.id}: falta revealCopy/clashCopy`);
}
const movieIds = new Set(MOVIES.map((m) => m.id));
if (movieIds.size !== MOVIES.length) problems.push("hay películas con id duplicado");
const peopleIds = new Set(PEOPLE.map((p) => p.id));
if (peopleIds.size !== PEOPLE.length) problems.push("hay personas con id duplicado");
if (!QUESTIONS.some((q) => q.scoringMode === "dealbreaker")) {
  problems.push("no hay ningún dealbreaker");
}
const tierMins = TIERS.map((t) => t.min);
if (Math.min(...tierMins) > 5) problems.push("no hay escalón que cubra los scores más bajos");

console.log("");
if (problems.length === 0) {
  console.log("✅ Contenido consistente: ids únicos, opciones completas, escalones cubiertos.\n");
} else {
  console.log("⚠️  Problemas encontrados:");
  for (const p of problems) console.log(`   · ${p}`);
  console.log("");
  process.exitCode = 1;
}
