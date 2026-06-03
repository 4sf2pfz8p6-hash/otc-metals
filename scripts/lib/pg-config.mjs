import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

function loadDotEnv() {
  if (process.env.DATABASE_URL) return;
  const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
  const envPath = path.join(root, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

export function getConnectionString() {
  loadDotEnv();
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    console.error(
      "Не задана переменная DATABASE_URL.\n" +
        "Supabase: Project Settings → Database → Connection string (URI).\n" +
        "Локально: положите строку в файл .env или выполните: export DATABASE_URL='postgresql://...'"
    );
    process.exit(1);
  }
  return connectionString;
}

export function useSsl(connectionString) {
  return (
    process.env.PGSSLMODE === "require" ||
    connectionString.includes("supabase.co")
  );
}

export function createPool(connectionString = getConnectionString()) {
  const ssl = useSsl(connectionString);
  return new pg.Pool({
    connectionString,
    ...(ssl ? { ssl: { rejectUnauthorized: false } } : {}),
  });
}

/** Понятное описание ошибки PostgreSQL для логов и скриптов. */
export function explainDbError(err) {
  const code = err?.code;
  const message = err?.message || String(err);

  if (!process.env.DATABASE_URL?.trim()) {
    return "Переменная DATABASE_URL не задана (пустая или отсутствует).";
  }
  if (code === "28P01" || /password authentication failed/i.test(message)) {
    return (
      "Неверный пароль или логин в DATABASE_URL. " +
      "В Supabase: Project Settings → Database → Database password → Reset, " +
      "скопируйте новую Connection string (URI) и вставьте в Render → Environment → DATABASE_URL, затем перезапустите сервис."
    );
  }
  if (/does not support SSL/i.test(message)) {
    return (
      "Сервер не принимает SSL, а клиент пытается подключиться с SSL. " +
      "Для локального Postgres уберите supabase.co из URL или не задавайте PGSSLMODE=require."
    );
  }
  if (/SSL|certificate|TLS/i.test(message)) {
    return `Проблема SSL/TLS: ${message}`;
  }
  if (code === "ENOTFOUND" || code === "ECONNREFUSED") {
    return `Не удалось достучаться до сервера БД (${code}): проверьте хост и порт в DATABASE_URL.`;
  }
  if (code === "42P01" || /relation .* does not exist/i.test(message)) {
    return (
      "Таблица не найдена. Выполните: npm run migrate (нужен корректный DATABASE_URL)."
    );
  }
  if (/invalid URI|Invalid connection string/i.test(message)) {
    return "Некорректная строка DATABASE_URL — проверьте формат postgresql://user:password@host:port/dbname";
  }
  return message;
}
