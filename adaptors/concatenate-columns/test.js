const tap = require("tap");
const fs = require("fs");

const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

const adaptor = require("./index");

tap.test("calculate-time-difference adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"one","two","three"
"aaa","aaa",
"AAA","aaa",
"a","b","c"
`);

  tap.test("given two columns, it should return concatenated text", async (t) => {
    const output = await adaptor({
      "data": createDatatable(testCsvFilePath),
      "columns": [ "one", "two" ],
      "separator": "",
      "concatenated column": "concatenated",
    });
    t.ok(output.data, "adaptor should return data");
    const actual = fs.readFileSync(output.data.getSource(), "utf8");
    const expected = `"one","two","three","concatenated"
"aaa","aaa",,"aaaaaa"
"AAA","aaa",,"AAAaaa"
"a","b","c","ab"
`;
    t.equal(actual, expected);
  });

  tap.test("given three columns, it should return concatenated text", async (t) => {
    const output = await adaptor({
      "data": createDatatable(testCsvFilePath),
      "columns": [ "one", "two", "three" ],
      "separator": "-",
      "concatenated column": "concatenated",
    });
    t.ok(output.data, "adaptor should return data");
    const actual = fs.readFileSync(output.data.getSource(), "utf8");
    const expected = `"one","two","three","concatenated"
"aaa","aaa",,"aaa-aaa-"
"AAA","aaa",,"AAA-aaa-"
"a","b","c","a-b-c"
`;
    t.equal(actual, expected);
  });

  tap.test("given one column only, it should throw an error", async (t) => {
    await t.rejects(
      adaptor({
        "data": createDatatable(testCsvFilePath),
        "columns": [ "A" ],
      }),
      "At least two columns are required",
    );
  });

  tap.test("given non-existing columns, it should throw an error", async (t) => {
    await t.rejects(
      adaptor({
        "data": createDatatable(testCsvFilePath),
        "columns": [ "A", "B" ],
      }),
      "Datatable dot not include a column named A",
    );
  });

  tap.test("given an existing column, it should throw an error", async (t) => {
    await t.rejects(
      adaptor({
        "data": createDatatable(testCsvFilePath),
        "columns": [ "one", "two" ],
        "concatenated column": "three",
      }),
      "Datatable already includes a column named three",
    );
  });

});
