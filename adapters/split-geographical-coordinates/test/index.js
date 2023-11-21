const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");

const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");

const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("split-geographical-coordinates", async (t) => {

  await t.test("given a location column, it should return latitude and longitude", async () => {
    const testCsvFilePath = await createTmpTextFile(`"location"
"40 N 120 W"
"22.4 N 114.1 E"
"29.85 S 31.01 E"
"31.00 N 99.00 W"
"40 N 120 W"
"22,4 N 114,1 E"
"29,85 S 31,01 E"
"31,00 N 98,00 W"
"32.00 101.00"
"33.00 -102.00"
"-33.00 102.00"
"-33.00 -102.00"
"32,00 101,00"
"33,00 -102,00"
"-33,00 102,00"
"-33,00 -102,00"
"32.00,101.00"
"33.00,-102.00"
"-33.00,102.00"
"-33.00,-102.00"
`);
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "coordinates column": "location",
        "latitude column": "latitude",
        "longitude column": "longitude",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"location","latitude","longitude"
"40 N 120 W","40","-120"
"22.4 N 114.1 E","22.4","114.1"
"29.85 S 31.01 E","-29.85","31.01"
"31.00 N 99.00 W","31.00","-99.00"
"40 N 120 W","40","-120"
"22,4 N 114,1 E","22.4","114.1"
"29,85 S 31,01 E","-29.85","31.01"
"31,00 N 98,00 W","31.00","-98.00"
"32.00 101.00","32.00","101.00"
"33.00 -102.00","33.00","-102.00"
"-33.00 102.00","-33.00","102.00"
"-33.00 -102.00","-33.00","-102.00"
"32,00 101,00","32.00","101.00"
"33,00 -102,00","33.00","-102.00"
"-33,00 102,00","-33.00","102.00"
"-33,00 -102,00","-33.00","-102.00"
"32.00,101.00","32.00","101.00"
"33.00,-102.00","33.00","-102.00"
"-33.00,102.00","-33.00","102.00"
"-33.00,-102.00","-33.00","-102.00"
`
    );
  });

  await t.test("given bad location data, it should return the invalid values", async () => {
    const testCsvFilePath = await createTmpTextFile(`"location"
"29.85 S 31.01 E"
"31.00 N 99.00 W"
"40 N 120 W"
","
"abc 123"
"22,4 N 114,1 E"
"29,85 S 31,01 E"
"abc 123"
"31,00 N 98,00 W"
"32.00 101.00"
"abc 123"
"33,00 -102,00"
`);
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "coordinates column": "location",
        "latitude column": "latitude",
        "longitude column": "longitude",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output["invalid values"].getSource(),
      `"Value","First row","Row count"
",","4","1"
"abc 123","5","3"
`
    );
  });

});
