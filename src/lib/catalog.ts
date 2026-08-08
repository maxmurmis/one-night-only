import { CONTENT } from "./content";
import type { CatalogItem } from "./types";

export const MOVIES: CatalogItem[] = CONTENT.movies;
export const PEOPLE: CatalogItem[] = CONTENT.people;

const INDEX: Record<"movies" | "people", Map<string, CatalogItem>> = {
  movies: new Map(MOVIES.map((m) => [m.id, m])),
  people: new Map(PEOPLE.map((p) => [p.id, p])),
};

export function catalogList(kind: "movies" | "people"): CatalogItem[] {
  return kind === "movies" ? MOVIES : PEOPLE;
}

export function catalogItem(
  kind: "movies" | "people",
  id: string,
): CatalogItem | undefined {
  return INDEX[kind].get(id);
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/**
 * Búsqueda del catálogo para el picker. Prioriza prefijo sobre substring para
 * que tipear "el se" traiga "El Secreto de sus Ojos" antes que cualquier título
 * que contenga esas letras en el medio.
 */
export function searchCatalog(
  kind: "movies" | "people",
  query: string,
  limit = 40,
): CatalogItem[] {
  const list = catalogList(kind);
  const q = normalize(query.trim());
  if (!q) {
    // Sin búsqueda mostramos primero lo masivo: baja la fricción de arranque.
    return [...list].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
  }
  const scored: { item: CatalogItem; rank: number }[] = [];
  for (const item of list) {
    const label = normalize(item.label);
    const extra = normalize(`${item.meta ?? ""} ${item.search ?? ""}`);
    let rank = -1;
    if (label.startsWith(q)) rank = 0;
    else if (label.includes(` ${q}`)) rank = 1;
    else if (label.includes(q)) rank = 2;
    else if (extra.includes(q)) rank = 3;
    if (rank >= 0) scored.push({ item, rank });
  }
  return scored
    .sort((a, b) => a.rank - b.rank || b.item.popularity - a.item.popularity)
    .slice(0, limit)
    .map((s) => s.item);
}
