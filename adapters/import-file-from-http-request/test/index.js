const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("import-file-from-http-request adaptor", async (t) => {

  await t.test("given an URL, it should download it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        url: "https://www.dropbox.com/s/gxyp4vonapb0ksz/data.csv?dl=1",
      }
    );
    assert.ok(output["response body"], "adaptor should return file");
    compareFile(
      output["response body"].getSource(),
      "id,__latitude,__longitude,,,,,,,,,,,,month,day\nBovine,46.227638,2.213749,,,,,,,,,,,,,\nGibbon,15.870032,100.992541,,,,,,,,,,,,,\nOrangutan,-0.589724,101.3431058,,,,,,,,,,,,,\nGorilla,1.373333,32.290275,,,,,,,,,,,,,\nChimp,-0.228021,15.827659,,,,,,,,,,,,,\nHuman,55.378051,-3.435973,,,,,,,,,,,,,\nMouse,40.463667,-3.74922,,,,,,,,,,,,,",
    );
  });

});
