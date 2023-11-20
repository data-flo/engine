const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");

const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");

const adaptor = require("../index.js");

test("compare-columns adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"one","two","three"
"aaa","aaa","aaa"
"AAA","aaa","aaa"
"a","b","c"
`);

  await t.test("given two columns, it should compare case insensitive", async () => {
    const output = await adaptor({
      "data": createDatatable(testCsvFilePath),
      "columns": [ "one", "two" ],
      "case sensitive": false,
    });
    assert.ok(output.same, "adaptor should return data");
    compareFile(
      output.same.getSource(),
      `"one","two","three"\n"aaa","aaa","aaa"\n"AAA","aaa","aaa"\n`,
    );
    assert.ok(output.different, "adaptor should return data");
    compareFile(
      output.different.getSource(),
      `"one","two","three"\n"a","b","c"\n`,
    );
  });

  await t.test("given two columns, it should compare case sensitive", async () => {
    const output = await adaptor({
      "data": createDatatable(testCsvFilePath),
      "columns": [ "one", "two" ],
      "case sensitive": true,
    });
    assert.ok(output.same, "adaptor should return data");
    compareFile(
      output.same.getSource(),
      `"one","two","three"\n"aaa","aaa","aaa"\n`,
    );
    assert.ok(output.different, "adaptor should return data");
    compareFile(
      output.different.getSource(),
      `"one","two","three"\n"AAA","aaa","aaa"\n"a","b","c"\n`,
    );
  });

  await t.test("given another two columns, it should compare case insensitive", async () => {
    const output = await adaptor({
      "data": createDatatable(testCsvFilePath),
      "columns": [ "three", "two" ],
      "case sensitive": true,
    });
    assert.ok(output.same, "adaptor should return data");
    compareFile(
      output.same.getSource(),
      `"one","two","three"\n"aaa","aaa","aaa"\n"AAA","aaa","aaa"\n`,
    );
    assert.ok(output.different, "adaptor should return data");
    compareFile(
      output.different.getSource(),
      `"one","two","three"\n"a","b","c"\n`,
    );
  });

  await t.test("given three columns, it should compare case insensitive", async () => {
    const output = await adaptor({
      "data": createDatatable(testCsvFilePath),
      "columns": [ "one", "two", "three" ],
      "case sensitive": false,
    });
    assert.ok(output.same, "adaptor should return data");
    compareFile(
      output.same.getSource(),
      `"one","two","three"\n"aaa","aaa","aaa"\n"AAA","aaa","aaa"\n`,
    );
    assert.ok(output.different, "adaptor should return data");
    compareFile(
      output.different.getSource(),
      `"one","two","three"\n"a","b","c"\n`,
    );
  });

  await t.test("given three columns, it should compare case sensitive", async () => {
    const output = await adaptor({
      "data": createDatatable(testCsvFilePath),
      "columns": [ "one", "two", "three" ],
      "case sensitive": true,
    });
    assert.ok(output.same, "adaptor should return data");
    compareFile(
      output.same.getSource(),
      `"one","two","three"\n"aaa","aaa","aaa"\n`,
    );
    assert.ok(output.different, "adaptor should return data");
    compareFile(
      output.different.getSource(),
      `"one","two","three"\n"AAA","aaa","aaa"\n"a","b","c"\n`,
    );
  });

  await t.test("given one column only, it should throw an error", async () => {
    await assert.rejects(
      adaptor({
        "data": createDatatable(testCsvFilePath),
        "columns": [ "A" ],
        "case sensitive": false,
      }),
      new Error("At least two columns are required"),
    );
  });

  await t.test("given non-existing columns, it should throw an error", async () => {
    await assert.rejects(
      adaptor({
        "data": createDatatable(testCsvFilePath),
        "columns": [ "A", "B" ],
        "case sensitive": false,
      }),
      new Error("Datatable does not include a column named A"),
    );
  });

});
