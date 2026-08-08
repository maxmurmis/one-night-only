"use client";

import { useState } from "react";

export function VisibilityToggle({ initial }: { initial: boolean }) {
  const [on, setOn] = useState(initial);
  const [busy, setBusy] = useState(false);

  async function toggle() {
    const next = !on;
    setOn(next);
    setBusy(true);
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ visible: next }),
    });
    if (!res.ok) setOn(!next); // revertimos si el server no lo aceptó
    setBusy(false);
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[var(--color-cream)]">
          Aparecer en el ranking
        </p>
        <p className="text-xs leading-snug text-[var(--color-dim)]">
          Apagado, seguís pudiendo compararte por código pero no le salís a nadie en la lista.
        </p>
      </div>
      <button
        onClick={toggle}
        disabled={busy}
        aria-pressed={on}
        className="relative h-7 w-12 shrink-0 rounded-full transition-colors"
        style={{ background: on ? "var(--color-neon)" : "rgba(255,255,255,0.14)" }}
      >
        <span
          className="absolute top-1 h-5 w-5 rounded-full bg-white transition-all"
          style={{ left: on ? "1.55rem" : "0.25rem" }}
        />
      </button>
    </div>
  );
}
