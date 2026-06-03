import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL?.trim();

function explainDbError(err: unknown): string {
  const e = err as { code?: string; message?: string };
  const code = e?.code;
  const message = e?.message || String(err);

  if (!connectionString) {
    return "[db] DATABASE_URL не задан. Render → Environment → добавьте строку из Supabase → Database → Connection string (URI).";
  }
  if (code === "28P01" || /password authentication failed/i.test(message)) {
    return (
      "[db] Неверный пароль в DATABASE_URL. Supabase → Database → Reset database password, " +
      "скопируйте новый URI в Render → DATABASE_URL → Manual Deploy / перезапуск."
    );
  }
  if (/does not support SSL/i.test(message)) {
    return "[db] Лишний SSL для этого хоста. Для Supabase URL должен содержать supabase.co; для localhost SSL не нужен.";
  }
  if (/SSL|certificate|TLS/i.test(message)) {
    return `[db] Ошибка SSL: ${message}`;
  }
  if (code === "ENOTFOUND" || code === "ECONNREFUSED") {
    return `[db] Сервер БД недоступен (${code}). Проверьте хост в DATABASE_URL и что проект Supabase не приостановлен.`;
  }
  if (code === "42P01" || /relation .* does not exist/i.test(message)) {
    return "[db] Нет таблицы projection.offers_state. Локально: npm run migrate. На проде — один раз с машины, где верный DATABASE_URL.";
  }
  return `[db] ${message}`;
}

const useSsl =
  process.env.PGSSLMODE === "require" ||
  (connectionString?.includes("supabase.co") ?? false);

export const pool = new Pool({
  connectionString,
  ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
});

pool.on("error", (err) => {
  console.error(explainDbError(err));
});

if (!connectionString) {
  console.error(
    "[db] DATABASE_URL не задан — API не сможет читать офферы. Задайте переменную в Render."
  );
} else {
  const safe = connectionString.replace(/:[^:@/]+@/, ":****@");
  console.log(`[db] Пул создан (${useSsl ? "SSL" : "без SSL"}): ${safe}`);

  pool
    .query("SELECT 1 AS ok")
    .then(() => console.log("[db] Проверка при старте: подключение OK"))
    .catch((err) => console.error("[db] Проверка при старте:", explainDbError(err)));

  pool
    .query(
      `SELECT EXISTS (
         SELECT 1 FROM information_schema.tables
         WHERE table_schema = 'projection' AND table_name = 'offers_state'
       ) AS exists`
    )
    .then((r) => {
      if (r.rows[0]?.exists) {
        console.log("[db] Таблица projection.offers_state: найдена");
      } else {
        console.error(
          "[db] Таблица projection.offers_state отсутствует — выполните npm run migrate"
        );
      }
    })
    .catch((err) => console.error("[db] Проверка таблицы:", explainDbError(err)));
}
