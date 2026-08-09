-- Esquema de Movie Match.
--
-- NO hace falta correr esto: la app crea las tablas sola en el primer request
-- (`ensureSchema()` en src/lib/db.ts, todo IF NOT EXISTS). Este archivo está
-- para poder leer el modelo de un vistazo, o para crearlo a mano desde el SQL
-- editor de Supabase / Neon si preferís que la app nunca toque el DDL.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  google_sub    text UNIQUE,                        -- "sub" del id_token de Google
  email         text UNIQUE NOT NULL,               -- identidad real: un email = una persona
  name          text NOT NULL DEFAULT '',
  avatar_url    text,
  code          text UNIQUE NOT NULL,               -- 6 caracteres, lo que se dice en la fila del cine
  display_name  text,
  age           int,
  city          text,
  instagram     text,                               -- sólo se revela en match mutuo
  bio           text,
  answers       jsonb NOT NULL DEFAULT '{}'::jsonb, -- { [questionId]: string | string[] | number }
  onboarded_at  timestamptz,                        -- NULL = perfil incompleto, no entra al ranking
  visible       boolean NOT NULL DEFAULT true,
  is_demo       boolean NOT NULL DEFAULT false,     -- los que carga `npm run seed`
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS likes (
  from_user  uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_user    uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind       text NOT NULL DEFAULT 'like',
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (from_user, to_user)                  -- el like es idempotente
);

-- Log de comparaciones. No lo necesita el producto: sirve para medir la
-- activación (cuánta gente se comparó de verdad en la sala) y para el reporte
-- al cliente.
CREATE TABLE IF NOT EXISTS compares (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  a_user     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  b_user     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score      int NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ix_users_visible ON users (visible, onboarded_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS ix_likes_to      ON likes (to_user);
CREATE INDEX IF NOT EXISTS ix_compares_a    ON compares (a_user, created_at DESC);
