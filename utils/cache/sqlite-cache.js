const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

const stopwatch = require("../stopwatch.js");

const stringify = require("./stringify.js");

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
  stopwatch.start("sqlite cache get");
  const record = await db.get(
    `SELECT value FROM cache WHERE key = ?`,
    key,
  );
  stopwatch.stop("sqlite cache get");
  if (record) {
    return JSON.parse(record.value);
  }
  else {
    stopwatch.start("sqlite cache value");
    const value = await valueGetter();
    stopwatch.stop("sqlite cache value");

    stopwatch.start("sqlite cache insert");
    await db.run(
      "INSERT INTO cache (key, value) VALUES (?, ?)",
      key,
      stringify(value),
    );
    stopwatch.stop("sqlite cache insert");

    return value;
  }
};
