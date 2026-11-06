import Link from "next/link";
import { redirect } from "next/navigation";
import { appOrigin, currentUser } from "@/lib/auth";
import { completion, isComplete, labelFor, stamp } from "@/lib/scoring";
import { QUESTIONS } from "@/lib/questions";
import { COPY } from "@/lib/tiers";
import { qrDataUrl } from "@/lib/qr";
import { Shell } from "@/components/Shell";
import { Avatar } from "@/components/Avatar";
import { ShareCode } from "@/components/ShareCode";
import { VisibilityToggle } from "@/components/VisibilityToggle";
import type { Answers } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function PerfilPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const answers = (user.answers ?? {}) as Answers;
  const done = isComplete(answers);
  const { answered, total, pct } = completion(answers);
  const url = `${appOrigin()}/m/${user.code}`;
  const qr = await qrDataUrl(url);

  return (
    <Shell active="perfil">
      <div className="flex flex-col items-center gap-3 pt-3 text-center">
        <Avatar src={user.avatar_url} name={user.display_name || user.name} size={88} />
        <div>
          <h1 className="display text-4xl text-[var(--color-cream)]">
            {user.display_name || user.name}
          </h1>
          <p className="mt-0.5 text-sm text-[var(--color-dim)]">
            {[user.age ? `${user.age}` : null, user.city].filter(Boolean).join(" · ")}
          </p>
        </div>
        <span className="stamp text-[var(--color-neon)]">{stamp(answers)}</span>
        {user.bio ? (
          <p className="max-w-sm text-sm text-[var(--color-muted)]">“{user.bio}”</p>
        ) : null}
      </div>

      {!done ? (
        <div className="card mt-6 flex flex-col gap-3 border-[rgba(255,200,87,0.4)] bg-[rgba(255,200,87,0.06)] p-4">
          <p className="font-semibold text-[var(--color-gold)]">
            Te faltan {total - answered} preguntas
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[rgba(0,0,0,0.08)]">
            <div
              className="h-full rounded-full"
              style={{
                width: `${pct}%`,
                background: "linear-gradient(90deg, var(--color-neon), var(--color-gold))",
              }}
            />
          </div>
          <p className="text-sm text-[var(--color-muted)]">
            Hasta que las completes no aparecés en los matches de nadie.
          </p>
          <Link href="/onboarding" className="btn btn-primary">
            Terminar mi perfil
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <ShareCode
            code={user.code}
            url={url}
            qr={qr}
            shareText={COPY.micro.shareText.replace("{code}", user.code)}
          />
        </div>
      )}

      <div className="divider my-8" />

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-dim)]">
            Tus respuestas
          </h2>
          <Link href="/onboarding" className="text-xs font-semibold text-[var(--color-neon-soft)]">
            Editar
          </Link>
        </div>
        <div className="card divide-y divide-[var(--color-line)]">
          {QUESTIONS.map((q) => (
            <div key={q.id} className="flex items-start justify-between gap-4 px-4 py-3">
              <span className="max-w-[52%] text-xs leading-snug text-[var(--color-dim)]">
                {q.prompt}
              </span>
              <span className="flex-1 text-right text-sm leading-snug text-[var(--color-cream)]">
                {labelFor(q, answers[q.id])}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="divider my-8" />

      <section className="flex flex-col gap-4">
        <VisibilityToggle initial={user.visible} />
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[var(--color-cream)]">Sesión</p>
            <p className="text-xs text-[var(--color-dim)]">{user.email}</p>
          </div>
          <a href="/api/auth/logout" className="btn btn-ghost py-2 text-sm">
            Salir
          </a>
        </div>
      </section>
    </Shell>
  );
}
