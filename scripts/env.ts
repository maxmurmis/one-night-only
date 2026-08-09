/**
 * Carga de variables para los scripts de CLI.
 *
 * Next lee `.env.local` y dotenv lee `.env` — si no igualamos eso, el seed
 * falla con "falta DATABASE_URL" mientras la app anda perfecto, que es
 * exactamente el tipo de diferencia que hace perder media hora.
 */
import fs from "node:fs";
import path from "node:path";

const FILES = [".env.local", ".env.development.local", ".env"];

for (const file of FILES) {
  const full = path.join(process.cwd(), file);
  if (!fs.existsSync(full)) continue;
  for (const line of fs.readFileSync(full, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/i);
    if (!m) continue;
    const key = m[1];
    if (process.env[key] !== undefined) continue; // el primero gana
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}
