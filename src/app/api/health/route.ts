import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { devLoginEnabled, googleConfigured } from "@/lib/auth";
import { QUESTIONS } from "@/lib/questions";
import { MOVIES, PEOPLE } from "@/lib/catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Chequeo de configuración: `curl https://tu-app.vercel.app/api/health`.
 *
 * Es lo primero que hay que mirar después de deployar — dice exactamente qué
 * variable falta en vez de dejarte adivinando frente a una pantalla en blanco.
 * No devuelve ningún secreto, sólo si está seteado.
 */
export async function GET() {
  const checks: Record<string, unknown> = {
    questions: QUESTIONS.length,
    movies: MOVIES.length,
    people: PEOPLE.length,
    authSecret: Boolean(process.env.AUTH_SECRET && process.env.AUTH_SECRET.length >= 16),
    google: googleConfigured(),
    devLogin: devLoginEnabled(),
  };

  try {
    const q = await db();
    const [row] = await q<{ n: string }[]>`SELECT count(*)::text AS n FROM users`;
    checks.database = "ok";
    checks.users = Number(row?.n ?? 0);
  } catch (e) {
    checks.database = "error";
    checks.databaseError = e instanceof Error ? e.message.slice(0, 200) : "desconocido";
  }

  const ready = checks.database === "ok" && checks.authSecret === true && checks.google === true;
  return NextResponse.json({ ready, ...checks }, { status: ready ? 200 : 503 });
}
