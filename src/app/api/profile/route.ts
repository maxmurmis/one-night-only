import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { saveProfile } from "@/lib/users";
import { completion } from "@/lib/scoring";
import type { Answers } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "no autenticado" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "json inválido" }, { status: 400 });
  }

  const patch: Parameters<typeof saveProfile>[1] = {};
  if (body.answers && typeof body.answers === "object") patch.answers = body.answers as Answers;
  if ("displayName" in body) patch.displayName = (body.displayName as string) ?? null;
  if ("city" in body) patch.city = (body.city as string) ?? null;
  if ("instagram" in body) patch.instagram = (body.instagram as string) ?? null;
  if ("bio" in body) patch.bio = (body.bio as string) ?? null;
  if ("visible" in body) patch.visible = Boolean(body.visible);
  if ("age" in body) {
    const n = Number(body.age);
    patch.age = Number.isFinite(n) && n > 0 ? n : null;
  }

  try {
    const user = await saveProfile(session.id, patch);
    return NextResponse.json({
      ok: true,
      completion: completion((user.answers ?? {}) as Answers),
      onboarded: Boolean(user.onboarded_at),
    });
  } catch (e) {
    console.error("[api/profile]", e);
    return NextResponse.json({ error: "no se pudo guardar" }, { status: 500 });
  }
}
