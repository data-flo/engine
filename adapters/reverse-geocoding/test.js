const fs = require("fs");

const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("reverse-geocoding adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"latitude","longitude"
"-13.163068","-72.545128"
"37.4396","-122.1864"
"51.50643","-0.12719"
"51.50108","-0.12459"
,
`);

  tap.test("given a latitude and longitude columns, it should return full address", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "api key": process.env.HERE_API_KEY,
        "data": createDatatable(testCsvFilePath),
        "latitude column": "latitude",
        "longitude column": "longitude",
        "location column": "address",
      },
    );
    tap.ok(output.data);
    const expected = `"latitude","longitude","address"
"-13.163068","-72.545128","Machu Picchu, Path to Inka Bridge, Machupicchu 08680, Peru"
"37.4396","-122.1864","1330 Middle Avenue, Menlo Park, CA 94025, United States of America"
"51.50643","-0.12719","Whitehall / Trafalgar Square, Whitehall, Westminster, London, SW1A 2EG, United Kingdom"
"51.50108","-0.12459","Portcullis House, Canon Row, Westminster, London, SW1A 2LW, United Kingdom "
,,
`;
    tap.compareFile(output.data.getSource(), expected);
  });

  tap.test("given a latitude and longitude columns, it should return country code", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "api key": process.env.HERE_API_KEY,
        "data": createDatatable(testCsvFilePath),
        "latitude column": "latitude",
        "longitude column": "longitude",
        "location type": "country code",
        "location column": "address",
      },
    );
    tap.ok(output.data);
    const expected = `"latitude","longitude","address"
"-13.163068","-72.545128","PER"
"37.4396","-122.1864","USA"
"51.50643","-0.12719","GBR"
"51.50108","-0.12459","GBR"
,,
`;
    tap.compareFile(output.data.getSource(), expected);
  });

  tap.test("given an invalid feature, it should throw an error", async (t) => {
    await t.rejects(
      runAdaptor(
        adaptor,
        {
          "api key": process.env.HERE_API_KEY,
          "data": createDatatable(testCsvFilePath),
          "latitude column": "latitude",
          "longitude column": "longitude",
          "location type": "full address",
          "location column": "address",
        },
      ),
      ("Invalid feature"),
    );
  });

});
