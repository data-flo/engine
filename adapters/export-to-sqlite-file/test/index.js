const test = require("node:test");
const assert = require("node:assert");

const knex = require("knex");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");
const createFile = require("../../../types/file.js");
const tmpFilePath = require("../../../utils/file/tmp-path.js");

const adaptor = require("../index.js");

test("export-to-sqlite adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","a","b"
"2","alpha 2","beta 2"
"3","alpha 3","beta 3"
`
  );
  const sqliteFilePath = await tmpFilePath();

  await t.test("given a datatable with two rows, it should export it to a sqlite db", async () => {
    const instance = knex({
      "client": "sqlite3",
      "connection": { "filename": sqliteFilePath },
      "useNullAsDefault": true,
    });
    await instance.raw("CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY AUTOINCREMENT, a TEXT NOT NULL, b TEXT)");
    await instance.raw(`INSERT INTO data (a, b) VALUES ("alpha 1", "beta 1")`);

    const output = await runAdaptor(
      adaptor,
      {
        "sqlite": createFile(sqliteFilePath),
        "data": createDatatable(testCsvFilePath),
        "table name": "data",
        "id column name": "id",
      },
    );

    assert.ok(output.sqlite, "adaptor should return sqlite");
    assert.deepEqual(
      await instance.raw("SELECT * FROM data"),
      [
        { id: 1, a: "alpha 1", b: "beta 1" },
        { id: 2, a: "alpha 2", b: "beta 2" },
        { id: 3, a: "alpha 3", b: "beta 3" },
      ],
    );

    await instance.destroy();
  });

});
