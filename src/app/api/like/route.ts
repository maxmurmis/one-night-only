import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { like, unlike, userById } from "@/lib/users";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "no autenticado" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as { userId?: string; undo?: boolean };
  if (!body.userId || typeof body.userId !== "string") {
    return NextResponse.json({ error: "falta userId" }, { status: 400 });
  }

  const target = await userById(body.userId);
  if (!target) return NextResponse.json({ error: "no existe" }, { status: 404 });

  if (body.undo) {
    await unlike(session.id, target.id);
    return NextResponse.json({ ok: true, liked: false, mutual: false });
  }

  const { mutual } = await like(session.id, target.id);
  return NextResponse.json({
    ok: true,
    liked: true,
    mutual,
    instagram: mutual ? target.instagram : null,
    name: target.display_name || target.name,
  });
}
