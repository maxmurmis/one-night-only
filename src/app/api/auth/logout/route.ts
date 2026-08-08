import { NextResponse } from "next/server";
import { appOrigin, clearSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function bye(req: Request) {
  await clearSession();
  return NextResponse.redirect(new URL("/", appOrigin(req)), 303);
}

export const GET = bye;
export const POST = bye;
