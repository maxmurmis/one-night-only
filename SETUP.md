# Setup — lo que falta es sólo humano

La app está construida, probada y commiteada. Lo que sigue son las cuentas y
credenciales que sólo podés crear vos. **Son 4 pasos, ~15 minutos.**

Al final, `https://tu-app.vercel.app/api/health` tiene que devolver
`{"ready": true, ...}`. Ese es el semáforo: si algo falta, ahí dice cuál.

---

## 0. Verla andando en tu máquina (2 min, opcional pero recomendado)

Ya hay un Postgres local en docker con 45 perfiles de demo cargados. Si sigue
levantado:

```bash
cd ~/Desktop/movie-match
npm run dev
# abrí http://localhost:3000
```

En la landing hay un recuadro **"Modo prueba (sin Google)"**: poné cualquier
email y entrás. Sirve para recorrer todo antes de tocar Google.

Si el docker no está corriendo:

```bash
docker start mm-pg    # o, si no existe:
docker run -d --name mm-pg -e POSTGRES_PASSWORD=movie -e POSTGRES_USER=movie \
  -e POSTGRES_DB=moviematch -p 55432:5432 postgres:16-alpine
npm run seed          # 45 perfiles de demo
```

---

## 1. Base de datos (5 min)

Cualquier Postgres sirve. **Recomendado: Neon** — tiene plan gratis permanente
y se integra a Vercel en un click.

### Opción A — Neon desde Vercel (la más corta)

1. Creá el proyecto en Vercel (paso 3) y andá a **Storage → Create Database → Neon**.
2. Vercel te inyecta `DATABASE_URL` solo. No tenés que copiar nada.

### Opción B — Neon directo

1. https://neon.tech → **New Project** (región: `aws-sa-east-1`, São Paulo).
2. Copiá la connection string **"Pooled connection"**.
3. Esa es tu `DATABASE_URL`.

### Opción C — Supabase (si preferís la cuenta que ya tenés)

1. Project Settings → **Database** → **Connection pooling** (puerto **6543**, modo
   *Transaction*).
2. Copiá esa URL. El usuario es `postgres.<project-ref>`.

> **No hace falta correr ninguna migración.** La app crea las tablas sola en el
> primer request. El modelo está en `db/schema.sql` si lo querés leer o crear a mano.

---

## 2. Login con Google (5 min)

1. https://console.cloud.google.com/apis/credentials
2. Si es un proyecto nuevo: **OAuth consent screen** → *External* → nombre de la
   app "Movie Match", tu mail de soporte, guardar. Dejalo en **Testing** si sólo
   van a entrar ustedes; para el público, **Publish app** (no necesita revisión
   de Google porque sólo pedimos `email` y `profile`).
3. **Create credentials → OAuth client ID → Web application**.
4. **Authorized JavaScript origins:**
   ```
   http://localhost:3000
   https://TU-APP.vercel.app
   ```
5. **Authorized redirect URIs** (esto es lo que más se equivoca — la ruta importa):
   ```
   http://localhost:3000/api/auth/callback
   https://TU-APP.vercel.app/api/auth/callback
   ```
6. Copiá **Client ID** y **Client Secret**.

> Si después ponés dominio propio, agregá también
> `https://tudominio.com/api/auth/callback` **y** seteá `APP_URL=https://tudominio.com`
> en Vercel, **sólo en el entorno Production** (la UI de Vercel marca los tres por
> default: destildá Preview y Development). Sin `APP_URL`, la app usa el dominio
> `.vercel.app` para armar el `redirect_uri`, y Google rechaza cualquier URI no
> registrada. La app ignora `APP_URL` en los previews justamente para que no
> rompan.

---

## 3. Deploy a Vercel (5 min)

### 3.1 Subir el repo

El repo está commiteado localmente pero **no lo publiqué en GitHub** — esa es
una acción tuya. Dos comandos:

```bash
cd ~/Desktop/movie-match
gh repo create movie-match --private --source=. --push
```

(o creá el repo a mano en github.com y `git remote add origin ... && git push -u origin main`)

### 3.2 Importar en Vercel

1. https://vercel.com/new → importá el repo.
2. Framework: **Next.js** (lo detecta solo). No cambies nada del build.
3. **Environment Variables** — cargá estas cuatro:

   | Variable | Valor |
   |---|---|
   | `DATABASE_URL` | la del paso 1 (si usaste Neon-desde-Vercel, ya está) |
   | `AUTH_SECRET` | generalo con `openssl rand -base64 48` |
   | `GOOGLE_CLIENT_ID` | del paso 2 |
   | `GOOGLE_CLIENT_SECRET` | del paso 2 |

4. **Deploy.**

> **`ALLOW_DEV_LOGIN` no va a Vercel, ni siquiera en preview.** El modo prueba
> sólo se enciende si `DATABASE_URL` apunta a `localhost`/`127.0.0.1`, así que
> aunque la variable se cuele al dashboard queda inerte. Es a propósito: un
> preview hereda por default la misma base y el mismo `AUTH_SECRET` que
> producción, y la cookie de sesión no lleva el host adentro — una sesión emitida
> en preview valdría igual en producción.

### 3.3 Verificar

```bash
curl https://TU-APP.vercel.app/api/health
```

Tiene que decir `"ready": true`. Si no, el mismo JSON dice qué falta
(`database`, `authSecret`, `google`).

Después entrá a la app con Google y completá tu perfil. Listo.

---

## 4. Antes del 27 de agosto

- [ ] **Borrar los perfiles de demo** cuando empiece a entrar gente real:
      `DATABASE_URL="<la de prod>" npm run seed -- --clean`
      (borra sólo los que tienen `is_demo = true`; a los reales no los toca).
- [ ] **Revisar los premios de cada escalón** con Cinemark. Están en
      `src/lib/content.ts` → `tiers`. Los porcentajes de corte están calibrados
      (ver `DECISIONES.md`), pero *qué* se regala en cada escalón es decisión
      comercial, no técnica.
- [ ] **Imprimir el QR** o poner un cartel con la URL en el lobby. Cada persona
      tiene además su propio QR en `/perfil`.
- [ ] Si tocaste preguntas o pesos: `npm run db:check` antes de deployar. Te
      muestra la distribución de scores y valida que el contenido esté sano.

---

## Comandos

```bash
npm run dev       # desarrollo, http://localhost:3000
npm run build     # build de producción (lo mismo que corre Vercel)
npm run seed      # 45 perfiles de demo  ·  npm run seed -- 120  ·  -- --clean
npm run db:check  # distribución del algoritmo + validación del contenido
```
