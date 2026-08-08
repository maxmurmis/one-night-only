import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { compare, isComplete } from "@/lib/scoring";
import { logCompare, publicProfile, userByCode } from "@/lib/users";
import { TIERS } from "@/lib/tiers";
import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import type { Answers } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function ComparePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const clean = code.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);

  const me = await currentUser();
  if (!me) redirect(`/?next=${encodeURIComponent(`/m/${clean}`)}`);
  if (!isComplete((me.answers ?? {}) as Answers)) {
    redirect(`/onboarding?next=${encodeURIComponent(`/m/${clean}`)}`);
  }

  const target = await userByCode(clean);

  if (!target || !target.onboarded_at || target.id === me.id) {
    return (
      <Shell active="comparar" title="Sin función">
        <div className="card flex flex-col items-center gap-4 p-8 text-center">
          <span className="text-4xl">🎬</span>
          <p className="text-[var(--color-muted)]">
            {target?.id === me.id
              ? "Ese es tu propio código. Pasáselo a otra persona."
              : !target
                ? `No encontramos a nadie con el código ${clean}.`
                : "Esa persona todavía no terminó su perfil."}
          </p>
          <Link href="/comparar" className="btn btn-primary">
            Probar otro código
          </Link>
        </div>
      </Shell>
    );
  }

  const result = compare((me.answers ?? {}) as Answers, (target.answers ?? {}) as Answers);
  await logCompare(me.id, target.id, result.score).catch(() => {});

  return (
    <Shell active="comparar">
      <Reveal
        me={publicProfile(me)}
        them={publicProfile(target)}
        result={result}
        tiers={TIERS}
      />
    </Shell>
  );
}
