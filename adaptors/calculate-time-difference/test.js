const tap = require("../../utils/testing/unit");
const fs = require("fs");

const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

const adaptor = require("./index");

tap.test("calculate-time-difference adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`);

  tap.test("given two columns, it should add the differnce in days", async (t) => {
    const output = await adaptor({
      "data": createDatatable(testCsvFilePath),
      "column one": "date a",
      "column one format": "MMM D, YYYY",
      "column two": "date b",
      "column two format": "",
      "difference column": "days",
      "difference unit": "days",
    });
    t.ok(output.data, "adaptor should return data");
    const actual = fs.readFileSync(output.data.getSource(), "utf8");
    const expected = `"id","Country","empty","date a","date b","days"
"Bovine","de",,"Jan 29, 2007","2007-01-28","1"
"Gibbon","fr",,,,
"Orangutan",,,,,
"Gorilla",,,,,
"Human","gb",,,,
"Mouse","gb",,,,
`;
    t.equal(actual, expected);
  });

  tap.test("given two columns in reverse, it should add the differnce as negative", async (t) => {
    const output = await adaptor({
      "data": createDatatable(testCsvFilePath),
      "column one": "date b",
      "column two": "date a",
      "column two format": "MMM D, YYYY",
      "difference column": "days",
      "difference unit": "days",
    });
    t.ok(output.data, "adaptor should return data");
    const actual = fs.readFileSync(output.data.getSource(), "utf8");
    const expected = `"id","Country","empty","date a","date b","days"
"Bovine","de",,"Jan 29, 2007","2007-01-28","-1"
"Gibbon","fr",,,,
"Orangutan",,,,,
"Gorilla",,,,,
"Human","gb",,,,
"Mouse","gb",,,,
`;
    t.equal(actual, expected);
  });

  tap.test("given non-existing as column one, it should throw an error", async (t) => {
    await t.rejects(
      adaptor({
        "data": createDatatable(testCsvFilePath),
        "column one": "A",
        "column one format": "MMM D, YYYY",
        "column two": "date b",
        "column two format": "",
        "difference column": "id",
        "difference unit": "days",
      }),
      ("Datatable dot not include a column named A"),
    );
  });

  tap.test("given non-existing as column two, it should throw an error", async (t) => {
    await t.rejects(
      adaptor({
        "data": createDatatable(testCsvFilePath),
        "column one": "date a",
        "column one format": "MMM D, YYYY",
        "column two": "B",
        "column two format": "",
        "difference column": "id",
        "difference unit": "days",
      }),
      ("Datatable dot not include a column named B"),
    );
  });

  tap.test("given an existing column, it should throw an error", async (t) => {
    await t.rejects(
      adaptor({
        "data": createDatatable(testCsvFilePath),
        "column one": "date a",
        "column one format": "MMM D, YYYY",
        "column two": "date b",
        "column two format": "",
        "difference column": "id",
        "difference unit": "days",
      }),
      ("Datatable already includes a column named id"),
    );
  });

});
