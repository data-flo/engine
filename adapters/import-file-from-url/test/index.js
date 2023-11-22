const test = require("node:test");
const assert = require("node:assert");
const path = require("path");

const { compareFile, setupServices } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("import-file-from-url adaptor", async (t) => {
  setupServices(path.resolve(__dirname));

  await t.test("given a Dropbox https URL, it should download it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        url: "https://www.dropbox.com/s/raw/gxyp4vonapb0ksz",
      }
    );
    assert.ok(output.file, "adaptor should return file");
    assert.equal(output.file.name, "demo.csv");
    compareFile(
      output.file.getSource(),
      "id,__latitude,__longitude,,,,,,,,,,,,month,day\nBovine,46.227638,2.213749,,,,,,,,,,,,,\nGibbon,15.870032,100.992541,,,,,,,,,,,,,\nOrangutan,-0.589724,101.3431058,,,,,,,,,,,,,\nGorilla,1.373333,32.290275,,,,,,,,,,,,,\nChimp,-0.228021,15.827659,,,,,,,,,,,,,\nHuman,55.378051,-3.435973,,,,,,,,,,,,,\nMouse,40.463667,-3.74922,,,,,,,,,,,,,",
    );
  });

  await t.test("given an https URL, it should download it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        url: "https://ftp.ncbi.nlm.nih.gov/robots.txt",
      }
    );
    assert.ok(output.file, "adaptor should return file");
    assert.equal(output.file.name, "robots.txt");
    compareFile(
      output.file.getSource(),
      "User-agent: *\nDisallow: /\n",
    );
  });

  await t.test("given a FTP URL, it should download it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        url: "ftp://ftp.ncbi.nlm.nih.gov/robots.txt",
      }
    );
    assert.ok(output.file, "adaptor should return file");
    assert.equal(output.file.name, "robots.txt");
    compareFile(
      output.file.getSource(),
      "User-agent: *\nDisallow: /\n",
    );
  });

  await t.test("given an SFTP URL, it should download it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        url: `sftp://${process.env.USER}:${process.env.PASSWORD}@127.0.0.1${process.env.HOME}/.npmrc`,
      }
    );
    assert.ok(output.file, "adaptor should return file");
    assert.equal(output.file.name, ".npmrc");
    // assert.ok(
    //   FS.readFileSync(output.file.getSource())
    // );
  });

});
