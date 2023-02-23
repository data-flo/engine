import tap from "../../utils/testing/unit.js";
import runAdaptor from "../../runner/run-adaptor.js";
import adaptor from "./index.js";

tap.test("import-from-microreact-project adaptor", async () => {
  tap.test("given a project, it should return a datatable", async () => {
    console.log({adaptor})
    const output = await runAdaptor(
      adaptor,
      {
        "project": "https://microreact.org/project/Ny8H4gsH",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","__latitude","__longitude","Country","Country__colour","Country__shape","Pedalism"\n"Bovine","46.227638","2.213749","France","Red","Square","Four"\n"Gibbon","15.870032","100.992541","thailand","Green","circle","Two"\n"Orangutan","-0.589724","101.3431058","sumatra","Blue","Circle","Two"\n"Gorilla","1.373333","32.290275","Uganda","#CC33FF","Circle","Two"\n"Chimp","-0.228021","15.827659","Congo","orange","Circle","Two"\n"Human","55.378051","-3.435973","UK","#CCFF33","Circle","Two"\n"Mouse","40.463667","-3.74922","Spain","#00FFFF","square","four"\n`
    );
  });

});
