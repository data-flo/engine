const assert = require("node:assert");
const test = require("node:test");
const adaptor = require("./index");

test("import-file-from-s3 adaptor", async (t) => {

  await t.test("given an URL, it should download it", async () => {
    assert.rejects(
      adaptor(
        {
          "url": "http://192.168.1.99:9000/test/demo.nwk",
        }
      ),
      "Request failed with status code 403",
    );
  });

 

});
