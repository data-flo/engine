const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createFile = require("../../types/file");

await t.test("import-from-csv-file adaptor", async () => {

  await t.test("given a csv text, it should return a datatable", async () => {
    const testCsvFilePath = await createTmpTextFile(`"id","Country"
"Bovine","de"
"Gibbon","fr"
"Orangutan",
"Gorilla",
"Human","gb"
"Mouse","gb"
`);

    const output = await runAdaptor(
      adaptor,
      {
        file: createFile(testCsvFilePath),
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country"\n"Bovine","de"\n"Gibbon","fr"\n"Orangutan",\n"Gorilla",\n"Human","gb"\n"Mouse","gb"\n`,
    );
  });

  await t.test("given a csv text with bars, it should return a datatable", async () => {
    const testCsvFilePath = await createTmpTextFile(`"id"|"Country"
"Bovine"|"de"
"Gibbon"|"fr"
"Orangutan"|
"Gorilla"|
"Human"|"gb"
"Mouse"|"gb"
`);

    const output = await runAdaptor(
      adaptor,
      {
        file: createFile(testCsvFilePath),
        delimiter: "|",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country"\n"Bovine","de"\n"Gibbon","fr"\n"Orangutan",\n"Gorilla",\n"Human","gb"\n"Mouse","gb"\n`,
    );
  });

  await t.test("given a csv text with newline, it should return a datatable", async () => {
    const testCsvFilePath = await createTmpTextFile(`"one";"two","1";"1","2";"2","3";"3"`);

    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(testCsvFilePath),
        "delimiter": ";",
        "newline": ",",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"one","two"\n"1","1"\n"2","2"\n"3","3"\n`,
    );
  });

  await t.test("given a csv text without headers, it should return a datatable", async () => {
    const testCsvFilePath = await createTmpTextFile(`"1"\n"2"\n"3"\n`);

    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(testCsvFilePath),
        "column names": [ "id" ],
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id"\n"1"\n"2"\n"3"\n`,
    );
  });

});
