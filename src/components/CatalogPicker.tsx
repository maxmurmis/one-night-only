"use client";

import { useMemo, useState } from "react";
import type { CatalogItem } from "@/lib/types";

/**
 * Cuántas filas se pintan por tanda. El catálogo tiene cientos de títulos y
 * pintarlos todos de una traba el scroll en un celular de gama media; el botón
 * "Ver más" agranda la tanda sin cortar el catálogo, que era el problema real:
 * antes el tope era 24 fijo y la lista parecía tener 24 películas.
 */
const PAGE = 40;

function normalize(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function CatalogPicker({
  items,
  value,
  max,
  onChange,
  placeholder,
}: {
  items: CatalogItem[];
  value: string[];
  max: number;
  onChange: (v: string[]) => void;
  placeholder: string;
}) {
  const [query, setQuery] = useState("");

  const byId = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) {
      return [...items].sort((a, b) => b.popularity - a.popularity);
    }
    const scored: { item: CatalogItem; rank: number }[] = [];
    for (const item of items) {
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
      .map((s) => s.item);
  }, [items, query]);

  const [shown, setShown] = useState(PAGE);
  // Cada búsqueda nueva arranca de nuevo: si no, tipear algo después de haber
  // expandido dejaba la lista larga y el scroll perdido a mitad de camino. Se
  // ajusta durante el render (no en un efecto) para no pintar una tanda vieja.
  const [lastQuery, setLastQuery] = useState(query);
  if (query !== lastQuery) {
    setLastQuery(query);
    setShown(PAGE);
  }
  const visible = results.slice(0, shown);
  const rest = results.length - visible.length;

  const full = value.length >= max;

  function toggle(id: string) {
    if (value.includes(id)) onChange(value.filter((v) => v !== id));
    else if (!full) onChange([...value, id]);
  }

  return (
    <div className="flex flex-col gap-3">
      {value.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {value.map((id) => {
            const it = byId.get(id);
            return (
              <button
                key={id}
                onClick={() => toggle(id)}
                className="chip border-[var(--color-neon)] bg-[rgba(255,45,99,0.16)] text-[var(--color-cream)] normal-case"
              >
                {it?.emoji ? <span>{it.emoji}</span> : null}
                <span className="text-[0.78rem]">{it?.label ?? id}</span>
                <span className="text-[var(--color-neon)]">✕</span>
              </button>
            );
          })}
        </div>
      ) : null}

      <input
        className="input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />

      <div className="no-bar max-h-[42vh] overflow-y-auto rounded-xl border border-[var(--color-line)]">
        {results.length === 0 ? (
          <p className="px-4 py-6 text-center text-sm text-[var(--color-dim)]">
            No encontramos nada con eso. Probá con otro título.
          </p>
        ) : (
          <ul>
            {visible.map((it) => {
              const on = value.includes(it.id);
              return (
                <li key={it.id}>
                  <button
                    onClick={() => toggle(it.id)}
                    disabled={!on && full}
                    className="flex w-full items-center gap-3 border-b border-[var(--color-line)] px-3.5 py-2.5 text-left transition-colors last:border-b-0 disabled:opacity-35"
                    style={{ background: on ? "rgba(255,45,99,0.12)" : "transparent" }}
                  >
                    <span className="w-6 text-center text-base">{it.emoji ?? "🎞️"}</span>
                    <span className="flex-1 text-[0.92rem] leading-tight text-[var(--color-cream)]">
                      {it.label}
                      {it.meta ? (
                        <span className="ml-1.5 text-[0.75rem] text-[var(--color-dim)]">
                          {it.meta}
                        </span>
                      ) : null}
                    </span>
                    {it.popularity <= 2 ? (
                      <span
                        className="text-[0.62rem] font-bold uppercase tracking-wider text-[var(--color-gold)]"
                        title="Elección de nicho: coincidir acá vale más"
                      >
                        rara
                      </span>
                    ) : null}
                    {on ? <span className="text-[var(--color-neon)]">●</span> : null}
                  </button>
                </li>
              );
            })}
            {rest > 0 ? (
              <li>
                <button
                  onClick={() => setShown((s) => s + PAGE)}
                  className="w-full px-3.5 py-3 text-center text-[0.82rem] font-semibold uppercase tracking-wider text-[var(--color-gold)]"
                >
                  Ver más ({rest})
                </button>
              </li>
            ) : null}
          </ul>
        )}
      </div>

      <p className="text-xs text-[var(--color-dim)]">
        {value.length}/{max} elegidas
        {full ? " · sacá una para cambiar" : ""}
      </p>
    </div>
  );
}
