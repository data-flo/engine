import fs  from "fs";
import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";
import createTmpTextFile  from "../../utils/file/tmp-text";
import createDatatable  from "../../types/datatable";








tap.test("duplicate-column adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country"
"Bovine","de"
"Gibbon","fr"
"Orangutan",
"Gorilla",
"Human","gb"
"Mouse","gb"
`);

  tap.test("given a column in a datatable, it should return a datatable with the duplicated column", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "id",
        "new column name": "id copy",
      },
    );
    t.ok(output.data, "adaptor should return data");
    const actual = fs.readFileSync(output.data.getSource(), "utf8");
    const expected = `"id","Country","id copy"\n"Bovine","de","Bovine"\n"Gibbon","fr","Gibbon"\n"Orangutan",,"Orangutan"\n"Gorilla",,"Gorilla"\n"Human","gb","Human"\n"Mouse","gb","Mouse"\n`;
    t.same(actual, expected);
  });

});
