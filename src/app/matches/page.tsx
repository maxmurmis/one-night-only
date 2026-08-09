import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { isComplete } from "@/lib/scoring";
import { mutualMatches, rankedMatches, stats } from "@/lib/users";
import { COPY } from "@/lib/tiers";
import { Shell } from "@/components/Shell";
import { MatchCard } from "@/components/MatchCard";
import type { Answers } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function MatchesPage() {
  const user = await currentUser();
  if (!user) redirect("/");
  if (!isComplete((user.answers ?? {}) as Answers)) redirect("/onboarding");

  const [list, mutuals, counts] = await Promise.all([
    rankedMatches(user, 24),
    mutualMatches(user),
    stats(),
  ]);

  const mutualIds = new Set(mutuals.map((m) => m.profile.id));
  const rest = list.filter((m) => !mutualIds.has(m.profile.id));

  return (
    <Shell active="matches" title="Tus matches">
      <p className="-mt-1 mb-5 text-sm text-[var(--color-muted)]">
        {counts.people} personas ya armaron su perfil · {counts.matches} matches mutuos hasta ahora.
      </p>

      {mutuals.length > 0 ? (
        <section className="mb-7">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            💛 Match mutuo
          </h2>
          <div className="flex flex-col gap-3">
            {mutuals.map((m, i) => (
              <MatchCard
                key={m.profile.id}
                profile={m.profile}
                result={m.result}
                liked
                likesYou
                rank={i + 1}
              />
            ))}
          </div>
        </section>
      ) : null}

      {rest.length === 0 && mutuals.length === 0 ? (
        <div className="card flex flex-col items-center gap-4 p-8 text-center">
          <span className="text-4xl">🎞️</span>
          <p className="text-[var(--color-muted)]">{COPY.micro.emptyFeed}</p>
          <Link href="/perfil" className="btn btn-primary">
            Compartir mi código
          </Link>
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        {rest.map((m, i) => (
          <MatchCard
            key={m.profile.id}
            profile={m.profile}
            result={m.result}
            liked={m.liked}
            likesYou={m.likesYou}
            rank={i + 1 + mutuals.length}
          />
        ))}
      </div>

      <div className="card mt-7 flex flex-col gap-3 p-5 text-center">
        <p className="display text-2xl text-[var(--color-cream)]">
          ¿Lo tenés al lado en la fila?
        </p>
        <p className="text-sm text-[var(--color-muted)]">{COPY.micro.compareCta}</p>
        <Link href="/comparar" className="btn btn-gold">
          Comparar por código
        </Link>
      </div>
    </Shell>
  );
}
