import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";
import compareFileContent  from "../../utils/file/compare";





tap.test("convert-text-to-datatable adaptor", async () => {

  tap.test("given a csv text, it should return a datatable", async (t) => {
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

  tap.test("given a csv text with semicolon, it should return a datatable", async (t) => {
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
