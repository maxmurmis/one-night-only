export type Section = "cine" | "sala" | "gustos" | "vibra";
export type QuestionKind = "single" | "multi" | "scale";
export type ScoringMode = "match" | "complement" | "jaccard" | "scale" | "dealbreaker";

export type Option = { value: string; label: string; emoji?: string };

export type Question = {
  id: string;
  section: Section;
  prompt: string;
  help?: string;
  kind: QuestionKind;
  /** Inline options. Empty when the question is backed by `catalog`. */
  options: Option[];
  /** When set, options come from the shared catalog instead of `options`. */
  catalog?: "movies" | "people";
  scaleLabels?: [string, string];
  maxSelect?: number;
  scoringMode: ScoringMode;
  complementPairs?: [string, string][];
  /**
   * Sólo para scoringMode="dealbreaker": los pares de respuestas que de verdad
   * arruinan una función. Cualquier otra diferencia puntúa 0 como el resto de
   * las preguntas, pero NO cobra el castigo extra.
   */
  clashPairs?: [string, string][];
  weight: number;
  /** Se muestra cuando coinciden (en complement: cuando se COMPLEMENTAN). */
  revealCopy: string;
  /** Sólo en complement: cuando contestaron lo MISMO, que no es lo óptimo. */
  sameCopy?: string;
  clashCopy: string;
};

export type AnswerValue = string | string[] | number;
export type Answers = Record<string, AnswerValue>;

export type CatalogItem = {
  id: string;
  label: string;
  /** 1 = de nicho, 5 = masiva. Coincidir en algo raro vale más. */
  popularity: number;
  emoji?: string;
  /** Se muestra al lado del título (año, rol). */
  meta?: string;
  /** Sólo para la búsqueda: géneros, rol. Nunca se muestra. */
  search?: string;
  /**
   * Etiquetas para el crédito parcial del scoring (géneros, en las películas).
   * Vacío = la pregunta se puntúa sólo por coincidencia exacta de título.
   */
  tags?: string[];
};

export type Tier = {
  min: number;
  name: string;
  tagline: string;
  perk: string;
  emoji: string;
};

export type PairDetail = {
  id: string;
  prompt: string;
  section: Section;
  weight: number;
  /** 0..1 */
  similarity: number;
  agree: boolean;
  copy: string;
  aLabel: string;
  bLabel: string;
  /** For multi/catalog questions: the values both picked. */
  shared: string[];
  /** weight * similarity — used to rank highlights. */
  impact: number;
};

export type MatchResult = {
  /** 0..100, ya calibrado */
  score: number;
  /** 0..1 crudo, antes de la curva */
  raw: number;
  answeredBoth: number;
  totalQuestions: number;
  /** true si hay muy poca superposición para que el número signifique algo */
  thin: boolean;
  highlights: PairDetail[];
  clashes: PairDetail[];
  details: PairDetail[];
  tier: Tier;
};
