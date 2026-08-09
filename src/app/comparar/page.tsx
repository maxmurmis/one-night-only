import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { isComplete } from "@/lib/scoring";
import { COPY } from "@/lib/tiers";
import { Shell } from "@/components/Shell";
import { CodeEntry } from "@/components/CodeEntry";
import { ShareCode } from "@/components/ShareCode";
import { qrDataUrl } from "@/lib/qr";
import { appOrigin } from "@/lib/auth";
import type { Answers } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function CompararPage() {
  const user = await currentUser();
  if (!user) redirect("/");
  if (!isComplete((user.answers ?? {}) as Answers)) redirect("/onboarding");

  const url = `${appOrigin()}/m/${user.code}`;
  const qr = await qrDataUrl(url);

  return (
    <Shell active="comparar" title="Comparar">
      <p className="-mt-1 mb-6 text-sm text-[var(--color-muted)]">{COPY.micro.codeExplainer}</p>

      <CodeEntry />

      <div className="divider my-8" />

      <ShareCode
        code={user.code}
        url={url}
        qr={qr}
        shareText={COPY.micro.shareText.replace("{code}", user.code)}
      />
    </Shell>
  );
}
