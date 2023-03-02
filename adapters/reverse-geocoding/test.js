const fs = require("fs");

const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("reverse-geocoding adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"latitude","longitude"
"52.12670207561581","0.17255181706350176"
"37.4396","-122.1864"
,
`);

//   tap.test("given a latitude and longitude columns, it should return full address", async () => {
//     const output = await runAdaptor(
//       adaptor,
//       {
//         "api key": process.env.OPENCAGE_API_KEY,
//         "data": createDatatable(testCsvFilePath),
//         "latitude column": "latitude",
//         "longitude column": "longitude",
//         "location type": "full",
//         "location column": "address",
//         "api provider": "OpenCage",
//       },
//     );
//     tap.ok(output.data);
//     const expected = `"latitude","longitude","address"
// "52.12670207561581","0.17255181706350176","Babraham Road, Sawston, CB22 3DQ, United Kingdom"
// "37.4396","-122.1864","1330 Middle Avenue, Menlo Park, CA 94025, United States of America"
// ,,
// `;
//     tap.compareFile(output.data.getSource(), expected);
//   });

//   tap.test("given a latitude and longitude columns, it should return country code", async () => {
//     const output = await runAdaptor(
//       adaptor,
//       {
//         "api key": process.env.OPENCAGE_API_KEY,
//         "data": createDatatable(testCsvFilePath),
//         "latitude column": "latitude",
//         "longitude column": "longitude",
//         "location type": "country code",
//         "location column": "address",
//       },
//     );
//     tap.ok(output.data);
//     const expected = `"latitude","longitude","address"
// "52.12670207561581","0.17255181706350176","gb"
// "37.4396","-122.1864","us"
// ,,
// `;
//     tap.compareFile(output.data.getSource(), expected);
//   });

  tap.test("given an invalid feature, it should throw an error", async (t) => {
    await t.rejects(
      runAdaptor(
        adaptor,
        {
          "api key": process.env.OPENCAGE_API_KEY,
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
