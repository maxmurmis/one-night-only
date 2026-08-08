import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { like, unlike, userById } from "@/lib/users";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "no autenticado" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as { userId?: string; undo?: boolean };

  // Validamos la forma del uuid ANTES de consultar: Postgres tira error de
  // sintaxis con cualquier string que no lo sea, y eso salía como un 500 con
  // el cuerpo vacío en vez de un 400 con su motivo.
  const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!body.userId || typeof body.userId !== "string" || !UUID.test(body.userId)) {
    return NextResponse.json({ error: "userId inválido" }, { status: 400 });
  }
  if (body.userId === session.id) {
    return NextResponse.json({ error: "no podés darte like a vos mismo" }, { status: 400 });
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
