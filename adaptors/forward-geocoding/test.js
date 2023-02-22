import tap  from "../../utils/testing/unit";
import fs  from "fs";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";
import createTmpTextFile  from "../../utils/file/tmp-text";
import createDatatable  from "../../types/datatable";







tap.test("forward-geocoding adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"latitude","longitude"
"52.12670207561581","0.17255181706350176"
"37.4396","-122.1864"
,
`);

  tap.test("given a latitude and longitude columns, it should return full address", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "api key": process.env.OPENCAGE_API_KEY,
        "data": createDatatable(testCsvFilePath),
        "latitude column": "latitude",
        "longitude column": "longitude",
        "feature type": "full",
        "feature column": "address",
      },
    );
    t.ok(output.data);
    const actual = fs.readFileSync(output.data.getSource(), "utf8");
    const expected = `"latitude","longitude","address"
"52.12670207561581","0.17255181706350176","Babraham Road, Sawston, CB22 3DQ, United Kingdom"
"37.4396","-122.1864","1330 Middle Avenue, Menlo Park, CA 94025, United States of America"
,,
`;
    t.equal(actual, expected);
  });

  tap.test("given a latitude and longitude columns, it should return country code", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "api key": process.env.OPENCAGE_API_KEY,
        "data": createDatatable(testCsvFilePath),
        "latitude column": "latitude",
        "longitude column": "longitude",
        "feature type": "country code",
        "feature column": "address",
      },
    );
    t.ok(output.data);
    const actual = fs.readFileSync(output.data.getSource(), "utf8");
    const expected = `"latitude","longitude","address"
"52.12670207561581","0.17255181706350176","gb"
"37.4396","-122.1864","us"
,,
`;
    t.equal(actual, expected);
  });

  tap.test("given an invalid feature, it should throw an error", async (t) => {
    await t.rejects(
      runAdaptor(
        adaptor,
        {
          "api key": process.env.OPENCAGE_API_KEY,
          "data": createDatatable(testCsvFilePath),
          "latitude column": "latitude",
          "longitude column": "longitude",
          "feature type": "full address",
          "feature column": "address",
        },
      ),
      new Error("Invalid feature"),
    );
  });

});
