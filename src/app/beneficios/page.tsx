import Link from "next/link";
import { getSession } from "@/lib/auth";
import { TIERS } from "@/lib/tiers";
import { Shell } from "@/components/Shell";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function BeneficiosPage() {
  const session = await getSession().catch(() => null);

  return (
    <Shell active={session ? "beneficios" : undefined} title="Lo que se llevan">
      <p className="-mt-1 mb-6 text-sm text-[var(--color-muted)]">
        El premio no es individual: se retira de a dos, con los dos códigos, en el candy de
        Cinemark. Cuanto más alto el match, mejor lo que sale.
      </p>

      <div className="flex flex-col gap-3">
        {TIERS.map((t, i) => (
          <div
            key={t.name}
            className="card overflow-hidden"
            style={{
              borderColor: i === 0 ? "rgba(255,200,87,0.5)" : undefined,
              background:
                i === 0
                  ? "linear-gradient(160deg, rgba(255,200,87,0.12), rgba(255,200,87,0.02))"
                  : undefined,
            }}
          >
            <div className="flex items-start gap-3.5 p-4">
              <span className="text-2xl leading-none">{t.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="display text-2xl text-[var(--color-cream)]">{t.name}</h2>
                  <span
                    className="display shrink-0 text-lg"
                    style={{ color: i === 0 ? "var(--color-gold)" : "var(--color-neon)" }}
                  >
                    {t.min}%+
                  </span>
                </div>
                <p className="mt-1 text-sm leading-snug text-[var(--color-muted)]">{t.tagline}</p>
                <p className="mt-2.5 text-[0.92rem] font-semibold leading-snug text-[var(--color-cream)]">
                  {t.perk}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-7 p-4 text-xs leading-relaxed text-[var(--color-dim)]">
        <p className="mb-1.5 font-semibold uppercase tracking-wider text-[var(--color-muted)]">
          Letra chica
        </p>
        <p>
          Beneficios válidos únicamente en la función exclusiva de One Night Only del 27 de agosto,
          presentando los dos códigos juntos en el candy. Un beneficio por par de códigos, no
          acumulable. Sujeto a disponibilidad de la sala.
        </p>
      </div>

      {!session ? (
        <Link href="/" className="btn btn-primary mt-6 w-full">
          Armar mi perfil
        </Link>
      ) : null}
    </Shell>
  );
}
