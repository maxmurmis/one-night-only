import { CONTENT } from "./content";
import type { Tier } from "./types";

/** Escalones de compatibilidad, de mayor a menor. */
export const TIERS: Tier[] = [...CONTENT.tiers].sort((a, b) => b.min - a.min);

export const COPY = CONTENT.copy;
