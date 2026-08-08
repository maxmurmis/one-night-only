import { NextResponse } from "next/server";
import { appOrigin, consumeState, exchangeCode, safeNext, setSession, toSession, upsertUser } from "@/lib/auth";
import { isComplete } from "@/lib/scoring";
import type { Answers } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin = appOrigin(req);

  const error = url.searchParams.get("error");
  if (error) {
    return NextResponse.redirect(new URL(`/?error=${encodeURIComponent(error)}`, origin), 303);
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code) return NextResponse.redirect(new URL("/?error=sin-code", origin), 303);

  const st = await consumeState(state);
  if (!st) return NextResponse.redirect(new URL("/?error=state-invalido", origin), 303);

  try {
    const profile = await exchangeCode(code, req);
    const user = await upsertUser({
      sub: profile.sub,
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
    });
    await setSession(toSession(user));

    // A dónde queríamos ir antes del login (típicamente /m/CODIGO, escaneado de
    // un QR). Si todavía no completó el perfil, el destino viaja como query del
    // onboarding para no perderlo: es el recorrido central de la activación.
    const wanted = safeNext(st.next, "/matches");
    const done = isComplete((user.answers ?? {}) as Answers);
    const next = done
      ? wanted === "/onboarding"
        ? "/matches"
        : wanted
      : `/onboarding?next=${encodeURIComponent(wanted)}`;

    return NextResponse.redirect(new URL(next, origin), 303);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "error-desconocido";
    console.error("[auth/callback]", msg);
    return NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent(msg.slice(0, 120))}`, origin),
      303,
    );
  }
}
