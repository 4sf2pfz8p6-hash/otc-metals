import { Pool } from "pg";
export const pool = new Pool({ user: "mac", host: "localhost", database: "otc_metals_dev", password: "", port: 5432, max: 10, idleTimeoutMillis: 30000 });
