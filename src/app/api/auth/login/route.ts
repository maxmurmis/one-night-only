import { NextResponse } from "next/server";
import { appOrigin, googleAuthUrl, googleConfigured, issueState, safeNext } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const next = safeNext(url.searchParams.get("next"), "/onboarding");

  if (!googleConfigured()) {
    return NextResponse.redirect(new URL(`/?error=google-no-configurado&next=${encodeURIComponent(next)}`, appOrigin(req)), 303);
  }

  const state = await issueState(next);
  return NextResponse.redirect(googleAuthUrl(state, req), 303);
}
