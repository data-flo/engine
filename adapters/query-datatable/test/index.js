const assert = require("node:assert");
const test = require("node:test");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");

const adaptor = require("../index.js");

test("query-datatable adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","num"
"Bovine","de","1"
"Gibbon","fr","1"
"Orangutan",,"0"
"Gorilla","gb","-2"
"Human","gb","0x"
"Mouse","GB",
`);

  await t.test("given a query and a datatable, it should return 2 rows", async () => {
    const output = await adaptor(
      {
        "data": createDatatable(testCsvFilePath),
        "query": `
          SELECT * WHERE a.Country == 'gb' || a.Country == 'GB'
        `,
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `id,Country,num\nGorilla,gb,-2\nHuman,gb,0x\nMouse,GB,\n`
    );
  });

});
