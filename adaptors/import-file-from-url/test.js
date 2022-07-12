const FS = require("fs");

const runAdaptor = require("../../runner/run-adaptor");
const tap = require("../../utils/testing/unit");

const adaptor = require("./index");

tap.test("import-file-from-url adaptor", async () => {

  tap.test("given a Dropbox https URL, it should download it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        url: "https://www.dropbox.com/s/raw/gxyp4vonapb0ksz/demo.csv",
      }
    );
    tap.ok(output.file, "adaptor should return file");
    tap.equal(output.file.name, "demo.csv");
    tap.compareFile(
      output.file.getSource(),
      "id,__latitude,__longitude,,,,,,,,,,,,month,day\nBovine,46.227638,2.213749,,,,,,,,,,,,,\nGibbon,15.870032,100.992541,,,,,,,,,,,,,\nOrangutan,-0.589724,101.3431058,,,,,,,,,,,,,\nGorilla,1.373333,32.290275,,,,,,,,,,,,,\nChimp,-0.228021,15.827659,,,,,,,,,,,,,\nHuman,55.378051,-3.435973,,,,,,,,,,,,,\nMouse,40.463667,-3.74922,,,,,,,,,,,,,",
    );
  });

  tap.test("given a FTP URL, it should download it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        url: "ftp://ftp.ncbi.nlm.nih.gov/robots.txt",
      }
    );
    tap.ok(output.file, "adaptor should return file");
    tap.equal(output.file.name, "robots.txt");
    tap.compareFile(
      output.file.getSource(),
      "User-agent: *\nDisallow: /\n",
    );
  });

  tap.test("given a FTP URL, it should download it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        url: `sftp://${process.env.USER}:${process.env.PASSWORD}@127.0.0.1${process.env.HOME}/.npmrc`,
      }
    );
    tap.ok(output.file, "adaptor should return file");
    tap.equal(output.file.name, ".npmrc");
    tap.ok(
      FS.readFileSync(output.file.getSource())
    );
  });

});
