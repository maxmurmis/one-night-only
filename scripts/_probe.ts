import { QUESTIONS } from "../src/lib/questions";
import { compare, completion, isComplete, labelFor, stamp, calibrate } from "../src/lib/scoring";
import { sanitizeAnswers } from "../src/lib/users";
import { MOVIES, PEOPLE } from "../src/lib/catalog";
import type { Answers } from "../src/lib/types";

function rnd<T>(a: T[]): T { return a[Math.floor(Math.random()*a.length)]; }
function randomAnswers(): Answers {
  const out: Answers = {};
  for (const q of QUESTIONS) {
    if (q.kind === "scale") out[q.id] = 1 + Math.floor(Math.random()*5);
    else if (q.catalog) {
      const pool = q.catalog === "movies" ? MOVIES : PEOPLE;
      const n = 1 + Math.floor(Math.random()*3);
      out[q.id] = Array.from(new Set(Array.from({length:n}, ()=>rnd(pool).id)));
    } else if (q.kind === "multi") out[q.id] = [rnd(q.options).value];
    else out[q.id] = rnd(q.options).value;
  }
  return out;
}

// 1. symmetry + range
let asym = 0, out = 0, nan = 0, min = 999, max = -1;
for (let i=0;i<4000;i++){
  const a = randomAnswers(), b = randomAnswers();
  const r1 = compare(a,b), r2 = compare(b,a);
  if (r1.score !== r2.score) { asym++; if (asym<3) console.log("ASYM", r1.score, r2.score); }
  if (!Number.isFinite(r1.score)) nan++;
  if (r1.score < 0 || r1.score > 100) out++;
  min = Math.min(min, r1.score); max = Math.max(max, r1.score);
  for (const d of r1.details) if (!(d.similarity >= 0 && d.similarity <= 1)) { console.log("SIM OUT OF RANGE", d.id, d.similarity); }
}
console.log(`symmetry: ${asym} asimétricos / 4000; NaN ${nan}; fuera de rango ${out}; min ${min} max ${max}`);

// 2. identical profiles
const a = randomAnswers();
console.log("idénticos ->", compare(a,a).score, "raw", compare(a,a).raw.toFixed(3));

// 3. sanitize: valores de catálogo inexistentes
const evil: Answers = { ...a, "peli-primera-cita": ["<b>NO EXISTE</b>", "javascript:alert(1)", "zzz"] };
const s = sanitizeAnswers(evil);
console.log("sanitize catálogo basura ->", JSON.stringify(s["peli-primera-cita"]));
const q = QUESTIONS.find(x=>x.id==="peli-primera-cita")!;
console.log("labelFor de la basura ->", labelFor(q, s["peli-primera-cita"]));
const both = compare(s, s);
const det = both.details.find(d=>d.id==="peli-primera-cita")!;
console.log("dos usuarios con la MISMA basura: sim", det.similarity, "shared", JSON.stringify(det.shared));
console.log("score de dos perfiles idénticos con basura:", both.score);

// 4. sanitize con tipos cruzados
const cross: Answers = {
  "silencio": ["4"] as any,          // array donde va número
  "llanto-en-cine": true as any,      // bool donde va número
  "pochoclo": 3 as any,               // número donde va string
  "genero-favorito": ["animacion","terror-suspenso"] as any, // array en single
  "peli-primera-cita": "titanic" as any, // string en multi
  "crush-cine": [123, {x:1}, "ricardo-darin"] as any,
};
console.log("cruzados ->", JSON.stringify(sanitizeAnswers(cross)));

// 5. completion / isComplete
console.log("total preguntas", QUESTIONS.length, "completion vacío", JSON.stringify(completion({})), "isComplete", isComplete({}));
console.log("stamp vacío ->", stamp({}));
console.log("stamp con basura de catálogo ->", stamp({ "peli-primera-cita": ["zzz"] } as Answers));

// 6. curva
console.log("calibrate:", [0,0.29,0.46,0.72,0.95,1].map(r=>`${r}->${calibrate(r).toFixed(1)}`).join(" "));

// 7. distribución
const scores: number[] = [];
for (let i=0;i<6000;i++) scores.push(compare(randomAnswers(), randomAnswers()).score);
scores.sort((x,y)=>x-y);
console.log("dist: p5", scores[300], "med", scores[3000], "p95", scores[5700], "max", scores[5999]);
