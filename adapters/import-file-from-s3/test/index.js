const assert = require("node:assert");
const path = require("path");
const { before, after, test } = require("node:test");
const adaptor = require("../index.js");
const { compareFile, dockerComposeUp, dockerComposeDown } = require("../../../utils/testing/unit.js");

test("import-file-from-s3 adaptor", async (t) => {
  before(() => dockerComposeUp(path.resolve(__dirname)));
  after(() => dockerComposeDown(path.resolve(__dirname)));

  await t.test("given a pubic object with keys, it should download it", async () => {
    const output = await adaptor(
      {
        "url": "http://localhost:9000/public-bucket/output",
      }
    );
    assert.ok(output.file, "adaptor should return file");
    assert.equal(output.file.name, "output");
    compareFile(
      output.file.getSource(),
      "(Bovine:0.69395,(Gibbon:0.0,(Orangutan:0.0,(Gorilla:0.0,(Chimp:0.0,Human:0.0)123:0.0)test:0.06124):0.0):0.54939,Mouse:1.21460);\n",
    );
  });

  await t.test("given a private object with keys, it should download it", async () => {
    const output = await adaptor(
      {
        "url": "http://localhost:9000/private-bucket/output",
        "access key": "NNEV9C8ZYRHATNI2MRZ9",
        "secret key": "DgsAUwzoBssqAAa7WxzeBzO4Ty1rloXIFsTZFWXC",
      }
    );
    assert.ok(output.file, "adaptor should return file");
    assert.equal(output.file.name, "output");
    compareFile(
      output.file.getSource(),
      "(Bovine:0.69395,(Gibbon:0.0,(Orangutan:0.0,(Gorilla:0.0,(Chimp:0.0,Human:0.0)123:0.0)test:0.06124):0.0):0.54939,Mouse:1.21460);\n",
    );
  });

  await t.test("given a private object without keys, it should not download it", async () => {
    await assert.rejects(
      adaptor(
        {
          "url": "http://localhost:9000/private-bucket/output",
        }
      ),
      new Error("Request failed with status code 403: Forbidden"),
    );
  });

});
