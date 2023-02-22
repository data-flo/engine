import runAdaptor  from "../../runner/run-adaptor";
import tap  from "../../utils/testing/unit";
import adaptor  from "./index";




tap.test("import-file-from-google-drive", async () => {

  tap.test("given a Google Drive file URL, it should download it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        url: "https://drive.google.com/file/d/1AFKyykTj8sGzZaT81m3Ac_P2Tk1GCaAE/view?usp=sharing",
      }
    );
    tap.ok(output.file, "adaptor should return file");
    tap.equal(output.file.name, "test.txt");
    tap.compareFile(
      output.file.getSource(),
      "Hello Data-flo!",
    );
  });

});
