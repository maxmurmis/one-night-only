import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { areMutual, publicProfile, userByCode, userById, logCompare } from "@/lib/users";
import { compare, isComplete } from "@/lib/scoring";
import type { Answers } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "no autenticado" }, { status: 401 });

  const { code } = await params;
  const target = await userByCode(code);
  if (!target) return NextResponse.json({ error: "No encontramos ese código." }, { status: 404 });

  const me = await userById(session.id);
  if (!me) return NextResponse.json({ error: "sesión inválida" }, { status: 401 });
  if (me.id === target.id) {
    return NextResponse.json({ error: "Ese es tu propio código 🙂" }, { status: 400 });
  }
  if (!isComplete((me.answers ?? {}) as Answers)) {
    return NextResponse.json({ error: "Completá tu perfil primero." }, { status: 409 });
  }
  if (!target.onboarded_at) {
    return NextResponse.json(
      { error: "Esa persona todavía no terminó su perfil." },
      { status: 409 },
    );
  }

  const result = compare((me.answers ?? {}) as Answers, (target.answers ?? {}) as Answers);
  await logCompare(me.id, target.id, result.score).catch(() => {});

  const mutual = await areMutual(me.id, target.id);
  return NextResponse.json({ profile: publicProfile(target, mutual), result, mutual });
}
