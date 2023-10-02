const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("forward-geocoding adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"location"
"40 N 120 W"
"22.4 N 114.1 E"
"29.85 S 31.01 E"
"31.00 N 100.00 W"
"40 N 120 W"
"22,4 N 114,1 E"
"29,85 S 31,01 E"
"31,00 N 100,00 W"
"31.00 100.00"
"31,00 100,00"
`);
  const data = createDatatable(testCsvFilePath);

  tap.test("given a location column, it should return latitude and longitude", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": data,
        "location column": "location",
        "latitude column": "latitude",
        "longitude column": "longitude",
      },
    );
    t.ok(output.data);
    tap.compareFile(
      output.data.getSource(),
      `"location","latitude","longitude"
"40 N 120 W","40","-120"
"22.4 N 114.1 E","22.4","114.1"
"29.85 S 31.01 E","-29.85","31.01"
"31.00 N 100.00 W","31.00","-100.00"
"40 N 120 W","40","-120"
"22,4 N 114,1 E","22.4","114.1"
"29,85 S 31,01 E","-29.85","31.01"
"31,00 N 100,00 W","31.00","-100.00"
"31.00 100.00","31.00","100.00"
"31,00 -100,00","31.00","-100.00"
`
    );
  });

});
