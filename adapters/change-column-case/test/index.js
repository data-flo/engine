const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

const { compareFile } = require("../../../utils/testing/unit.js");

const tmpPath = require("../../../utils/file/tmp-path.js");
const createDatatable = require("../../../types/datatable.js");
const adaptor = require("../index.js");

test(
  "change-column-case adaptor",
  async (t) => {
    // create a tmp CSV file
    const tmpCsvFilePath = await tmpPath();
    fs.writeFileSync(tmpCsvFilePath, "\"text\"\n\"OfMice and men\"\n\n");

    await t.test(
      "given a text, it should change its case to camel case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "camel",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"ofMiceAndMen\"\n\n",
        );
      },
    );

    await t.test(
      "given a text, it should change its case to capital case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "capital",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"Of Mice And Men\"\n\n",
        );
      },
    );

    await t.test(
      "given a text, it should change its case to constant case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "constant",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"OF_MICE_AND_MEN\"\n\n",
        );
      },
    );

    await t.test(
      "given a text, it should change its case to dot case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "dot",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"of.mice.and.men\"\n\n",
        );
      },
    );

    await t.test(
      "given a text, it should change its case to header case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "header",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"Of-Mice-And-Men\"\n\n",
        );
      },
    );

    await t.test(
      "given a text, it should change its case to hyphen case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "hyphen",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"of-mice-and-men\"\n\n",
        );
      },
    );

    await t.test(
      "given a text, it should change its case to kebab case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "kebab",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"of-mice-and-men\"\n\n",
        );
      },
    );

    await t.test(
      "given a text, it should change its case to lower case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "lower",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"ofmice and men\"\n\n",
        );
      },
    );

    await t.test(
      "given a text, it should change its case to no case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "no",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"of mice and men\"\n\n",
        );
      },
    );

    await t.test(
      "given a text, it should change its case to param case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "param",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"of-mice-and-men\"\n\n",
        );
      },
    );

    await t.test(
      "given a text, it should change its case to pascal case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "pascal",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"OfMiceAndMen\"\n\n",
        );
      },
    );

    await t.test(
      "given a text, it should change its case to path case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "path",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"of/mice/and/men\"\n\n",
        );
      },
    );

    await t.test(
      "given a text, it should change its case to sentence case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "sentence",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"Of mice and men\"\n\n",
        );
      },
    );

    await t.test(
      "given a text, it should change its case to snake case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "snake",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"of_mice_and_men\"\n\n",
        );
      },
    );

    await t.test(
      "given a text, it should change its case to sponge case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "sponge",
        });
        assert.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"ofmice and men\"\n\n";
        assert.ok(actual.toLowerCase().endsWith(expected.toLowerCase()));
      },
    );

    await t.test(
      "given a text, it should change its case to swap case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "swap",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"oFmICE AND MEN\"\n\n",
        );
      },
    );

    await t.test(
      "given a text, it should change its case to title case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "title",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"OfMice and Men\"\n\n",
        );
      },
    );

    await t.test(
      "given a text, it should change its case to upper case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "upper",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"OFMICE AND MEN\"\n\n",
        );
      },
    );

    await t.test(
      "given a text, it should change its case to upper case",
      async () => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "upper case",
        });
        assert.ok(output.data);
        compareFile(
          output.data.getSource(),
          "\"text\"\n\"OFMICE AND MEN\"\n\n",
        );
      },
    );

    await t.test("given a wrong case name, it should throw an error", async () => {
      await assert.rejects(
        adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "invalid",
        }),
        new Error("Invalid case conversion. Supported conversions are: `camel`, `capital`, `constant`, `dot`, `header`, `hyphen`, `kebab`, `lower`, `no`, `param`, `pascal`, `path`, `sentence`, `snake`, `sponge`, `swap`, `title`, `upper`"),
      );
    });

  },
);
