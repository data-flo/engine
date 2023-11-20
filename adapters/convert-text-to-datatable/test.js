const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const compareFileContent = require("../../utils/file/compare");

await t.test("convert-text-to-datatable adaptor", async () => {

  await t.test("given a csv text, it should return a datatable", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "csv": `"id","Country"
"Bovine","de"
"Gibbon","fr"
"Orangutan",
"Gorilla",
"Human","gb"
"Mouse","gb"
`,
      },
    );
    t.ok(output.data, "adaptor should return data");
    t.ok(
      compareFileContent(
        output.data.getSource(),
        `"id","Country"\n"Bovine","de"\n"Gibbon","fr"\n"Orangutan",\n"Gorilla",\n"Human","gb"\n"Mouse","gb"\n`,
      )
    );
  });

  await t.test("given a csv text with semicolon, it should return a datatable", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        csv: `"id";"Country"
"Bovine";"de"
"Gibbon";"fr"
"Orangutan";
"Gorilla";
"Human";"gb"
"Mouse";"gb"
`,
        delimiter: ";",
      },
    );
    t.ok(output.data, "adaptor should return data");
    t.ok(
      compareFileContent(
        output.data.getSource(),
        `"id","Country"\n"Bovine","de"\n"Gibbon","fr"\n"Orangutan",\n"Gorilla",\n"Human","gb"\n"Mouse","gb"\n`,
      )
    );
  });

});
