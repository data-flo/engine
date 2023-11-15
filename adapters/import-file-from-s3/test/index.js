const assert = require("node:assert");
const path = require("path");
const { before, test } = require("node:test");
const adaptor = require("../index.js");
const { compareFile } = require("../../../utils/testing/unit.js");

const dockerComposeUp = require("../../../utils/docker-compose/index.js");
const { uploadFileToMinio } = require("./minio.js");

const currentFolder = path.resolve(__dirname);

test("import-file-from-s3 adaptor", async (t) => {
  before(async () => {
    const dockerProcess = await dockerComposeUp(currentFolder);
    await uploadFileToMinio();
  });

  // after(() => {
  //   dockerComposeDown(currentFolder);
  // });

  await t.test("given an URL, it should download it", async () => {
    await assert.rejects(
      adaptor(
        {
          "url": "http://192.168.1.99:9000/test/demo.nwk",
        }
      ),
      "Request failed with status code 403",
    );
  });

  await t.test("given an URL, it should download it", async () => {
    const output = await adaptor(
      {
        "url": "http://localhost:9000/test/output",
        "access key": "NNEV9C8ZYRHATNI2MRZ9",
        "secret key": "DgsAUwzoBssqAAa7WxzeBzO4Ty1rloXIFsTZFWXC",
      }
    );
    assert.ok(output.file, "adaptor should return file");
    assert.equal(output.file.name, "output");
    compareFile(
      output.file.getSource(),
      "(Bovine:0.69395,(Gibbon:0.0,(Orangutan:0.0,(Gorilla:0.0,(Chimp:0.0,Human:0.0)123:0.0)test:0.06124):0.0):0.54939,Mouse:1.21460);",
    );
  });

});
