import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const useSsl =
  process.env.PGSSLMODE === "require" ||
  (connectionString?.includes("supabase.co") ?? false);

export const pool = new Pool({
  connectionString,
  ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
});
