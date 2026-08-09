import postgres from "postgres";

/**
 * Single Postgres client, reused across lambda invocations.
 *
 * Works against any Postgres URL: Neon, Supabase (session or transaction
 * pooler), Vercel Postgres, or a local docker container. `prepare: false` is
 * required for pgbouncer transaction-mode poolers (Supabase :6543) and is
 * harmless everywhere else.
 */

declare global {
   
  var __mm_sql: ReturnType<typeof postgres> | undefined;
   
  var __mm_schema: Promise<void> | undefined;
}

function connectionString(): string {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    "";
  if (!url) {
    throw new Error(
      "Falta DATABASE_URL. Copiá .env.example a .env.local y pegá la URL de tu Postgres (Neon / Supabase / Vercel Postgres).",
    );
  }
  return url;
}

/**
 * Conexiones de vida corta, pero NO una sola.
 *
 * `max: 1` parece lo correcto en serverless y acá cuelga la app entera: /matches
 * abre varias consultas en paralelo (el padrón, los likes dados, los recibidos)
 * y con un único lugar en el pool se traban entre ellas contra el pooler en modo
 * transacción — 40 segundos y sin respuesta, reproducible en local. Con tres
 * anda en 1,4s. Si algún día hay que bajarlo, primero hay que serializar esas
 * consultas.
 *
 * `idle_timeout` y `max_lifetime` sí importan: Vercel congela la instancia apenas
 * responde y la conexión queda tomada del lado del pooler con la transacción sin
 * cerrar (se ve como `SELECT * FROM users WHERE id = $1` en estado active
 * esperando ClientRead durante minutos). Reciclarlas evita que se acumulen.
 *
 * El cinturón —`statement_timeout` e `idle_in_transaction_session_timeout`— va del
 * lado del servidor con ALTER ROLE: como parámetro de conexión, el pooler en modo
 * transacción lo ignora en silencio (se pide 10s y `show statement_timeout` sigue
 * devolviendo 2min).
 */
function makeClient() {
  const url = connectionString();
  const isLocal = /@(127\.0\.0\.1|localhost)/.test(url);
  return postgres(url, {
    prepare: false,
    max: 3,
    idle_timeout: 10,
    max_lifetime: 60 * 5,
    connect_timeout: 10,
    ssl: isLocal ? false : "require",
  });
}

/**
 * Cliente perezoso a propósito: si se creara al importar el módulo, un deploy
 * sin DATABASE_URL rompería el render de la landing con un 500 en vez de
 * mostrar la tarjeta que explica qué falta configurar.
 */
export function client(): ReturnType<typeof postgres> {
  if (!global.__mm_sql) global.__mm_sql = makeClient();
  return global.__mm_sql;
}

/** Proxy con la misma cara que el cliente de postgres.js, pero perezoso. */
export const sql = new Proxy((() => {}) as unknown as ReturnType<typeof postgres>, {
  apply(_t, _this, args: unknown[]) {
    return (client() as unknown as (...a: unknown[]) => unknown)(...args);
  },
  get(_t, prop) {
    const value = (client() as unknown as Record<string | symbol, unknown>)[prop];
    return typeof value === "function" ? value.bind(client()) : value;
  },
});

/**
 * Idempotent schema creation. Runs once per warm instance; every statement is
 * IF NOT EXISTS so it is safe to call on every cold start. Chosen over a
 * migration step on purpose: the deploy has to work with zero manual commands.
 */
async function createSchema(): Promise<void> {
  // gen_random_uuid() es núcleo desde Postgres 13, así que esto es sólo una red
  // por si la base es más vieja. Si el rol no puede crear extensiones (pasa en
  // algunos planes gestionados) no es motivo para tumbar la app.
  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`.catch(() => {});

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      google_sub    text UNIQUE,
      email         text UNIQUE NOT NULL,
      name          text NOT NULL DEFAULT '',
      avatar_url    text,
      code          text UNIQUE NOT NULL,
      display_name  text,
      age           int,
      city          text,
      instagram     text,
      bio           text,
      answers       jsonb NOT NULL DEFAULT '{}'::jsonb,
      onboarded_at  timestamptz,
      visible       boolean NOT NULL DEFAULT true,
      is_demo       boolean NOT NULL DEFAULT false,
      created_at    timestamptz NOT NULL DEFAULT now(),
      updated_at    timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS likes (
      from_user  uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      to_user    uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      kind       text NOT NULL DEFAULT 'like',
      created_at timestamptz NOT NULL DEFAULT now(),
      PRIMARY KEY (from_user, to_user)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS compares (
      id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      a_user     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      b_user     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      score      int NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS ix_users_visible ON users (visible, onboarded_at DESC NULLS LAST)`;
  await sql`CREATE INDEX IF NOT EXISTS ix_likes_to ON likes (to_user)`;
  await sql`CREATE INDEX IF NOT EXISTS ix_compares_a ON compares (a_user, created_at DESC)`;
}

/**
 * Chequea TODO lo que crea createSchema, no sólo `users`.
 *
 * Mirando una sola tabla, un fallo a mitad de camino se tomaba por una carrera
 * inofensiva: la promesa quedaba resuelta, la instancia nunca reintentaba el
 * DDL, y /matches tiraba 500 por `likes` inexistente mientras /api/health
 * seguía diciendo "ok" porque sólo consultaba `users`.
 */
async function schemaExists(): Promise<boolean> {
  const rows = await sql<{ ok: boolean }[]>`
    SELECT
      to_regclass('public.users')    IS NOT NULL AND
      to_regclass('public.likes')    IS NOT NULL AND
      to_regclass('public.compares') IS NOT NULL AS ok`;
  return Boolean(rows[0]?.ok);
}

/**
 * El DDL no va en el camino caliente.
 *
 * Antes cada instancia en frío corría createSchema() completo. Todo es IF NOT
 * EXISTS y parecía gratis, pero CREATE TABLE pide ACCESS EXCLUSIVE igual: si
 * alguna sesión tenía una transacción abierta —cosa que pasa sola cuando Vercel
 * congela una instancia a mitad de query— el DDL se quedaba esperando el lock y,
 * peor, todos los SELECT que llegaban después hacían cola detrás de él. Eso eran
 * los /matches de 90 segundos: la base sana, la query en 0,13ms, y la página
 * esperando un lock que nadie soltaba.
 *
 * Ahora se pregunta primero, con un SELECT que no toma ningún lock, y sólo se
 * crea el esquema si de verdad falta (la primera vez, o una base nueva).
 */
async function ensureSchemaOnce(): Promise<void> {
  if (await schemaExists().catch(() => false)) return;
  await createSchema();
}

export function ensureSchema(): Promise<void> {
  if (!global.__mm_schema) {
    global.__mm_schema = ensureSchemaOnce().catch(async (err) => {
      // Dos instancias arrancando en frío a la vez pueden chocar en el CREATE
      // TABLE aunque diga IF NOT EXISTS (Postgres no lo serializa). Si al final
      // las tablas están, el error era de la carrera y no hay nada que reportar.
      if (await schemaExists().catch(() => false)) return;
      // Si de verdad falló, que el próximo request lo reintente en vez de
      // dejar el fallo cacheado para siempre en esta instancia.
      global.__mm_schema = undefined;
      throw err;
    });
  }
  return global.__mm_schema;
}

/** Every data-access path goes through here so the schema is guaranteed. */
export async function db() {
  await ensureSchema();
  return sql;
}
