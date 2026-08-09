import { db } from "./db";
import type { DbUser } from "./auth";
import { compare, isComplete, stamp } from "./scoring";
import { QUESTIONS } from "./questions";
import { catalogItem } from "./catalog";
import type { Answers, MatchResult } from "./types";

/** Techo de candidatos que se puntúan en memoria por request. */
const CANDIDATE_CAP = 600;

export type PublicProfile = {
  id: string;
  code: string;
  name: string;
  avatarUrl: string | null;
  age: number | null;
  city: string | null;
  bio: string | null;
  instagram: string | null;
  stamp: string;
  isDemo: boolean;
};

/**
 * Proyección de un perfil para mandar al cliente.
 *
 * `revealContact` tiene que quedar en false salvo que el match mutuo esté
 * verificado EN EL SERVIDOR. Esconder el @instagram sólo en el render no
 * alcanza: el objeto entero viaja serializado en el HTML de los componentes de
 * cliente, así que cualquiera podía ver el código fuente del ranking y sacar el
 * Instagram de todas las personas del padrón sin darle like a nadie.
 */
export function publicProfile(u: DbUser, revealContact = false): PublicProfile {
  return {
    id: u.id,
    code: u.code,
    name: (u.display_name || u.name || "Alguien").trim(),
    avatarUrl: u.avatar_url,
    age: u.age,
    city: u.city,
    bio: u.bio,
    instagram: revealContact ? u.instagram : null,
    stamp: stamp((u.answers ?? {}) as Answers),
    isDemo: u.is_demo,
  };
}

/** ¿Se dieron like los dos? Es la condición para revelar el contacto. */
export async function areMutual(aId: string, bId: string): Promise<boolean> {
  const q = await db();
  const rows = await q`
    SELECT 1 FROM likes a
    JOIN likes b ON b.from_user = a.to_user AND b.to_user = a.from_user
    WHERE a.from_user = ${aId} AND a.to_user = ${bId}
    LIMIT 1`;
  return rows.length > 0;
}

export async function userByCode(code: string): Promise<DbUser | null> {
  const q = await db();
  const clean = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (clean.length !== 6) return null;
  const rows = await q<DbUser[]>`SELECT * FROM users WHERE code = ${clean} LIMIT 1`;
  return rows[0] ?? null;
}

export async function userById(id: string): Promise<DbUser | null> {
  const q = await db();
  const rows = await q<DbUser[]>`SELECT * FROM users WHERE id = ${id} LIMIT 1`;
  return rows[0] ?? null;
}

export type RankedMatch = { profile: PublicProfile; result: MatchResult; liked: boolean; likesYou: boolean };

/**
 * Ranking de compatibilidad contra todo el padrón visible.
 *
 * El score se calcula en memoria y no en SQL a propósito: la fórmula tiene
 * rareza por título y complementos, y sostenerla en SQL la volvería intocable.
 * A cambio, se acota a CANDIDATE_CAP perfiles (los más recientes en completar).
 * Para el volumen de una activación de 15 días alcanza de sobra; si esto
 * escalara a decenas de miles habría que precomputar por lotes.
 */
export async function rankedMatches(me: DbUser, limit = 40): Promise<RankedMatch[]> {
  const q = await db();
  const rows = await q<DbUser[]>`
    SELECT * FROM users
    WHERE id <> ${me.id}
      AND visible = true
      AND onboarded_at IS NOT NULL
    ORDER BY onboarded_at DESC
    LIMIT ${CANDIDATE_CAP}
  `;

  const [sent, received] = await Promise.all([
    q<{ to_user: string }[]>`SELECT to_user FROM likes WHERE from_user = ${me.id}`,
    q<{ from_user: string }[]>`SELECT from_user FROM likes WHERE to_user = ${me.id}`,
  ]);
  const sentSet = new Set(sent.map((r) => r.to_user));
  const recvSet = new Set(received.map((r) => r.from_user));

  const mine = (me.answers ?? {}) as Answers;
  return rows
    .map((u) => {
      const liked = sentSet.has(u.id);
      const likesYou = recvSet.has(u.id);
      return {
        profile: publicProfile(u, liked && likesYou),
        result: compare(mine, (u.answers ?? {}) as Answers),
        liked,
        likesYou,
      };
    })
    .filter((m) => !m.result.thin)
    .sort((a, b) => b.result.score - a.result.score)
    .slice(0, limit);
}

export async function mutualMatches(me: DbUser): Promise<RankedMatch[]> {
  const q = await db();
  const rows = await q<DbUser[]>`
    SELECT u.* FROM users u
    JOIN likes mine  ON mine.to_user   = u.id  AND mine.from_user  = ${me.id}
    JOIN likes theirs ON theirs.from_user = u.id AND theirs.to_user = ${me.id}
    ORDER BY u.onboarded_at DESC NULLS LAST
  `;
  const mine = (me.answers ?? {}) as Answers;
  return rows.map((u) => ({
    profile: publicProfile(u, true), // por definición son mutuos
    result: compare(mine, (u.answers ?? {}) as Answers),
    liked: true,
    likesYou: true,
  }));
}

export async function saveProfile(
  userId: string,
  patch: {
    displayName?: string | null;
    age?: number | null;
    city?: string | null;
    instagram?: string | null;
    bio?: string | null;
    visible?: boolean;
    answers?: Answers;
  },
): Promise<DbUser> {
  const q = await db();
  const current = await userById(userId);
  if (!current) throw new Error("Usuario no encontrado");

  const merged: Answers = { ...(current.answers ?? {}), ...(patch.answers ?? {}) };
  const valid = sanitizeAnswers(merged);
  const nowComplete = isComplete(valid);

  const rows = await q<DbUser[]>`
    UPDATE users SET
      display_name = ${patch.displayName !== undefined ? clip(patch.displayName, 40) : current.display_name},
      age          = ${patch.age !== undefined ? clampAge(patch.age) : current.age},
      city         = ${patch.city !== undefined ? clip(patch.city, 60) : current.city},
      instagram    = ${patch.instagram !== undefined ? cleanHandle(patch.instagram) : current.instagram},
      bio          = ${patch.bio !== undefined ? clip(patch.bio, 220) : current.bio},
      visible      = ${patch.visible !== undefined ? patch.visible : current.visible},
      answers      = ${q.json(valid as never)},
      onboarded_at = ${nowComplete ? (current.onboarded_at ?? new Date().toISOString()) : null},
      updated_at   = now()
    WHERE id = ${userId}
    RETURNING *`;
  return rows[0];
}

/** Sólo dejamos entrar valores que existan en el banco de preguntas. */
export function sanitizeAnswers(input: Answers): Answers {
  const out: Answers = {};
  for (const qn of QUESTIONS) {
    const v = input?.[qn.id];
    if (v === undefined || v === null) continue;

    if (qn.kind === "scale") {
      const n = Math.round(Number(v));
      if (Number.isFinite(n) && n >= 1 && n <= 5) out[qn.id] = n;
      continue;
    }

    // Las de catálogo se validan contra el catálogo, no sólo por longitud: sin
    // esto, un POST a mano podía guardar cualquier string de 80 caracteres, y
    // ese texto se renderizaba como si fuera un título en la pantalla de la
    // OTRA persona cuando se comparaban.
    const allowed = qn.catalog ? null : new Set(qn.options.map((o) => o.value));
    const values = (Array.isArray(v) ? v : [v])
      .filter((x): x is string => typeof x === "string" && x.length > 0 && x.length <= 80)
      .filter((x) =>
        qn.catalog ? Boolean(catalogItem(qn.catalog, x)) : allowed!.has(x),
      );

    if (values.length === 0) continue;

    if (qn.kind === "single") {
      out[qn.id] = values[0];
    } else {
      const cap = qn.maxSelect ?? 5;
      out[qn.id] = Array.from(new Set(values)).slice(0, cap);
    }
  }
  return out;
}

export async function like(fromId: string, toId: string): Promise<{ mutual: boolean }> {
  if (fromId === toId) return { mutual: false };
  const q = await db();
  await q`
    INSERT INTO likes (from_user, to_user) VALUES (${fromId}, ${toId})
    ON CONFLICT (from_user, to_user) DO NOTHING`;
  const back = await q`SELECT 1 FROM likes WHERE from_user = ${toId} AND to_user = ${fromId} LIMIT 1`;
  return { mutual: back.length > 0 };
}

export async function unlike(fromId: string, toId: string): Promise<void> {
  const q = await db();
  await q`DELETE FROM likes WHERE from_user = ${fromId} AND to_user = ${toId}`;
}

export async function logCompare(aId: string, bId: string, score: number): Promise<void> {
  const q = await db();
  await q`INSERT INTO compares (a_user, b_user, score) VALUES (${aId}, ${bId}, ${score})`;
}

export async function stats(): Promise<{ people: number; compares: number; matches: number }> {
  const q = await db();
  const [p] = await q<{ n: string }[]>`SELECT count(*)::text AS n FROM users WHERE onboarded_at IS NOT NULL`;
  const [c] = await q<{ n: string }[]>`SELECT count(*)::text AS n FROM compares`;
  const [m] = await q<{ n: string }[]>`
    SELECT (count(*) / 2)::text AS n FROM likes a
    JOIN likes b ON a.from_user = b.to_user AND a.to_user = b.from_user`;
  return { people: Number(p?.n ?? 0), compares: Number(c?.n ?? 0), matches: Number(m?.n ?? 0) };
}

/* ------------------------------------------------------------------ helpers */

function clip(v: string | null | undefined, max: number): string | null {
  if (v === null || v === undefined) return null;
  const s = String(v).trim().slice(0, max);
  return s.length ? s : null;
}

function clampAge(v: number | null | undefined): number | null {
  if (v === null || v === undefined) return null;
  const n = Math.round(Number(v));
  if (!Number.isFinite(n)) return null;
  if (n < 18 || n > 99) return null;
  return n;
}

function cleanHandle(v: string | null | undefined): string | null {
  if (!v) return null;
  const s = String(v)
    .trim()
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/^@/, "")
    .replace(/\/.*$/, "")
    .slice(0, 40);
  return /^[A-Za-z0-9._]{1,40}$/.test(s) ? s : null;
}
