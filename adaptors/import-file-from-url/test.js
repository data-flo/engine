const tap = require("tap");

const runAdaptor = require("../../runner/run-adaptor");
const compareFileContent = require("../../utils/file/compare");
const adaptor = require("./index");

tap.test("import-file-from-url adaptor", async () => {

  tap.test("given a Dropbox https URl, it should download it", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        url: "https://www.dropbox.com/s/raw/gxyp4vonapb0ksz/demo.csv",
      }
    );
    t.ok(output.file, "adaptor should return file");
    t.equal(output.file.name, "demo.csv");
    t.ok(
      compareFileContent(
        output.file.getSource(),
        `id,__latitude,__longitude,,,,,,,,,,,,month,day\nBovine,46.227638,2.213749,,,,,,,,,,,,,\nGibbon,15.870032,100.992541,,,,,,,,,,,,,\nOrangutan,-0.589724,101.3431058,,,,,,,,,,,,,\nGorilla,1.373333,32.290275,,,,,,,,,,,,,\nChimp,-0.228021,15.827659,,,,,,,,,,,,,\nHuman,55.378051,-3.435973,,,,,,,,,,,,,\nMouse,40.463667,-3.74922,,,,,,,,,,,,,`,
      )
    );
  });

});
