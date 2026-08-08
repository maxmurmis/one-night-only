"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LEN = 6;

export function CodeEntry() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clean = code.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, LEN);

  async function go() {
    if (clean.length !== LEN) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/compare/${clean}`);
      if (res.ok) {
        router.push(`/m/${clean}`);
        return; // dejamos busy en true: ya estamos navegando
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setError(body.error ?? "No encontramos ese código.");
    } catch {
      setError("Se cortó la conexión. Probá de nuevo.");
    }
    setBusy(false);
  }

  return (
    <div className="card flex flex-col gap-4 p-5">
      <label className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-dim)]">
        Código de la otra persona
      </label>

      <div className="flex gap-1.5">
        {Array.from({ length: LEN }).map((_, i) => (
          <div
            key={i}
            className="display flex h-14 flex-1 items-center justify-center rounded-xl border text-2xl"
            style={{
              borderColor: clean.length === i ? "var(--color-neon)" : "var(--color-line)",
              background: clean[i] ? "rgba(255,45,99,0.1)" : "rgba(255,255,255,0.03)",
              color: clean[i] ? "var(--color-cream)" : "var(--color-dim)",
            }}
          >
            {clean[i] ?? "·"}
          </div>
        ))}
      </div>

      <input
        className="input text-center font-mono text-lg tracking-[0.4em] uppercase"
        value={clean}
        onChange={(e) => {
          setCode(e.target.value);
          setError(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") void go();
        }}
        placeholder="ABC123"
        autoCapitalize="characters"
        autoComplete="off"
        spellCheck={false}
        maxLength={LEN}
        aria-label="Código de 6 caracteres"
      />

      {error ? <p className="text-sm text-[var(--color-neon)]">{error}</p> : null}

      <button
        className="btn btn-primary w-full"
        onClick={go}
        disabled={clean.length !== LEN || busy}
      >
        {busy ? <span className="spin">◠</span> : "Ver compatibilidad"}
      </button>
    </div>
  );
}
