import crypto from "node:crypto";
import { cookies } from "next/headers";
import { db } from "./db";

/**
 * Google OAuth 2.0 authorization-code flow, hand-rolled.
 *
 * Deliberately not next-auth: this app runs on Next 16 and the whole auth
 * surface here is ~150 lines we fully control, with no peer-dependency risk.
 * The ID token is consumed straight from Google's token endpoint over TLS, so
 * per Google's own guidance signature verification is not required (we never
 * accept an id_token that arrived from the browser).
 */

const SESSION_COOKIE = "mm_session";
const STATE_COOKIE = "mm_oauth_state";
const SESSION_DAYS = 60;

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  code: string;
};

export type DbUser = {
  id: string;
  google_sub: string | null;
  email: string;
  name: string;
  avatar_url: string | null;
  code: string;
  display_name: string | null;
  age: number | null;
  city: string | null;
  instagram: string | null;
  bio: string | null;
  answers: Record<string, string | string[] | number>;
  onboarded_at: string | null;
  visible: boolean;
  is_demo: boolean;
};

/* ---------------------------------------------------------------- secrets */

function authSecret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 16) {
    throw new Error(
      "Falta AUTH_SECRET (mínimo 16 caracteres). Generá uno con: openssl rand -base64 48",
    );
  }
  return s;
}

export function googleConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export function devLoginEnabled(): boolean {
  return (
    process.env.ALLOW_DEV_LOGIN === "true" && process.env.VERCEL_ENV !== "production"
  );
}

/**
 * Origen público de la app.
 *
 * El orden importa y no es cosmético:
 *
 * 1. `APP_URL` — dominio propio, si lo hay. Manda siempre.
 * 2. En producción de Vercel, el dominio ESTABLE del proyecto. El `redirect_uri`
 *    de Google tiene que estar registrado en la consola, y las URLs de preview
 *    cambian en cada deploy: apuntar ahí rompería el login en cada push.
 * 3. El header `Host` de la request. NO `new URL(req.url)`: Next normaliza esa
 *    URL con el hostname del binding, no con el que pidió el navegador —
 *    entrando por `127.0.0.1` devolvía `localhost`, y como la cookie es
 *    host-scoped, la sesión se seteaba en un host y se leía en el otro. La
 *    sesión se perdía entera y el login parecía "no hacer nada".
 * 4. `VERCEL_URL` (previews) y localhost como últimos recursos.
 */
export function appOrigin(req?: Request): string {
  if (process.env.APP_URL) return process.env.APP_URL.replace(/\/$/, "");
  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (req) {
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    if (host) {
      const proto =
        req.headers.get("x-forwarded-proto") ??
        (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");
      return `${proto}://${host}`;
    }
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function redirectUri(req?: Request): string {
  return `${appOrigin(req)}/api/auth/callback`;
}

/**
 * Sanea un destino de redirección post-login.
 *
 * Sólo rutas internas: `//evil.com` y `/\evil.com` son rutas válidas para el
 * navegador y lo mandarían a otro dominio, así que no alcanza con pedir que
 * empiece con "/". Es el camino del QR: alguien escanea /m/ABC123 sin cuenta,
 * se loguea, y tiene que volver a la comparación — no a un sitio ajeno.
 */
export function safeNext(value: string | null | undefined, fallback = "/matches"): string {
  if (!value) return fallback;
  if (!value.startsWith("/")) return fallback;
  if (value.startsWith("//") || value.startsWith("/\\")) return fallback;
  return value;
}

/* ---------------------------------------------------------------- signing */

function b64url(buf: Buffer | string): string {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function unb64url(s: string): Buffer {
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

function sign(payload: object): string {
  const body = b64url(JSON.stringify(payload));
  const mac = crypto.createHmac("sha256", authSecret()).update(body).digest();
  return `${body}.${b64url(mac)}`;
}

function verify<T>(token: string | undefined): T | null {
  if (!token || !token.includes(".")) return null;
  const [body, mac] = token.split(".");
  let expected: Buffer;
  try {
    expected = crypto.createHmac("sha256", authSecret()).update(body).digest();
  } catch {
    return null;
  }
  const given = unb64url(mac ?? "");
  if (given.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(given, expected)) return null;
  try {
    const parsed = JSON.parse(unb64url(body).toString("utf8"));
    if (typeof parsed.exp === "number" && parsed.exp * 1000 < Date.now()) return null;
    return parsed as T;
  } catch {
    return null;
  }
}

/* ---------------------------------------------------------------- session */

export async function setSession(user: SessionUser): Promise<void> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DAYS * 24 * 3600;
  const token = sign({ ...user, exp });
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 3600,
  });
}

export async function clearSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

/** Session payload only — cheap, no DB roundtrip. */
export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  return verify<SessionUser>(jar.get(SESSION_COOKIE)?.value);
}

/** Full user row for the logged-in session, or null. */
export async function currentUser(): Promise<DbUser | null> {
  const s = await getSession();
  if (!s) return null;
  const q = await db();
  const rows = await q<DbUser[]>`SELECT * FROM users WHERE id = ${s.id} LIMIT 1`;
  return rows[0] ?? null;
}

/* ------------------------------------------------------------ oauth state */

export async function issueState(next: string): Promise<string> {
  const nonce = crypto.randomBytes(16).toString("hex");
  const token = sign({ nonce, next, exp: Math.floor(Date.now() / 1000) + 600 });
  const jar = await cookies();
  jar.set(STATE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return token;
}

export async function consumeState(
  given: string | null,
): Promise<{ next: string } | null> {
  const jar = await cookies();
  const stored = jar.get(STATE_COOKIE)?.value;
  jar.delete(STATE_COOKIE);
  if (!given || !stored || given !== stored) return null;
  const parsed = verify<{ nonce: string; next: string }>(stored);
  return parsed ? { next: parsed.next } : null;
}

/* --------------------------------------------------------------- google */

export function googleAuthUrl(state: string, req?: Request): string {
  const p = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? "",
    redirect_uri: redirectUri(req),
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
    access_type: "online",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${p}`;
}

type GoogleProfile = { sub: string; email: string; name?: string; picture?: string };

export async function exchangeCode(code: string, req?: Request): Promise<GoogleProfile> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      redirect_uri: redirectUri(req),
      grant_type: "authorization_code",
    }),
  });
  if (!res.ok) {
    throw new Error(`Google token exchange falló (${res.status}): ${await res.text()}`);
  }
  const data = (await res.json()) as { id_token?: string };
  if (!data.id_token) throw new Error("Google no devolvió id_token");
  const claims = JSON.parse(
    unb64url(data.id_token.split(".")[1]).toString("utf8"),
  ) as GoogleProfile & { aud?: string; iss?: string };

  if (claims.aud !== process.env.GOOGLE_CLIENT_ID) {
    throw new Error("id_token con audience inesperada");
  }
  if (!claims.email) throw new Error("Google no devolvió email");
  return claims;
}

/* ------------------------------------------------------------ user upsert */

async function freshCode(): Promise<string> {
  const q = await db();
  for (let attempt = 0; attempt < 30; attempt++) {
    const bytes = crypto.randomBytes(6);
    let code = "";
    for (let i = 0; i < 6; i++) code += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
    const clash = await q`SELECT 1 FROM users WHERE code = ${code} LIMIT 1`;
    if (clash.length === 0) return code;
  }
  throw new Error("No se pudo generar un código libre");
}

export async function upsertUser(p: {
  sub: string | null;
  email: string;
  name?: string;
  picture?: string;
}): Promise<DbUser> {
  const q = await db();
  const email = p.email.trim().toLowerCase();
  const name = (p.name ?? email.split("@")[0]).trim();

  const existing = await q<DbUser[]>`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
  if (existing[0]) {
    const rows = await q<DbUser[]>`
      UPDATE users SET
        google_sub = COALESCE(${p.sub}, google_sub),
        name       = ${name},
        avatar_url = COALESCE(${p.picture ?? null}, avatar_url),
        updated_at = now()
      WHERE id = ${existing[0].id}
      RETURNING *`;
    return rows[0];
  }

  const code = await freshCode();
  const rows = await q<DbUser[]>`
    INSERT INTO users (google_sub, email, name, avatar_url, code)
    VALUES (${p.sub}, ${email}, ${name}, ${p.picture ?? null}, ${code})
    RETURNING *`;
  return rows[0];
}

export function toSession(u: DbUser): SessionUser {
  return {
    id: u.id,
    email: u.email,
    name: u.display_name || u.name,
    avatarUrl: u.avatar_url,
    code: u.code,
  };
}
