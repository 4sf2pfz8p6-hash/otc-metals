import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sqlPath = path.join(__dirname, "..", "supabase", "001_projection_offers_state.sql");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Set DATABASE_URL (Supabase → Project Settings → Database → Connection string).");
  process.exit(1);
}

const sql = fs.readFileSync(sqlPath, "utf8");
const pool = new pg.Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

try {
  await pool.query(sql);
  console.log("Migration applied:", sqlPath);
} catch (e) {
  console.error(e);
  process.exit(1);
} finally {
  await pool.end();
}
