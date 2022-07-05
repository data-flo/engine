const tap = require("tap");
const path = require("path");
const fs = require("fs");

const parseInputArguments = require("../../runner/parse-input-arguments");
const manifest = require("./manifest");
const adaptor = require("./index");

tap.test("add-column adaptor", async () => {

  tap.test("given a datatable, it should add a column", async (t) => {
    const input = parseInputArguments(
      manifest.input,
      {
        data: path.resolve(__dirname, "..", "..", "data", "test.csv"),
        column: "ones",
        value: "1",
      },
    );
    const output = await adaptor(input);
    t.ok(output.data);
    const actual = fs.readFileSync(output.data.getSource(), "utf8");
    const expected = `"id","Country","empty","date a","date b","ones"
"Bovine","de",,"Jan 29, 2007","2007-01-28","1"
"Gibbon","fr",,,,"1"
"Orangutan",,,,,"1"
"Gorilla",,,,,"1"
"Human","gb",,,,"1"
"Mouse","gb",,,,"1"
`;
    t.equal(actual, expected);
  });

  tap.test("given no value, it should add an empty column", async (t) => {
    const input = parseInputArguments(
      manifest.input,
      {
        data: path.resolve(__dirname, "..", "..", "data", "test.csv"),
        column: "ones",
      },
    );
    const output = await adaptor(input);
    t.ok(output.data);
    const actual = fs.readFileSync(output.data.getSource(), "utf8");
    const expected = `"id","Country","empty","date a","date b","ones"
"Bovine","de",,"Jan 29, 2007","2007-01-28",
"Gibbon","fr",,,,
"Orangutan",,,,,
"Gorilla",,,,,
"Human","gb",,,,
"Mouse","gb",,,,
`;
    t.equal(actual, expected);
  });

  tap.test("given an existing column, it should throw an error", async (t) => {
    const input = parseInputArguments(
      manifest.input,
      {
        data: path.resolve(__dirname, "..", "..", "data", "test.csv"),
        column: "id",
        value: "1",
      },
    );
    await t.rejects(
      adaptor(input),
      new Error("Datatable already includes a column named id"),
    );
  });

});
