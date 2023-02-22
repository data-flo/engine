import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";




tap.test("import-file-from-s3 adaptor", async () => {

  tap.test("given an URL, it should download it", async () => {
    tap.rejects(
      runAdaptor(
        adaptor,
        {
          "url": "http://192.168.1.99:9000/test/demo.nwk",
        }
      ),
      "Request failed with status code 403",
    );
  });

  tap.test("given an URL, it should download it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "url": "http://127.0.0.1:9000/test/demo.nwk",
        "access key": "NNEV9C8ZYRHATNI2MRZ9",
        "secret key": "DgsAUwzoBssqAAa7WxzeBzO4Ty1rloXIFsTZFWXC",
      }
    );
    tap.ok(output.file, "adaptor should return file");
    tap.equal(output.file.name, "demo.nwk");
    tap.compareFile(
      output.file.getSource(),
      "(Bovine:0.69395,(Gibbon:0.0,(Orangutan:0.0,(Gorilla:0.0,(Chimp:0.0,Human:0.0)123:0.0)test:0.06124):0.0):0.54939,Mouse:1.21460);",
    );
  });

});
