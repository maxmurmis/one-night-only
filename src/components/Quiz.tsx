"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Answers, CatalogItem, Question } from "@/lib/types";
import { CatalogPicker } from "./CatalogPicker";

function hasValue(v: Answers[string] | undefined): boolean {
  if (v === undefined || v === null) return false;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === "string") return v.length > 0;
  return Number.isFinite(v);
}

type Meta = {
  displayName: string;
  age: string;
  city: string;
  instagram: string;
  bio: string;
};

export function Quiz({
  questions,
  movies,
  people,
  initialAnswers,
  initialMeta,
  intro,
  done,
  nextHref,
}: {
  questions: Question[];
  movies: CatalogItem[];
  people: CatalogItem[];
  initialAnswers: Answers;
  initialMeta: Meta;
  intro: string;
  done: string;
  /** A dónde ir al terminar. Preserva el destino del QR si vino de ahí. */
  nextHref: string;
}) {
  const router = useRouter();
  // Si vuelve con respuestas a medias, retomamos donde quedó en vez de
  // hacerle pasar de nuevo por la intro y las 8 preguntas que ya contestó.
  const [step, setStep] = useState(() => {
    const answeredCount = questions.findIndex((qq) => !hasValue(initialAnswers[qq.id]));
    if (answeredCount <= 0) return 0;
    return answeredCount + 1;
  });
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [meta, setMeta] = useState<Meta>(initialMeta);
  const [saving, setSaving] = useState(false);
  // Evita que un doble tap dispare dos avances (o dos envíos).
  const locked = useRef(false);
  const [error, setError] = useState<string | null>(null);

  const total = questions.length;
  const metaStep = total + 1;
  const q = step >= 1 && step <= total ? questions[step - 1] : null;

  const pct = useMemo(() => Math.round((Math.min(step, metaStep) / metaStep) * 100), [step, metaStep]);

  function set(id: string, value: Answers[string]) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function answered(qq: Question): boolean {
    return hasValue(answers[qq.id]);
  }

  async function persist() {
    if (locked.current) return;
    locked.current = true;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          answers,
          displayName: meta.displayName || null,
          age: meta.age ? Number(meta.age) : null,
          city: meta.city || null,
          instagram: meta.instagram || null,
          bio: meta.bio || null,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? "No se pudo guardar. Probá de nuevo.");
        return;
      }
      router.push(nextHref);
    } catch {
      // Señal del cine: el guardado falla y hay que poder reintentar.
      setError("Se cortó la conexión. Tocá de nuevo cuando tengas señal.");
    } finally {
      locked.current = false;
      setSaving(false);
    }
  }

  /**
   * Guardado de fondo: si se le cierra el navegador o se queda sin señal en la
   * fila del cine, no pierde lo contestado. Recibe las respuestas por parámetro
   * porque las de opción única avanzan en el mismo tick en que se eligen, y el
   * estado todavía no se actualizó.
   */
  function autosave(current: Answers) {
    void fetch("/api/profile", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ answers: current }),
    }).catch(() => {});
  }

  function next() {
    if (step === metaStep) {
      void persist();
      return;
    }
    if (step >= 1) autosave(answers);
    setStep((s) => s + 1);
  }

  /* ------------------------------------------------------------------ intro */

  if (step === 0) {
    return (
      <div className="rise flex flex-col gap-6 pt-6">
        <div>
          <p className="chip mb-4 border-[rgba(255,200,87,0.35)] text-[var(--color-gold)]">
            {total} preguntas · 2 minutos
          </p>
          <h1 className="display text-5xl leading-[0.9] text-[var(--color-cream)]">
            Antes de que <span className="text-[var(--color-neon)] glow-neon">se apaguen</span> las
            luces
          </h1>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-[var(--color-muted)]">{intro}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-[var(--color-muted)]">
            No hay respuestas correctas. Las raras suman más:{" "}
            <span className="text-[var(--color-cream)]">
              coincidir en una peli que vio poca gente vale mucho más que coincidir en Titanic.
            </span>
          </p>
        </div>
        <button className="btn btn-primary w-full" onClick={next}>
          Arrancar →
        </button>
      </div>
    );
  }

  /* ------------------------------------------------------------------ datos */

  if (step === metaStep) {
    return (
      <div className="rise flex flex-col gap-5 pt-4">
        <Progress pct={pct} />
        <div>
          <h2 className="display text-4xl text-[var(--color-cream)]">Último paso</h2>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Lo que va a ver la otra persona cuando se comparen.
          </p>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-dim)]">
            Cómo te llamamos
          </span>
          <input
            className="input"
            maxLength={40}
            placeholder="Tu nombre o apodo"
            value={meta.displayName}
            onChange={(e) => setMeta({ ...meta, displayName: e.target.value })}
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-dim)]">
              Edad
            </span>
            <input
              className="input"
              inputMode="numeric"
              placeholder="28"
              value={meta.age}
              onChange={(e) => setMeta({ ...meta, age: e.target.value.replace(/\D/g, "").slice(0, 2) })}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-dim)]">
              Ciudad
            </span>
            <input
              className="input"
              maxLength={60}
              placeholder="CABA"
              value={meta.city}
              onChange={(e) => setMeta({ ...meta, city: e.target.value })}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-dim)]">
            Instagram <span className="normal-case text-[var(--color-dim)]">(opcional)</span>
          </span>
          <input
            className="input"
            maxLength={40}
            placeholder="@tuusuario"
            value={meta.instagram}
            onChange={(e) => setMeta({ ...meta, instagram: e.target.value })}
          />
          <span className="text-xs text-[var(--color-dim)]">
            Sólo se muestra cuando los dos se dan like.
          </span>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-dim)]">
            Una línea sobre vos
          </span>
          <input
            className="input"
            maxLength={220}
            placeholder="Lloré con Coco y no me arrepiento"
            value={meta.bio}
            onChange={(e) => setMeta({ ...meta, bio: e.target.value })}
          />
        </label>

        {error ? <p className="text-sm text-[var(--color-neon)]">{error}</p> : null}

        <p className="text-sm text-[var(--color-muted)]">{done}</p>

        <div className="flex gap-3">
          <button
            className="btn btn-ghost"
            aria-label="Volver a la pregunta anterior"
            onClick={() => setStep((s) => s - 1)}
          >
            ←
          </button>
          <button className="btn btn-primary flex-1" onClick={next} disabled={saving}>
            {saving ? (
              <span className="spin">◠</span>
            ) : nextHref.startsWith("/m/") ? (
              "Ver nuestra compatibilidad 🎬"
            ) : (
              "Ver mi código y mi QR 🎬"
            )}
          </button>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------- pregunta */

  if (!q) return null;
  const canAdvance = answered(q);

  return (
    <div key={q.id} className="rise flex flex-col gap-5 pt-4">
      <Progress pct={pct} />

      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-dim)]">
          {step} / {total}
        </span>
        <h2 className="display mt-2 text-[2.1rem] leading-[1.02] text-[var(--color-cream)]">
          {q.prompt}
        </h2>
        {q.help ? (
          <p className="mt-2 text-sm text-[var(--color-muted)]">{q.help}</p>
        ) : null}
        {q.kind === "multi" ? (
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)]">
            Elegí hasta {q.maxSelect ?? 3}
          </p>
        ) : null}
      </div>

      {q.catalog ? (
        <CatalogPicker
          items={q.catalog === "movies" ? movies : people}
          value={(answers[q.id] as string[]) ?? []}
          max={q.maxSelect ?? 3}
          onChange={(v) => set(q.id, v)}
          placeholder={q.catalog === "movies" ? "Buscá una peli…" : "Buscá un nombre…"}
        />
      ) : q.kind === "scale" ? (
        <ScaleInput
          labels={q.scaleLabels ?? ["", ""]}
          value={(answers[q.id] as number) ?? 0}
          onChange={(n) => set(q.id, n)}
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {q.options.map((o) => {
            const current = answers[q.id];
            const on =
              q.kind === "single"
                ? current === o.value
                : Array.isArray(current) && current.includes(o.value);
            return (
              <button
                key={o.value}
                className="opt"
                data-on={on ? "1" : "0"}
                onClick={() => {
                  if (q.kind === "single") {
                    if (locked.current) return; // doble tap = un solo avance
                    locked.current = true;
                    const updated = { ...answers, [q.id]: o.value };
                    setAnswers(updated);
                    autosave(updated);
                    // Micro-pausa para que se vea la selección antes de avanzar.
                    setTimeout(() => {
                      setStep((s) => s + 1);
                      locked.current = false;
                    }, 190);
                  } else {
                    const arr = Array.isArray(current) ? [...current] : [];
                    const i = arr.indexOf(o.value);
                    if (i >= 0) arr.splice(i, 1);
                    else if (arr.length < (q.maxSelect ?? 3)) arr.push(o.value);
                    set(q.id, arr);
                  }
                }}
              >
                {o.emoji ? <span className="text-xl leading-none">{o.emoji}</span> : null}
                <span className="flex-1">{o.label}</span>
                {on ? <span className="text-[var(--color-neon)]">●</span> : null}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex gap-3">
        <button
          className="btn btn-ghost"
          aria-label="Volver a la pregunta anterior"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          ←
        </button>
        <button className="btn btn-primary flex-1" onClick={next} disabled={!canAdvance}>
          {canAdvance
            ? "Siguiente"
            : q.kind === "scale"
              ? "Movete en la escala"
              : q.kind === "multi"
                ? "Elegí al menos una"
                : "Elegí una opción"}
        </button>
      </div>
    </div>
  );
}

function Progress({ pct }: { pct: number }) {
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${pct}%`,
          background: "linear-gradient(90deg, var(--color-neon), var(--color-gold))",
        }}
      />
    </div>
  );
}

function ScaleInput({
  labels,
  value,
  onChange,
}: {
  labels: string[];
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className="flex h-14 flex-1 items-center justify-center rounded-xl border text-lg font-bold transition-all"
            style={{
              borderColor: value === n ? "var(--color-neon)" : "var(--color-line)",
              background:
                value === n ? "rgba(255,45,99,0.16)" : "rgba(255,255,255,0.03)",
              color: value === n ? "var(--color-neon)" : "var(--color-muted)",
            }}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-[var(--color-dim)]">
        <span>{labels[0]}</span>
        <span>{labels[1]}</span>
      </div>
    </div>
  );
}
