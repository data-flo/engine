const assert = require("node:assert");
const test = require("node:test");
const adaptor = require("../index");

test("import-file-from-s3 adaptor", async (t) => {
  before(() => console.log('about to run some test'));

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
// create a shell script for testing for specific adaptors
// create test folder
// put docker compose in the folder
// change test.js file to call dock up and dock down, child process.spawn(docker compose up) to call out docker compose
// test file goes to index.js
// docker file will be in test folder
// utils file will be in utils folder