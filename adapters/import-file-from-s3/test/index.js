const assert = require("node:assert");
const path = require("path");
const { describe, it, before, after } = require("node:test");
const adaptor = require("../index.js");
const { compareFile } = require("../../../utils/testing/unit.js");

const { dockerComposeUp, dockerComposeDown } = require("../../../utils/docker-compose/index.js");
const { uploadFileToMinio } = require("./minio.js");

const currentFolder = path.resolve(__dirname);

describe("import-file-from-s3 adaptor", async () => {
  before(() => {
    const dockerProcess = dockerComposeUp(currentFolder);
    dockerProcess.on("close", (code) => {
      if (code === 0) {
        uploadFileToMinio();
      }
    });
  });

  it("given an URL, it should download it", () => {
    assert.rejects(
      adaptor(
        {
          "url": "http://192.168.1.99:9000/test/demo.nwk",
        }
      ),
      "Request failed with status code 403",
    );
  });

  it("given an URL, it should download it", async () => {
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

  after(() => {
    dockerComposeDown(currentFolder);
  });

});
// create a shell script for testing for specific adaptors
// create test folder
// put docker compose in the folder
// change test.js file to call dock up and dock down, child process.spawn(docker compose up) to call out docker compose
// test file goes to index.js
// docker file will be in test folder
// utils file will be in utils folder
// in the utils file we have docker up and docker down and we need to check if a docker-compose file exists
