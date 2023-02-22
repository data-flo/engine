import runAdaptor  from "../../runner/run-adaptor";
import tap  from "../../utils/testing/unit";
import adaptor  from "./index";




tap.test("import-file-from-dropbox adaptor", async () => {

  tap.test("given a Dropbox https URL, it should download it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        url: "https://figshare.com/articles/dataset/Zhang_tree_BEAST_Fig2_tre/3380890",
      }
    );
    tap.ok(output.file, "adaptor should return file");
    tap.equal(output.file.name, "Zhang_tree_BEAST_Fig2.tre");
  });

});
