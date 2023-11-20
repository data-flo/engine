const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("transform-columns adaptor", async (t) => {
  assert.ok(process.env.REPLICATE_API_KEY, "REPLICATE_API_KEY is missing from env");

  await t.test("given a datatable, it should add a column", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "model": "salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746",
        "input": { "image": "https://five.epicollect.net/api/media/data-flo-demo?type=photo&format=entry_original&name=b1c80090-4114-11ee-a88a-6d1dff2c8ae6_1692726771.jpg" },
        "api token": process.env.REPLICATE_API_KEY,
      },
    );
    assert.ok(output.outputs);
    assert.ok(output.outputs[0].toLowerCase().includes("pringles"));
  });

});
