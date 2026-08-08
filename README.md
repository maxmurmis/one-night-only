# 🍿 Movie Match

**Cinemark × One Night Only — 27 de agosto de 2026.**

Una web app tipo Tinder donde la compatibilidad se calcula por afinidad
cinematográfica. Entrás con Google, contestás 14 preguntas en dos minutos, y a
partir de ahí podés compararte con cualquiera: en el ranking, o —lo que importa
en la función para solteros— **tipeando el código de seis caracteres de la
persona que tenés al lado en la fila del candy**. Cuanto más alto el match,
mejor el beneficio que desbloquean *juntos*.

> **Para ponerla en producción: [`SETUP.md`](SETUP.md).**
> **Por qué está hecha así: [`DECISIONES.md`](DECISIONES.md).**

---

## Qué hace

| Pantalla | Qué pasa ahí |
|---|---|
| `/` | Landing + login con Google. Cuenta los días que faltan para el estreno. |
| `/onboarding` | Las 14 preguntas, una por pantalla. Guarda a cada paso: si cierra el navegador, no pierde nada. |
| `/matches` | Ranking de compatibilidad contra todo el padrón. Los match mutuos arriba. |
| `/comparar` | El corazón de la activación: metés un código de 6 caracteres y ves el %. |
| `/m/[code]` | La revelación — el número sube animado, el escalón, el premio, en qué coinciden y dónde se van a pelear. Es también el destino del QR. |
| `/beneficios` | Los escalones y qué desbloquea cada uno. |
| `/perfil` | Tu código, tu QR, tus respuestas, y el switch para salir del ranking. |
| `/api/health` | Semáforo de configuración. Lo primero que hay que mirar tras deployar. |

## Cómo se calcula la compatibilidad

```
raw   = Σ (peso × similitud) / Σ peso        sobre lo que contestaron LOS DOS
score = curva(raw) − castigo por dealbreakers
```

Cuatro cosas que no son un promedio de igualdades:

- **Rareza.** Coincidir en una peli de nicho vale hasta 5× más que coincidir en
  Titanic. Es lo que hace que el desglose se sienta inteligente.
- **Complemento.** En el pochoclo, ser *distintos* puntúa más alto que ser
  iguales: uno dulce y otro salado comparten el balde. Un 100% exige pochoclo
  complementario — dos personas idénticas llegan a 97.
- **Dealbreakers.** Chocar en "¿hablás durante la película?" resta aparte del
  promedio, pero **sólo en los choques declarados** (`clashPairs`), no en
  cualquier diferencia.
- **Crédito parcial por género.** Dos personas que eligen tres comedias
  románticas distintas son compatibles aunque no compartan ningún título.

Todo esto vive en [`src/lib/scoring.ts`](src/lib/scoring.ts), con los números
medidos en los comentarios.

## Editar el contenido

**Un solo archivo:** [`src/lib/content.ts`](src/lib/content.ts) — preguntas,
pesos, catálogo de 140 películas y 70 caras, escalones de premios y todos los
textos. No tiene lógica.

Agregar o sacar una pregunta no rompe los perfiles ya cargados: el motor sólo
puntúa lo que contestaron las dos personas. Después de tocarlo:

```bash
npm run db:check   # distribución de scores + validación del contenido
```

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind 4 · Postgres · Vercel.
Un solo repo, front y back juntos. Sin ORM y sin librería de auth: las dos
piezas sensibles —el login con Google y el acceso a datos— son código propio y
legible, unas 150 líneas cada una.

```
src/
  app/            páginas + rutas de API
  components/     UI
  lib/
    content.ts    ← TODO el contenido de la campaña
    scoring.ts    ← el algoritmo
    auth.ts       ← OAuth de Google + sesión firmada
    db.ts         ← Postgres + creación del esquema
scripts/
  seed.ts         perfiles de demo
  check.ts        chequeo del algoritmo
db/schema.sql     el modelo, para leerlo de un vistazo
```

## Desarrollo

```bash
docker run -d --name mm-pg -e POSTGRES_PASSWORD=movie -e POSTGRES_USER=movie \
  -e POSTGRES_DB=moviematch -p 55432:5432 postgres:16-alpine
cp .env.example .env.local
npm install && npm run seed && npm run dev
```

Con `ALLOW_DEV_LOGIN=true` la landing muestra un login de prueba que no necesita
Google. Se apaga solo en producción.
