const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

await t.test("forward-geocoding adaptor", async () => {
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
        "type column": "type",
        "digits": 4,
      },
    );
    t.ok(output.data);
    compareFile(
      output.data.getSource(),
      `"location","latitude","longitude","type"
"Babraham Road, Sawston, CB22 3DQ, United Kingdom","52.1270","0.1716","postcode"
"1330 Middle Avenue, Menlo Park, CA 94025, United States of America","37.4397","-122.1865","building"
"United Kingdom","54.7024","-3.2766","country"
"Viet Nam","15.9267","107.9651","country"
"London","51.5073","-0.1277","city"
"Sawston","52.1252","0.1693","village"
"CB22 3DQ","52.1270","0.1716","postcode"
"Big Ben","51.5007","-0.1246","attraction"
`
    );
  });

});
