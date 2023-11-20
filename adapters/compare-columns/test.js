const tap = require("../../utils/testing/unit");
const fs = require("fs");

const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

const adaptor = require("./index");

await t.test("calculate-time-difference adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"one","two","three"
"aaa","aaa","aaa"
"AAA","aaa","aaa"
"a","b","c"
`);

  await t.test("given two columns, it should compare case insensitive", async (t) => {
    const output = await adaptor({
      "data": createDatatable(testCsvFilePath),
      "columns": [ "one", "two" ],
      "case sensitive": false,
    });
    t.ok(output.same, "adaptor should return data");
    t.equal(
      fs.readFileSync(output.same.getSource(), "utf8"),
      `"one","two","three"\n"aaa","aaa","aaa"\n"AAA","aaa","aaa"\n`,
    );
    t.ok(output.different, "adaptor should return data");
    t.equal(
      fs.readFileSync(output.different.getSource(), "utf8"),
      `"one","two","three"\n"a","b","c"\n`,
    );
  });

  await t.test("given two columns, it should compare case sensitive", async (t) => {
    const output = await adaptor({
      "data": createDatatable(testCsvFilePath),
      "columns": [ "one", "two" ],
      "case sensitive": true,
    });
    t.ok(output.same, "adaptor should return data");
    t.equal(
      fs.readFileSync(output.same.getSource(), "utf8"),
      `"one","two","three"\n"aaa","aaa","aaa"\n`,
    );
    t.ok(output.different, "adaptor should return data");
    t.equal(
      fs.readFileSync(output.different.getSource(), "utf8"),
      `"one","two","three"\n"AAA","aaa","aaa"\n"a","b","c"\n`,
    );
  });

  await t.test("given another two columns, it should compare case insensitive", async (t) => {
    const output = await adaptor({
      "data": createDatatable(testCsvFilePath),
      "columns": [ "three", "two" ],
      "case sensitive": true,
    });
    t.ok(output.same, "adaptor should return data");
    t.equal(
      fs.readFileSync(output.same.getSource(), "utf8"),
      `"one","two","three"\n"aaa","aaa","aaa"\n"AAA","aaa","aaa"\n`,
    );
    t.ok(output.different, "adaptor should return data");
    t.equal(
      fs.readFileSync(output.different.getSource(), "utf8"),
      `"one","two","three"\n"a","b","c"\n`,
    );
  });

  await t.test("given three columns, it should compare case insensitive", async (t) => {
    const output = await adaptor({
      "data": createDatatable(testCsvFilePath),
      "columns": [ "one", "two", "three" ],
      "case sensitive": false,
    });
    t.ok(output.same, "adaptor should return data");
    t.equal(
      fs.readFileSync(output.same.getSource(), "utf8"),
      `"one","two","three"\n"aaa","aaa","aaa"\n"AAA","aaa","aaa"\n`,
    );
    t.ok(output.different, "adaptor should return data");
    t.equal(
      fs.readFileSync(output.different.getSource(), "utf8"),
      `"one","two","three"\n"a","b","c"\n`,
    );
  });

  await t.test("given three columns, it should compare case sensitive", async (t) => {
    const output = await adaptor({
      "data": createDatatable(testCsvFilePath),
      "columns": [ "one", "two", "three" ],
      "case sensitive": true,
    });
    t.ok(output.same, "adaptor should return data");
    t.equal(
      fs.readFileSync(output.same.getSource(), "utf8"),
      `"one","two","three"\n"aaa","aaa","aaa"\n`,
    );
    t.ok(output.different, "adaptor should return data");
    t.equal(
      fs.readFileSync(output.different.getSource(), "utf8"),
      `"one","two","three"\n"AAA","aaa","aaa"\n"a","b","c"\n`,
    );
  });

  await t.test("given one column only, it should throw an error", async (t) => {
    await t.rejects(
      adaptor({
        "data": createDatatable(testCsvFilePath),
        "columns": [ "A" ],
        "case sensitive": false,
      }),
      ("At least two columns are required"),
    );
  });

  await t.test("given non-existing columns, it should throw an error", async (t) => {
    await t.rejects(
      adaptor({
        "data": createDatatable(testCsvFilePath),
        "columns": [ "A" ],
        "case sensitive": false,
      }),
      ("Datatable dot not include a column named A"),
    );
  });

});
