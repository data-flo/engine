const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("reverse-geocoding adaptor", async (t) => {
  assert.ok(process.env.OPENCAGE_API_KEY, "OPENCAGE_API_KEY is missing from env");

  const testCsvFilePath = await createTmpTextFile(`"latitude","longitude"
"-13.163068","-72.545128"
"37.4396","-122.1864"
"51.50643","-0.12719"
"51.50108","-0.12459"
,
`);

  await t.test("given a latitude and longitude columns, it should return full address", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "latitude column": "latitude",
        "longitude column": "longitude",
        "location column": "address",
      },
    );
    assert.ok(output.data);
    const expected = `"latitude","longitude","address"
"-13.163068","-72.545128","PE"
"37.4396","-122.1864","US"
"51.50643","-0.12719","GB"
"51.50108","-0.12459","GB"
,,
`;
    compareFile(output.data.getSource(), expected);
  });

  await t.test("given a latitude and longitude columns, it should return country code", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "latitude column": "latitude",
        "longitude column": "longitude",
        "location type": "ISO-3166-1-alpha-3",
        "location column": "address",
      },
    );
    assert.ok(output.data);
    const expected = `"latitude","longitude","address"
"-13.163068","-72.545128","PER"
"37.4396","-122.1864","USA"
"51.50643","-0.12719","GBR"
"51.50108","-0.12459","GBR"
,,
`;
    compareFile(output.data.getSource(), expected);
  });

  await t.test("given an invalid feature, it should throw an error", { skip: true }, async () => {
    await assert.rejects(
      runAdaptor(
        adaptor,
        {
          "data": createDatatable(testCsvFilePath),
          "latitude column": "latitude",
          "longitude column": "longitude",
          "location type": "full address",
          "location column": "address",
        },
      ),
      new Error("Invalid feature"),
    );
  });

});
