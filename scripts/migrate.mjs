import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createPool, explainDbError, getConnectionString } from "./lib/pg-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const supabaseDir = path.join(__dirname, "..", "supabase");

const files = fs
  .readdirSync(supabaseDir)
  .filter((name) => name.endsWith(".sql"))
  .sort();

if (files.length === 0) {
  console.error("В папке supabase/ нет файлов .sql");
  process.exit(1);
}

const connectionString = getConnectionString();
const pool = createPool(connectionString);

console.log(`Подключение: ${connectionString.replace(/:[^:@/]+@/, ":****@")}`);
console.log(`Миграций к применению: ${files.length}\n`);

try {
  await pool.query("SELECT 1");
} catch (err) {
  console.error("Подключение не удалось:", explainDbError(err));
  process.exit(1);
}

for (const file of files) {
  const sqlPath = path.join(supabaseDir, file);
  const sql = fs.readFileSync(sqlPath, "utf8");
  try {
    await pool.query(sql);
    console.log(`OK  ${file}`);
  } catch (err) {
    console.error(`Ошибка в ${file}:`, explainDbError(err));
    process.exit(1);
  }
}

console.log("\nВсе миграции применены.");
await pool.end();
