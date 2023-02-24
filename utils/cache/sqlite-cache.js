const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function init() {
  const db = await sqlite.open({
    filename: "cache.db",
    driver: sqlite3.Database,
  });
  await db.exec(
    `CREATE TABLE IF NOT EXISTS cache (
      key TEXT, 
      value TEXT
    )`
  );
  return db;
}

const dbPromise = init();

module.exports = async function (key, valueGetter, expiryHours) {
  const db = await dbPromise;
  const record = await db.get(
    `SELECT value FROM cache WHERE key = ?`,
    key,
  );
  if (record) {
    return JSON.parse(record.value);
  }
  else {
    const value = await valueGetter();
    await db.run(
      "INSERT INTO cache (key, value) VALUES (?, ?)",
      key,
      JSON.stringify(value),
    );
    return value;
  }
};
