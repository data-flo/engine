const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("forward-geocoding adaptor", async () => {
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

  tap.test("given a location column, it should return latitude and longitude", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "api key": process.env.HERE_API_KEY,
        "data": data,
        "location column": "location",
        "latitude column": "latitude",
        "longitude column": "longitude",
        "type column": "type",
      },
    );
    t.ok(output.data);
    tap.compareFile(
      output.data.getSource(),
      `"location","latitude","longitude","type"
"Babraham Road, Sawston, CB22 3DQ, United Kingdom","52.12672","0.17119","postalCode"
"1330 Middle Avenue, Menlo Park, CA 94025, United States of America","37.43982","-122.18653","houseNumber"
"United Kingdom","51.50643","-0.12721","country"
"Viet Nam","21.02888","105.85463","country"
"London","51.50643","-0.12719","city"
"Sawston","52.12268","0.1677","district"
"CB22 3DQ","52.12672","0.17119","postalCode"
"Big Ben","51.50108","-0.12459","place"
`
    );
  });

});
