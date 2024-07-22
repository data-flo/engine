const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("forward-geocoding adaptor", async (t) => {
  assert.ok(process.env.OPENCAGE_API_KEY, "OPENCAGE_API_KEY is missing from env");

  const testCsvFilePath = await createTmpTextFile(`"location"
"Babraham Road, Sawston, CB22 3DQ, United Kingdom"
"1330 Middle Avenue, Menlo Park, CA 94025, United States of America"
"United Kingdom"
"Viet Nam"
"London"
"Sawston"
"CB22 3DQ"
"Big Ben"
`);
  const data = createDatatable(testCsvFilePath);

  await t.test("given a location column, it should return latitude and longitude", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "api key": process.env.OPENCAGE_API_KEY,
        "data": data,
        "location column": "location",
        "latitude column": "latitude",
        "longitude column": "longitude",
        "place type column": "type",
        "decimal places": 4,
      },
    );
    assert.ok(output.data);
    compareFile(
      output.data.getSource(),
      `"location","latitude","longitude","type"
"Babraham Road, Sawston, CB22 3DQ, United Kingdom","52.1270","0.1716","postcode"
"1330 Middle Avenue, Menlo Park, CA 94025, United States of America","37.4397","-122.1865","building"
"United Kingdom","54.7024","-3.2766","country"
"Viet Nam","15.9267","107.9651","country"
"London","51.5074","-0.1278","city"
"Sawston","52.1252","0.1693","village"
"CB22 3DQ","52.1270","0.1716","postcode"
"Big Ben","51.5007","-0.1246","attraction"
`
    );
  });

});

test("forward-geocoding adaptor with empty first row", async (t) => {
  assert.ok(process.env.OPENCAGE_API_KEY, "OPENCAGE_API_KEY is missing from env");

  const testCsvFilePath = await createTmpTextFile(`"location"
""
"1330 Middle Avenue, Menlo Park, CA 94025, United States of America"
"United Kingdom"
"Viet Nam"
"London"
"Sawston"
"CB22 3DQ"
"Big Ben"
`);
  const data = createDatatable(testCsvFilePath);

  await t.test("given a location column, it should return latitude and longitude", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "api key": process.env.OPENCAGE_API_KEY,
        "data": data,
        "location column": "location",
        "latitude column": "latitude",
        "longitude column": "longitude",
        "place type column": "type",
        "decimal places": 4,
      },
    );
    assert.ok(output.data);
    compareFile(
      output.data.getSource(),
      `"location","latitude","longitude","type"
,,,
"1330 Middle Avenue, Menlo Park, CA 94025, United States of America","37.4397","-122.1865","building"
"United Kingdom","54.7024","-3.2766","country"
"Viet Nam","15.9267","107.9651","country"
"London","51.5074","-0.1278","city"
"Sawston","52.1252","0.1693","village"
"CB22 3DQ","52.1270","0.1716","postcode"
"Big Ben","51.5007","-0.1246","attraction"
`
    );
  });

});
