const tap = require("../../utils/testing/unit");
const fs = require("fs");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("forward-geocoding adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"address"
"Babraham Road, Sawston, CB22 3DQ, United Kingdom"
"1330 Middle Avenue, Menlo Park, CA 94025, United States of America"
`);
  const data = createDatatable(testCsvFilePath);

  tap.test("given a latitude and longitude columns, it should return full address", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "api key": process.env.OPENCAGE_API_KEY,
        "data": data,
        "latitude column": "latitude",
        "longitude column": "longitude",
        "location type": "full",
        "location column": "address",
      },
    );
    t.ok(output.data);
    tap.compareFile(
      output.data.getSource(),
      `"address","latitude","longitude"
"Babraham Road, Sawston, CB22 3DQ, United Kingdom","52.126955","0.171615"
"1330 Middle Avenue, Menlo Park, CA 94025, United States of America","37.4397282","-122.1864699"
`
    );
  });

//   tap.test("given a latitude and longitude columns, it should return country code", async (t) => {
//     const output = await runAdaptor(
//       adaptor,
//       {
//         "api key": process.env.OPENCAGE_API_KEY,
//         "data": createDatatable(testCsvFilePath),
//         "latitude column": "latitude",
//         "longitude column": "longitude",
//         "feature type": "country code",
//         "location column": "address",
//       },
//     );
//     t.ok(output.data);
//     const actual = fs.readFileSync(output.data.getSource(), "utf8");
//     const expected = `"latitude","longitude","address"
// "52.12670207561581","0.17255181706350176","gb"
// "37.4396","-122.1864","us"
// ,,
// `;
//     t.equal(actual, expected);
//   });

//   tap.test("given an invalid feature, it should throw an error", async (t) => {
//     await t.rejects(
//       runAdaptor(
//         adaptor,
//         {
//           "api key": process.env.OPENCAGE_API_KEY,
//           "data": createDatatable(testCsvFilePath),
//           "latitude column": "latitude",
//           "longitude column": "longitude",
//           "feature type": "full address",
//           "location column": "address",
//         },
//       ),
//       new Error("Invalid feature"),
//     );
//   });

});
