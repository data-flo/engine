import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";
import createTmpTextFile  from "../../utils/file/tmp-text";
import createDatatable  from "../../types/datatable";
/* eslint-disable quotes */







tap.test("reshape-long-to-wide adaptor", async () => {

  tap.test("given a csv text, it should return a databale", async () => {
    const testCsvFilePath = await createTmpTextFile(
      `"subject","sex","condition","measurement"\n"1","M","control","7.9"\n"1","M","cond1","12.3"\n"1","M","cond2","10.7"\n"2","F","control","6.3"\n"2","F","cond1","10.6"\n"2","F","cond2","11.1"\n"3","F","control","9.5"\n"3","F","cond1","13.1"\n"3","F","cond2","13.8"\n"4","M","control","11.5"\n"4","M","cond1","13.4"\n"4","M","cond2","12.9"\n`,
    );
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "key column name": "condition",
        "value column name": "measurement",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"subject","sex","control","cond1","cond2"\n"1","M","7.9","12.3","10.7"\n"2","F","6.3","10.6","11.1"\n"3","F","9.5","13.1","13.8"\n"4","M","11.5","13.4","12.9"\n`
    );
  });

  // tap.test("given a csv text, it should return a databale", async () => {
  //   const testCsvFilePath = await createTmpTextFile(
  //     `"key","value"\n"subject","1"\n"sex","M"\n"control","7.9"\n"cond1","12.3"\n"cond2","10.7"\n"subject","2"\n"sex","F"\n"control","6.3"\n"cond1","10.6"\n"cond2","11.1"\n"subject","3"\n"sex","F"\n"control","9.5"\n"cond1","13.1"\n"cond2","13.8"\n"subject","4"\n"sex","M"\n"control","11.5"\n"cond1","13.4"\n"cond2","12.9"\n`,
  //   );
  //   const output = await runAdaptor(
  //     adaptor,
  //     {
  //       "data": createDatatable(testCsvFilePath),
  //       "key column name": "key",
  //       "value column name": "value",
  //     },
  //   );
  //   tap.ok(output.data, "adaptor should return data");
  //   tap.compareFile(
  //     output.data.getSource(),
  //     `"subject","sex","condition","measurement"\n"1","M","control","7.9"\n"1","M","cond1","12.3"\n"1","M","cond2","10.7"\n"2","F","control","6.3"\n"2","F","cond1","10.6"\n"2","F","cond2","11.1"\n"3","F","control","9.5"\n"3","F","cond1","13.1"\n"3","F","cond2","13.8"\n"4","M","control","11.5"\n"4","M","cond1","13.4"\n"4","M","cond2","12.9"\n`,
  //   );
  // });

});
