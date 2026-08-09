/**
 * Puebla la base con perfiles de demo para que la app no arranque vacía.
 *
 *   npm run seed         → 45 perfiles
 *   npm run seed -- 120  → 120 perfiles
 *   npm run seed -- --clean → borra los de demo y sale
 *
 * Los perfiles NO son ruido uniforme: se generan a partir de arquetipos con
 * mutación, así hay clusters reales y el ranking muestra rangos de 30% a 95%.
 * Con respuestas puramente al azar todo el padrón daría ~47% y el producto se
 * vería roto aunque el algoritmo estuviera bien.
 */
import "./env";
import { sql, ensureSchema } from "../src/lib/db";
import { QUESTIONS } from "../src/lib/questions";
import { MOVIES, PEOPLE } from "../src/lib/catalog";
import type { Answers, Question } from "../src/lib/types";

const NOMBRES = [
  "Sofía", "Valentina", "Mateo", "Joaquín", "Camila", "Benjamín", "Lucía", "Tomás",
  "Martina", "Santiago", "Julieta", "Nicolás", "Delfina", "Facundo", "Agustina",
  "Bautista", "Catalina", "Ignacio", "Renata", "Lautaro", "Milagros", "Franco",
  "Emilia", "Gonzalo", "Pilar", "Bruno", "Malena", "Federico", "Rocío", "Manuel",
  "Ámbar", "Thiago", "Guadalupe", "Ramiro", "Victoria", "Emiliano", "Antonia",
  "Lisandro", "Micaela", "Dante", "Paloma", "Ezequiel", "Zoe", "Iván", "Abril",
  "Cristian", "Brenda", "Axel", "Ludmila", "Nahuel",
];

const APELLIDOS = [
  "Gómez", "Fernández", "López", "Martínez", "Díaz", "Rodríguez", "Sosa", "Romero",
  "Torres", "Álvarez", "Ruiz", "Benítez", "Acosta", "Medina", "Herrera", "Aguirre",
  "Pereyra", "Giménez", "Molina", "Silva", "Castro", "Ortiz", "Núñez", "Rojas",
];

const CIUDADES = [
  "CABA", "Palermo", "Villa Crespo", "La Plata", "Vicente López", "Rosario",
  "Córdoba", "Caballito", "San Isidro", "Quilmes", "Belgrano", "Tigre",
];

const BIOS = [
  "Lloré con Coco y no me arrepiento",
  "Me sé el monólogo de Relatos Salvajes de memoria",
  "Voy al cine solo y me parece un plan de diez",
  "Tengo Letterboxd pero no lo uso, lo juro",
  "Si la peli dura más de 3 horas, mejor",
  "Vi Titanic 14 veces y sigo esperando otro final",
  "El cine es la única app de citas que me funcionó",
  "Me quedo hasta el último crédito, siempre",
  "Pochoclo grande aunque vaya solo",
  "Prefiero la peli mala del domingo que la buena del lunes",
  "Un día voy a terminar de ver Twin Peaks",
  "Fui a un cineclub y no entendí nada. Volví igual.",
];

function rnd<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  while (out.length < n && copy.length > 0) {
    out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  }
  return out;
}

function randomAnswer(q: Question): Answers[string] {
  if (q.kind === "scale") return 1 + Math.floor(Math.random() * 5);
  if (q.catalog) {
    const pool = q.catalog === "movies" ? MOVIES : PEOPLE;
    // Sesgamos hacia lo popular, como haría una persona real.
    const weighted = pool.flatMap((i) => Array(i.popularity).fill(i.id) as string[]);
    return Array.from(new Set(pickN(weighted, q.maxSelect ?? 3)));
  }
  const v = rnd(q.options).value;
  return q.kind === "multi" ? [v] : v;
}

function makeArchetype(): Answers {
  const a: Answers = {};
  for (const q of QUESTIONS) a[q.id] = randomAnswer(q);
  return a;
}

/** Copia el arquetipo mutando cada respuesta con probabilidad `rate`. */
function mutate(base: Answers, rate: number): Answers {
  const a: Answers = {};
  for (const q of QUESTIONS) {
    a[q.id] = Math.random() < rate ? randomAnswer(q) : base[q.id];
  }
  return a;
}

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function code(): string {
  let s = "";
  for (let i = 0; i < 6; i++) {
    s += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return s;
}

async function main() {
  await ensureSchema();

  const args = process.argv.slice(2);
  if (args.includes("--clean")) {
    const del = await sql`DELETE FROM users WHERE is_demo = true RETURNING id`;
    console.log(`🧹 ${del.length} perfiles de demo borrados.`);
    await sql.end();
    return;
  }

  const n = Number(args[0]) || 45;
  const archetypes = Array.from({ length: 6 }, makeArchetype);

  let created = 0;
  for (let i = 0; i < n; i++) {
    const nombre = rnd(NOMBRES);
    const apellido = rnd(APELLIDOS);
    const email = `demo${i}.${nombre.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")}@moviematch.demo`;
    const base = archetypes[i % archetypes.length];
    // Mutación variable: algunos casi clones del arquetipo, otros muy lejos.
    const answers = mutate(base, 0.15 + Math.random() * 0.55);

    try {
      await sql`
        INSERT INTO users (email, name, display_name, code, age, city, bio, answers, onboarded_at, is_demo, visible)
        VALUES (
          ${email},
          ${`${nombre} ${apellido}`},
          ${nombre},
          ${code()},
          ${20 + Math.floor(Math.random() * 22)},
          ${rnd(CIUDADES)},
          ${Math.random() < 0.7 ? rnd(BIOS) : null},
          ${sql.json(answers as never)},
          now(),
          true,
          true
        )
        ON CONFLICT (email) DO NOTHING`;
      created++;
    } catch (e) {
      console.error(`  ✗ ${email}`, e instanceof Error ? e.message : e);
    }
  }

  const [{ n: total }] = await sql<{ n: string }[]>`
    SELECT count(*)::text AS n FROM users WHERE onboarded_at IS NOT NULL`;
  console.log(`🍿 ${created} perfiles de demo cargados. Padrón total: ${total}.`);
  console.log("   Para borrarlos: npm run seed -- --clean");
  await sql.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
