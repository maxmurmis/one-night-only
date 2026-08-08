"use client";

import { useState } from "react";

export function ShareCode({
  code,
  url,
  qr,
  shareText,
}: {
  code: string;
  url: string;
  qr: string;
  shareText: string;
}) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const data = { title: "Movie Match", text: shareText, url };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        // el usuario canceló: caemos a copiar
      }
    }
    try {
      await navigator.clipboard.writeText(`${shareText} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h2 className="display text-3xl text-[var(--color-cream)]">Tu código</h2>

      <p className="display text-6xl tracking-[0.2em] text-[var(--color-neon)] glow-neon">
        {code}
      </p>

      <div className="rounded-2xl border border-[var(--color-line)] bg-[rgba(255,255,255,0.03)] p-3">
        {/* QR generado en el server como data-URL: sin dependencias en el cliente. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qr} alt={`QR del código ${code}`} width={190} height={190} />
      </div>

      <p className="max-w-xs text-sm text-[var(--color-muted)]">
        Que te escaneen el QR o te tipeen el código y ven el porcentaje al instante. No hace falta
        que se sigan ni que se agreguen a nada.
      </p>

      <button className="btn btn-ghost" onClick={share}>
        {copied ? "✓ Copiado" : "Compartir mi código"}
      </button>
    </div>
  );
}
