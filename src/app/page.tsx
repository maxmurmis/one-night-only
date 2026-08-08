import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser, devLoginEnabled, googleConfigured, safeNext } from "@/lib/auth";
import { isComplete } from "@/lib/scoring";
import { COPY } from "@/lib/tiers";
import { QUESTIONS } from "@/lib/questions";
import { PREMIERE } from "@/lib/constants";
import { GoogleButton } from "@/components/GoogleButton";
import type { Answers } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function daysToPremiere(): number {
  const ms = new Date(PREMIERE).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

export default async function Landing({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next: rawNext } = await searchParams;
  // Alguien que escaneó un QR sin estar logueado llega con ?next=/m/CODIGO.
  const next = safeNext(rawNext, "/onboarding");

  let user = null;
  let dbDown = false;
  try {
    user = await currentUser();
  } catch {
    // Sin DATABASE_URL la landing igual tiene que renderizar y explicar qué falta.
    dbDown = true;
  }
  if (user) {
    redirect(
      isComplete((user.answers ?? {}) as Answers)
        ? next === "/onboarding"
          ? "/matches"
          : next
        : `/onboarding?next=${encodeURIComponent(next)}`,
    );
  }

  const days = daysToPremiere();
  const ready = googleConfigured();

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 pb-14">
      <header className="flex items-center justify-between py-5">
        <span className="chip border-[rgba(255,45,99,0.4)] text-[var(--color-neon-soft)]">
          Cinemark × One Night Only
        </span>
        <Link href="/beneficios" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-dim)]">
          Premios
        </Link>
      </header>

      <section className="rise flex flex-col gap-5 pt-6">
        <div className="flicker">
          <h1 className="display text-[4.2rem] leading-[0.86] text-[var(--color-cream)]">
            MOVIE
            <br />
            <span className="text-[var(--color-neon)] glow-neon">MATCH</span>
          </h1>
        </div>

        <p className="display text-2xl leading-tight text-[var(--color-gold)] glow-gold">
          {COPY.landing.hero}
        </p>

        <p className="text-[1.02rem] leading-relaxed text-[var(--color-muted)]">
          {COPY.landing.sub}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <span className="chip border-[rgba(255,200,87,0.35)] text-[var(--color-gold)]">
            ⏳ faltan {days} días
          </span>
          <span className="chip">🎬 {QUESTIONS.length} preguntas</span>
          <span className="chip">⚡ 2 minutos</span>
        </div>
      </section>

      <section className="mt-8 flex flex-col gap-3">
        {error ? (
          <div className="card border-[rgba(255,45,99,0.5)] bg-[rgba(255,45,99,0.08)] p-3 text-sm text-[var(--color-neon-soft)]">
            No pudimos entrar: <span className="font-mono text-xs">{error}</span>
          </div>
        ) : null}

        {dbDown ? (
          <div className="card border-[rgba(255,200,87,0.5)] bg-[rgba(255,200,87,0.06)] p-4 text-sm text-[var(--color-gold)]">
            <p className="font-semibold">Falta conectar la base de datos.</p>
            <p className="mt-1 text-[var(--color-muted)]">
              Seteá <code className="font-mono text-xs">DATABASE_URL</code> y recargá. Está todo
              explicado en <code className="font-mono text-xs">SETUP.md</code>.
            </p>
          </div>
        ) : null}

        {ready ? (
          <GoogleButton label={COPY.landing.cta} next={next} />
        ) : (
          <div className="card border-[rgba(255,200,87,0.5)] bg-[rgba(255,200,87,0.06)] p-4 text-sm text-[var(--color-gold)]">
            <p className="font-semibold">Falta el login de Google.</p>
            <p className="mt-1 text-[var(--color-muted)]">
              Cargá <code className="font-mono text-xs">GOOGLE_CLIENT_ID</code> y{" "}
              <code className="font-mono text-xs">GOOGLE_CLIENT_SECRET</code>. Paso a paso en{" "}
              <code className="font-mono text-xs">SETUP.md</code>.
            </p>
          </div>
        )}

        {devLoginEnabled() ? (
          <form
            action="/api/auth/dev"
            method="post"
            className="card flex flex-col gap-2 border-dashed p-3"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-dim)]">
              Modo prueba (sin Google)
            </p>
            <input type="hidden" name="next" value={next} />
            <input
              className="input"
              name="email"
              type="email"
              required
              placeholder="vos@ejemplo.com"
            />
            <input className="input" name="name" placeholder="Tu nombre" />
            <button className="btn btn-ghost w-full" type="submit">
              Entrar en modo prueba
            </button>
          </form>
        ) : null}
      </section>

      <section className="mt-10 flex flex-col gap-3">
        {COPY.landing.steps.map((s, i) => (
          <div key={s.title} className="card flex items-start gap-3.5 p-4">
            <span className="display text-3xl leading-none text-[var(--color-neon)] opacity-60">
              {i + 1}
            </span>
            <div>
              <p className="font-semibold text-[var(--color-cream)]">
                {s.emoji} {s.title}
              </p>
              <p className="mt-0.5 text-sm leading-relaxed text-[var(--color-muted)]">{s.text}</p>
            </div>
          </div>
        ))}
      </section>

      <footer className="mt-12 text-center text-xs leading-relaxed text-[var(--color-dim)]">
        <p>Una activación de Cinemark para el estreno de One Night Only.</p>
        <p className="mt-1">27 de agosto · función exclusiva para solteros.</p>
      </footer>
    </div>
  );
}
