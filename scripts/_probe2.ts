import { QUESTIONS } from "../src/lib/questions";
import { compare } from "../src/lib/scoring";
import type { Answers } from "../src/lib/types";

// Enumerar TODOS los pares de opciones de cada pregunta single y ver qué copy sale.
for (const q of QUESTIONS.filter(x => x.kind === "single")) {
  const opts = q.options.map(o => o.value);
  let idenAgree = 0, diffAgree = 0, diffClash = 0, total = 0;
  const rows: string[] = [];
  for (const a of opts) for (const b of opts) {
    total++;
    const r = compare({ [q.id]: a } as Answers, { [q.id]: b } as Answers);
    const d = r.details[0];
    if (a === b && d.agree) idenAgree++;
    if (a !== b && d.agree) diffAgree++;
    if (a !== b && !d.agree) diffClash++;
    if (q.scoringMode === "complement") rows.push(`   ${a} × ${b} -> sim ${d.similarity} agree=${d.agree}`);
  }
  console.log(`\n${q.id} (${q.scoringMode}) — ${total} pares ordenados`);
  console.log(`  iguales con revealCopy: ${idenAgree} | distintos con revealCopy: ${diffAgree} | distintos con clashCopy: ${diffClash}`);
  if (q.scoringMode === "complement") {
    console.log(`  revealCopy = "${q.revealCopy}"`);
    console.log(`  clashCopy  = "${q.clashCopy}"`);
    console.log(rows.filter(r=>r.includes("sim 0.65")||r.includes("sim 0.2")).slice(0,6).join("\n"));
  }
}
