import { CONTENT } from "./content";
import type { Question } from "./types";

/**
 * Banco de preguntas del onboarding.
 *
 * Vive en `content.ts` (un solo archivo editable sin tocar código) y acá se
 * tipa y se ordena. Agregar o sacar una pregunta NO rompe nada: el motor de
 * scoring itera sobre esta lista y sólo puntúa lo que contestaron los dos, así
 * que los perfiles viejos siguen siendo comparables — simplemente no suman en
 * la pregunta nueva hasta que la contesten.
 */
export const QUESTIONS: Question[] = CONTENT.questions;

export const SECTION_META: Record<
  Question["section"],
  { label: string; blurb: string; emoji: string }
> = {
  cine: { label: "Tu cine", blurb: "Qué mirás", emoji: "🎬" },
  sala: { label: "En la sala", blurb: "Cómo vivís la función", emoji: "🍿" },
  gustos: { label: "Tus elegidas", blurb: "Títulos y caras", emoji: "⭐" },
  vibra: { label: "La vibra", blurb: "Lo que no es cine", emoji: "✨" },
};

export function questionsBySection(): { section: Question["section"]; items: Question[] }[] {
  const order: Question["section"][] = ["cine", "sala", "gustos", "vibra"];
  return order
    .map((section) => ({ section, items: QUESTIONS.filter((q) => q.section === section) }))
    .filter((g) => g.items.length > 0);
}
