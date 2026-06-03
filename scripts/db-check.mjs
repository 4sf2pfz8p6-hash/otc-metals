import { createPool, explainDbError, getConnectionString } from "./lib/pg-config.mjs";

const pool = createPool(getConnectionString());

try {
  await pool.query("SELECT 1");
  console.log("Подключение к базе: работает.");
} catch (err) {
  console.log("Подключение к базе: не работает.");
  console.log("Причина:", explainDbError(err));
  process.exit(1);
}

try {
  const table = await pool.query(`
    SELECT EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'projection' AND table_name = 'offers_state'
    ) AS exists
  `);
  if (!table.rows[0].exists) {
    console.log("Таблица projection.offers_state: нет.");
    console.log("Выполните: npm run migrate");
    process.exit(1);
  }
  console.log("Таблица projection.offers_state: есть.");

  const participants = await pool.query(`
    SELECT EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'projection' AND table_name = 'participants'
    ) AS exists
  `);
  if (!participants.rows[0].exists) {
    console.log("Таблица projection.participants: нет.");
    console.log("Выполните: npm run migrate");
    process.exit(1);
  }
  console.log("Таблица projection.participants: есть.");

  const offersCount = await pool.query(
    `SELECT COUNT(*)::int AS n FROM projection.offers_state`
  );
  const participantsCount = await pool.query(
    `SELECT COUNT(*)::int AS n FROM projection.participants`
  );
  console.log(`Записей в offers_state: ${offersCount.rows[0].n}.`);
  console.log(`Записей в participants: ${participantsCount.rows[0].n}.`);
  if (offersCount.rows[0].n === 0) {
    console.log("Пустой рынок — GET /offers вернёт [].");
  }
} catch (err) {
  console.log("Проверка таблицы: ошибка.");
  console.log("Причина:", explainDbError(err));
  process.exit(1);
} finally {
  await pool.end();
}
