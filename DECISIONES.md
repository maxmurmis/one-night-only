# Decisiones

Qué elegí y por qué, para que puedas discutir cualquiera de estas con criterio
—y para que Ian sepa qué se puede tocar sin miedo.

---

## De dónde salió el producto

Tres fuentes, y las tres decían cosas distintas:

- **El deck** (slide "MOVIE MATCH") fija los ejes que el cliente ya aprobó:
  pochoclo dulce/salado, género favorito, ubicación en la sala, película para la
  primera cita. Esos cuatro están, con el peso más alto del cuestionario.
- **El audio de Ian** agrega dos cosas que el deck no dice: *"todas las variables
  que vos quieras… obviamente no todo es cosas cinematográficas, pero es parte
  del chiste"*, y sobre todo el requisito operativo — **"los dos usuarios tienen
  que poder hacerlo ellos mismos"**. De ahí sale el código de 6 caracteres.
- **La última slide** dice *"ver cómo podemos hacerlo más simple"*.

**La respuesta a "más simple" es la que ordena todo el producto: el corazón no es
el feed, es la comparación de a dos.** Un ranking de compatibilidad contra
desconocidos es lo que ya hacen todas las apps y no aporta nada en un lobby de
cine. Lo que sí funciona parado en la fila del candy es: *decime tu código* →
número en pantalla → los dos miran el mismo teléfono. Por eso `/comparar` y
`/m/[code]` son el centro, `/matches` es secundario, y **no hay chat ni swipe**:
ese diálogo pasa en persona, que es todo el punto de la activación.

## Las 14 preguntas

Se generaron con tres propuestas independientes (una cinéfila, una masiva, una
enfocada en señal de cita real) y un editor que las unificó con un criterio duro:
**una pregunta que el 85% contesta igual no sirve para matchear**. Quedaron
descartadas, entre otras, "¿celular en la sala?" (casi todos dicen modo avión) y
todo lo que partía la base entre cinéfilos y gente normal (Letterboxd, créditos
post, frecuencia de sala).

El reparto es 4 de cine + 4 de sala + 2 de catálogo + 4 de "vibra" — esa última
tanda es el *"no todo es cinematográfico"* de Ian: cuánto hablás durante la peli,
qué hacés si es un plomo, qué pasa a las 22:30 cuando terminó la función.

Están todas en `src/lib/content.ts`, con su peso. **Cambiar una no rompe los
perfiles ya cargados**: el motor sólo puntúa lo que contestaron las dos personas.

## El algoritmo

Un promedio ponderado de igualdades hubiera sido lo obvio y hubiera sido flojo.
Cuatro cosas lo levantan, y las cuatro se ven en pantalla:

1. **Rareza (IDF).** En las preguntas de catálogo, coincidir vale en proporción
   inversa a lo masiva que es la película. Titanic aporta 1, *In the Mood for
   Love* aporta 5. Es lo que hace que el desglose se sienta inteligente en vez de
   una encuesta.

2. **Complemento.** En el pochoclo, ser **distintos** puntúa más alto que ser
   iguales: uno dulce y otro salado comparten el balde; dos salados se pelean por
   él. Consecuencia linda: **el 100% exige pochoclo complementario. Dos personas
   con respuestas idénticas llegan a 97.**

3. **Dealbreakers, pero de verdad.** Chocar en "¿hablás durante la peli?" resta
   aparte del promedio — sólo que **únicamente en los choques declarados**
   (`clashPairs`: el que hace shhh contra el que narra el final). La primera
   versión penalizaba cualquier desacuerdo y le restaba 12 puntos al **64% de los
   pares**: eso no es una señal, es una constante. Está medido en `db:check`.

4. **Crédito parcial por género.** Con 140 títulos y 3 elecciones por lado, dos
   desconocidos coinciden en una película el **1,4%** de las veces — o sea que la
   pregunta de mayor peso del cuestionario no hacía nada. Ahora el título exacto
   sigue siendo el premio mayor, pero compartir géneros da crédito parcial
   (coseno sobre los géneros elegidos). Esa sola pregunta pasó de aportar 0,014 a
   0,153 de similitud media.

### La calibración no es cosmética

El promedio crudo entre desconocidos da 0,29. Mostrar "29%" haría que la app
parezca rota: ése es el **piso estadístico**, no un veredicto. La curva
(`calibrate()` en `scoring.ts`) mapea ese piso a ~47 y reserva los 90+ para
coincidencias que de verdad son raras. Los parámetros están **ajustados contra la
distribución real medida**, no elegidos a ojo.

Contra los 45 perfiles sembrados (que sí tienen clusters, como la gente real):

```
mediana 46 · p75 55 · p95 72 · máx 90
20s ▓4,6%  30s ▓20,6%  40s ▓34,3%  50s ▓26,0%  60s ▓8,1%  70s ▓4,7%  80s ▓1,5%  90s ▓0,1%
```

Una campana con el premio top escaso. **Si tocás pesos o preguntas, corré
`npm run db:check` antes de deployar** — te muestra la distribución nueva y
valida el contenido.

### Lo que hay que decidir con Cinemark, no acá

Los **cortes de los escalones** (88 / 72 / 55 / 38 / 18) están calibrados para
que el premio grande sea escaso. **Qué se regala en cada escalón es decisión
comercial.** Está todo en `content.ts` → `tiers`, en texto plano.

---

## Decisiones técnicas

| Decisión | Por qué | La alternativa que descarté |
|---|---|---|
| **Next.js 16, un solo repo** | Front y back en el mismo proyecto, deploy directo a Vercel sin configurar nada. Es literalmente lo que pediste. | El esquema de `prode_2026` (Vite + FastAPI en Cloud Run) son dos deploys, dos repos y CORS. |
| **OAuth de Google a mano, sin `next-auth`** | `next-auth` v5 sigue en beta y Next 16 es nuevo: un choque de peer-deps a las 3 de la mañana sin nadie para arreglarlo es un riesgo peor que 150 líneas propias. El flujo *authorization-code* es estándar y está entero en `src/lib/auth.ts`. | `next-auth@beta`. |
| **Sesión en cookie firmada con HMAC** | Sin tabla de sesiones, sin Redis, sin round-trip a la base para saber quién sos. `HttpOnly` + `Secure` + `SameSite=lax`. | JWT de librería: la misma idea con una dependencia más. |
| **Postgres con SQL a mano (`postgres.js`), sin ORM** | 3 tablas. Un ORM acá es más superficie que ayuda. Las queries van parametrizadas por los tagged templates, así que inyección no hay. | Prisma / Drizzle. |
| **El esquema se crea solo en el primer request** | Vos no tenés que correr ninguna migración: seteás `DATABASE_URL` y anda. Todo es `IF NOT EXISTS`, y si dos instancias arrancan en frío a la vez, la carrera se detecta y se ignora. | `drizzle-kit push` / alembic: un paso manual más, justo el que se olvida. |
| **`prepare: false` en el cliente** | Obligatorio para el pooler en modo transacción de Supabase (pgbouncer) e inofensivo en Neon. Así la misma URL sirve para cualquiera de los dos. | Atarlo a un proveedor. |
| **Modo prueba sin Google** (`ALLOW_DEV_LOGIN`) | Para que pudieras recorrer la app entera antes de crear las credenciales. Sólo se enciende contra una base **local**: gatearlo por entorno no alcanzaba (ver abajo). | Que no puedas ver nada hasta terminar el trámite en la consola de Google. |
| **Los perfiles de demo son clusters, no ruido** | Con respuestas al azar **todo el padrón daría ~47%** y parecería que el algoritmo no discrimina. Los 45 perfiles salen de 6 arquetipos con mutación variable. | `Math.random()` puro. |
| **`is_demo` como columna** | `npm run seed -- --clean` borra los de demo sin tocar a nadie real. | Borrar por rango de fecha y rezar. |

## Tres bugs que sólo aparecieron probándolo en un navegador de verdad

Los dejo escritos porque los tres pasaban CI y `curl` sin chistar:

1. **`NextResponse.redirect()` devuelve 307 por defecto**, que *preserva el
   método*. El navegador re-enviaba el POST del login a `/onboarding` y quedabas
   en la landing sin ningún error visible. Todos los redirects son **303** ahora.
2. **`new URL(req.url).origin` no es el host que pidió el navegador.** Next
   normaliza esa URL con el hostname del binding: entrando por `127.0.0.1`
   devolvía `localhost`. Como la cookie es *host-scoped*, la sesión se escribía
   en un host y se leía en el otro — el login "no hacía nada". Ahora el origen
   sale del header `Host` (`appOrigin()`), que además es lo correcto detrás del
   proxy de Vercel.
3. **El desglose decía "cero coincidencias" al lado de una película que los dos
   habían elegido.** Coincidir en 1 de 3 títulos da similitud ~0,25 y caía del
   lado de los choques. Ahora compartir aunque sea un título ya cuenta como
   coincidencia.

## Lo que encontró la revisión adversarial

Después de tenerla andando le pasé una revisión por cuatro lentes (seguridad,
correctitud, deploy y experiencia real de la noche del evento), con cada hallazgo
verificado por un segundo revisor cuyo trabajo era refutarlo. Sobrevivieron
—y están arreglados— estos:

- **Fuga de contacto (la más seria).** `publicProfile()` mandaba el `@instagram`
  de todo el mundo al cliente. En pantalla sólo se pintaba en los match mutuos,
  pero el objeto entero viaja serializado en el HTML: con ver el código fuente
  del ranking salían los Instagram de todo el padrón. Ahora el gate es del lado
  del servidor (`revealContact`), verificado contra la tabla de likes.
- **El modo prueba podía tomar cualquier cuenta.** `upsertUser` busca por email,
  así que con el email de otra persona devolvía su fila y le firmaba una sesión
  válida. Peor: la cookie es un HMAC sin host adentro, y un preview de Vercel
  hereda por default la misma base y el mismo `AUTH_SECRET`. Ahora el modo
  prueba exige base **local** y rechaza cualquier cuenta que ya se haya
  autenticado con Google.
- **Los textos del pochoclo salían al revés en un tercio de los pares.** El modo
  complemento tiene tres desenlaces (se complementan / iguales / ninguno) y sólo
  había dos textos: a dos personas que habían elegido las dos "dulce" les decía
  *"uno dulce y el otro salado"*, con sus dos respuestas iguales impresas justo
  abajo. Ahora hay un texto por desenlace, y `db:check` falla si falta alguno.
- **Las respuestas de catálogo no se validaban contra el catálogo.** Un POST a
  mano podía guardar cualquier string de 80 caracteres, y ese texto se
  renderizaba como si fuera un título de película en la pantalla de la otra
  persona.
- **El chequeo de esquema miraba una sola tabla.** Si la creación fallaba después
  de `users`, se tomaba por una carrera inofensiva: la instancia no reintentaba,
  `/matches` tiraba 500 por `likes` inexistente y `/api/health` seguía diciendo
  "ok". Ahora verifica las tres.
- **`APP_URL` cargada en los tres entornos rompía el login en preview** de forma
  determinística (el `redirect_uri` apuntaba a producción y la cookie de estado
  quedaba en el host del preview). La app ignora `APP_URL` en previews.
- Más: doble tap en una opción saltaba una pregunta entera; el spinner del
  guardado final nunca aparecía (`useTransition` no espera una promesa); el
  autoguardado no corría en 10 de las 14 preguntas; un `userId` mal formado daba
  un 500 vacío; y el zoom estaba bloqueado.

## Límites conocidos

- **Escala.** El ranking trae hasta 600 perfiles y los puntúa en memoria por
  request. Para una activación de 15 días sobra. Arriba de unos pocos miles de
  usuarios habría que precomputar por lotes.
- **Sin moderación.** La bio y el nombre son texto libre. Para 200 personas
  invitadas está bien; para una campaña abierta hace falta un filtro.
- **Sin rate limit.** Los códigos son de 6 caracteres sobre un alfabeto de 32
  (~10⁹ combinaciones), así que enumerarlos no es práctico, pero si esto se
  abriera al público conviene poner un límite en `/api/compare`.
- **El login no anda en los deploys de *preview*** salvo que agregues esa URL a
  Google (cambian en cada push). Para probar en preview, `ALLOW_DEV_LOGIN=true`.
- **Los avatares de Google** se cargan con `<img>` plano, sin el optimizador de
  Next, para no tener que declarar dominios ni gastar cuota de imágenes.
