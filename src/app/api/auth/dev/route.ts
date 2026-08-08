import { NextResponse } from "next/server";
import { appOrigin, devLoginEnabled, safeNext, setSession, toSession, upsertUser } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Login de desarrollo — SOLO cuando ALLOW_DEV_LOGIN=true y el entorno no es
 * producción de Vercel. Existe para poder recorrer la app entera sin haber
 * creado todavía las credenciales de Google. En producción esta ruta responde
 * 404 aunque la variable esté seteada por error.
 */
export async function POST(req: Request) {
  if (!devLoginEnabled()) {
    return NextResponse.json({ error: "no disponible" }, { status: 404 });
  }

  const form = await req.formData().catch(() => null);
  const raw = (form?.get("email") as string | null) ?? "";
  const email = raw.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.redirect(new URL("/?error=email-invalido", appOrigin(req)), 303);
  }

  const name = ((form?.get("name") as string | null) ?? "").trim() || email.split("@")[0];
  const wanted = safeNext(form?.get("next") as string | null, "/matches");
  const user = await upsertUser({ sub: null, email, name });
  await setSession(toSession(user));
  return NextResponse.redirect(
    new URL(`/onboarding?next=${encodeURIComponent(wanted)}`, appOrigin(req)),
    303,
  );
}
