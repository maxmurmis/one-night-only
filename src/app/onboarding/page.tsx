import { redirect } from "next/navigation";
import { currentUser, safeNext } from "@/lib/auth";
import { QUESTIONS } from "@/lib/questions";
import { MOVIES, PEOPLE } from "@/lib/catalog";
import { COPY } from "@/lib/tiers";
import { Quiz } from "@/components/Quiz";
import type { Answers } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const user = await currentUser();
  if (!user) redirect("/");
  const { next } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-lg px-5 pb-14">
      <Quiz
        questions={QUESTIONS}
        movies={MOVIES}
        people={PEOPLE}
        initialAnswers={(user.answers ?? {}) as Answers}
        initialMeta={{
          displayName: user.display_name ?? user.name ?? "",
          age: user.age ? String(user.age) : "",
          city: user.city ?? "",
          instagram: user.instagram ?? "",
          bio: user.bio ?? "",
        }}
        intro={COPY.micro.onboardingIntro}
        done={COPY.micro.onboardingDone}
        nextHref={safeNext(next, "/matches")}
      />
    </div>
  );
}
