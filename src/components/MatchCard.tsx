"use client";

import Link from "next/link";
import { useState } from "react";
import type { MatchResult } from "@/lib/types";
import type { PublicProfile } from "@/lib/users";
import { Avatar } from "./Avatar";

export function MatchCard({
  profile,
  result,
  liked: likedInit,
  likesYou,
  rank,
}: {
  profile: PublicProfile;
  result: MatchResult;
  liked: boolean;
  likesYou: boolean;
  rank: number;
}) {
  const [liked, setLiked] = useState(likedInit);
  const [mutual, setMutual] = useState(likedInit && likesYou);
  const [busy, setBusy] = useState(false);

  const color =
    result.score >= 85 ? "var(--color-gold)" : result.score >= 60 ? "var(--color-neon)" : "var(--color-silver)";

  async function toggle() {
    setBusy(true);
    const undo = liked;
    const res = await fetch("/api/like", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId: profile.id, undo }),
    });
    const data = (await res.json().catch(() => ({}))) as { liked?: boolean; mutual?: boolean };
    setLiked(Boolean(data.liked));
    setMutual(Boolean(data.mutual));
    setBusy(false);
  }

  return (
    <article className="card overflow-hidden">
      <div className="flex items-center gap-3.5 p-4">
        <Avatar src={profile.avatarUrl} name={profile.name} size={54} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold text-[var(--color-cream)]">{profile.name}</h3>
            {profile.age ? (
              <span className="text-sm text-[var(--color-dim)]">{profile.age}</span>
            ) : null}
            {likesYou && !mutual ? (
              <span className="chip border-[rgba(255,200,87,0.4)] px-1.5 py-0.5 text-[0.58rem] text-[var(--color-gold)]">
                te dio like
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 truncate text-xs text-[var(--color-dim)]">
            {[profile.city, profile.stamp].filter(Boolean).join(" · ")}
          </p>
        </div>

        <div className="flex flex-col items-end">
          <span className="display text-3xl leading-none" style={{ color }}>
            {result.score}
            <span className="text-base">%</span>
          </span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-[var(--color-dim)]">
            #{rank}
          </span>
        </div>
      </div>

      {result.highlights.length > 0 ? (
        <div className="no-bar flex gap-2 overflow-x-auto px-4 pb-3">
          {result.highlights.slice(0, 3).map((h) => (
            <span key={h.id} className="chip shrink-0 normal-case text-[var(--color-muted)]">
              {h.shared.length > 0 ? h.shared[0] : h.aLabel}
            </span>
          ))}
        </div>
      ) : null}

      {mutual ? (
        <div className="border-t border-[rgba(255,200,87,0.3)] bg-[rgba(255,200,87,0.08)] px-4 py-2.5 text-sm text-[var(--color-gold)]">
          💛 Match mutuo.{" "}
          {profile.instagram ? (
            <a
              className="font-semibold underline"
              href={`https://instagram.com/${profile.instagram}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              @{profile.instagram}
            </a>
          ) : (
            "Búsquenlo en la función."
          )}
        </div>
      ) : null}

      <div className="flex gap-2 border-t border-[var(--color-line)] p-3">
        <Link href={`/m/${profile.code}`} className="btn btn-ghost flex-1 py-2 text-sm">
          Ver desglose
        </Link>
        <button
          onClick={toggle}
          disabled={busy}
          className="btn py-2 text-sm"
          style={{
            background: liked ? "rgba(221,0,0,0.18)" : "rgba(255,255,255,0.05)",
            borderColor: liked ? "var(--color-neon)" : "var(--color-line)",
            color: liked ? "var(--color-neon)" : "var(--color-cream)",
          }}
        >
          {liked ? "♥ Te di like" : "♡ Like"}
        </button>
      </div>
    </article>
  );
}
