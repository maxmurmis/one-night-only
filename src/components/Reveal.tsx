"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { MatchResult, Tier } from "@/lib/types";
import type { PublicProfile } from "@/lib/users";
import { Avatar } from "./Avatar";
import { ScoreRing } from "./ScoreRing";

/**
 * Pantalla de revelación: es LA pantalla del producto.
 *
 * El número sube con un contador en vez de aparecer de golpe — dos personas
 * mirando el mismo teléfono en la fila del cine necesitan un par de segundos de
 * suspenso, que es exactamente lo que hace que la activación se comparta.
 */
export function Reveal({
  me,
  them,
  result,
  tiers,
}: {
  me: PublicProfile;
  them: PublicProfile;
  result: MatchResult;
  tiers: Tier[];
}) {
  const [shown, setShown] = useState(0);
  const [liked, setLiked] = useState(false);
  const [mutual, setMutual] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const target = result.score;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [result.score]);

  const nextTier = [...tiers].reverse().find((t) => t.min > result.score);

  async function sendLike() {
    setBusy(true);
    const res = await fetch("/api/like", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId: them.id }),
    });
    const data = (await res.json().catch(() => ({}))) as { mutual?: boolean };
    setLiked(true);
    setMutual(Boolean(data.mutual));
    setBusy(false);
  }

  return (
    <div className="flex flex-col items-center gap-6 pt-2">
      {/* Las dos caras */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <div className="flex flex-col items-center gap-1.5">
          <Avatar src={me.avatarUrl} name={me.name} size={64} />
          <span className="max-w-20 truncate text-xs text-[var(--color-dim)]">{me.name}</span>
        </div>
        <span className="display text-3xl text-[var(--color-neon)] opacity-60">×</span>
        <div className="flex flex-col items-center gap-1.5">
          <Avatar src={them.avatarUrl} name={them.name} size={64} />
          <span className="max-w-20 truncate text-xs text-[var(--color-dim)]">{them.name}</span>
        </div>
      </div>

      <ScoreRing score={shown} size={216} label="compatibilidad" animate={false} />

      {/* Escalón */}
      <div className="rise flex flex-col items-center gap-2 text-center">
        <p className="display text-4xl leading-none text-[var(--color-gold)] glow-gold">
          {result.tier.emoji} {result.tier.name}
        </p>
        <p className="max-w-sm text-[0.98rem] text-[var(--color-muted)]">{result.tier.tagline}</p>
      </div>

      {/* Premio */}
      <div className="card w-full border-[rgba(255,200,87,0.35)] bg-[rgba(255,200,87,0.06)] p-4 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Desbloquean juntos
        </p>
        <p className="mt-1.5 text-[1.02rem] font-semibold text-[var(--color-cream)]">
          {result.tier.perk}
        </p>
        {nextTier ? (
          <p className="mt-2 text-xs text-[var(--color-dim)]">
            A {nextTier.min - result.score} puntos de {nextTier.name}.
          </p>
        ) : null}
      </div>

      {/* La acción va acá arriba y no al final: entra en la primera pantalla,
          junto al número y al premio, que es cuando la persona decide. */}
      {mutual ? (
        <div className="card w-full border-[rgba(255,200,87,0.5)] bg-[rgba(255,200,87,0.12)] p-4 text-center">
          <p className="display text-2xl text-[var(--color-gold)]">💛 Match mutuo</p>
          {them.instagram ? (
            <a
              className="mt-1 inline-block text-sm font-semibold text-[var(--color-cream)] underline"
              href={`https://instagram.com/${them.instagram}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              @{them.instagram}
            </a>
          ) : (
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Los dos se dieron like. El resto es cosa de ustedes.
            </p>
          )}
        </div>
      ) : (
        <button
          className="btn btn-primary w-full text-base"
          onClick={sendLike}
          disabled={busy || liked}
        >
          {liked ? "♥ Like enviado" : `♡ Darle like a ${them.name}`}
        </button>
      )}

      {/* Coincidencias */}
      {result.highlights.length > 0 ? (
        <section className="w-full">
          <h3 className="mb-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-mint)]">
            En qué coinciden
          </h3>
          <div className="flex flex-col gap-2">
            {result.highlights.map((h) => (
              <div key={h.id} className="card flex items-start gap-3 p-3.5">
                <span className="mt-0.5 text-[var(--color-mint)]">◆</span>
                <div className="min-w-0">
                  <p className="text-[0.93rem] leading-snug text-[var(--color-cream)]">{h.copy}</p>
                  {h.shared.length > 0 ? (
                    <p className="mt-1 text-xs text-[var(--color-dim)]">
                      {h.shared.join(" · ")}
                    </p>
                  ) : (
                    <p className="mt-1 text-xs text-[var(--color-dim)]">{h.aLabel}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Choques */}
      {result.clashes.length > 0 ? (
        <section className="w-full">
          <h3 className="mb-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-neon)]">
            Dónde se van a pelear
          </h3>
          <div className="flex flex-col gap-2">
            {result.clashes.map((c) => (
              <div key={c.id} className="card flex items-start gap-3 p-3.5">
                <span className="mt-0.5 text-[var(--color-neon)]">✕</span>
                <div className="min-w-0">
                  <p className="text-[0.93rem] leading-snug text-[var(--color-cream)]">{c.copy}</p>
                  <p className="mt-1 text-xs text-[var(--color-dim)]">
                    <span className="text-[var(--color-muted)]">{me.name}:</span> {c.aLabel}
                    {" · "}
                    <span className="text-[var(--color-muted)]">{them.name}:</span> {c.bLabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {result.thin ? (
        <p className="text-center text-xs text-[var(--color-dim)]">
          Calculado sobre {result.answeredBoth} de {result.totalQuestions} preguntas — tomalo con
          pinzas.
        </p>
      ) : null}

      <div className="flex w-full gap-2 pt-1">
        <Link href="/comparar" className="btn btn-ghost flex-1 text-sm">
          Otro código
        </Link>
        <Link href="/matches" className="btn btn-ghost flex-1 text-sm">
          Mis matches
        </Link>
      </div>
    </div>
  );
}
