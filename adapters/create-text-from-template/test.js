const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");

tap.test("create-text-from-template adaptor", async () => {

  tap.test("given a template, it should return rendered text", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "template": "Hello {{ var }}!",
        "variables": [
          [ "var", "World" ],
        ],
      },
    );
    tap.ok(output.text, "adaptor should return text");
    tap.same(
      output.text,
      "Hello World!",
    );
  });

});
