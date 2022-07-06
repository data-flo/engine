const tap = require("tap");
const fs = require("fs");

const tmpPath = require("../../utils/file/tmp-path");
const createDatatable = require("../../types/datatable");
const adaptor = require("./index");

tap.test(
  "change-column-case adaptor",
  async () => {
    // create a tmp CSV file
    const tmpCsvFilePath = await tmpPath();
    fs.writeFileSync(tmpCsvFilePath, "\"text\"\n\"OfMice and men\"\n");

    tap.test(
      "given a text, it should change its case to camel case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "camel",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"ofMiceAndMen\"\n";
        t.equal(actual, expected);
      },
    );

    tap.test(
      "given a text, it should change its case to capital case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "capital",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"Of Mice And Men\"\n";
        t.equal(actual, expected);
      },
    );

    tap.test(
      "given a text, it should change its case to constant case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "constant",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"OF_MICE_AND_MEN\"\n";
        t.equal(actual, expected);
      },
    );

    tap.test(
      "given a text, it should change its case to dot case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "dot",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"of.mice.and.men\"\n";
        t.equal(actual, expected);
      },
    );

    tap.test(
      "given a text, it should change its case to header case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "header",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"Of-Mice-And-Men\"\n";
        t.equal(actual, expected);
      },
    );

    tap.test(
      "given a text, it should change its case to hyphen case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "hyphen",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"of-mice-and-men\"\n";
        t.equal(actual, expected);
      },
    );

    tap.test(
      "given a text, it should change its case to kebab case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "kebab",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"of-mice-and-men\"\n";
        t.equal(actual, expected);
      },
    );

    tap.test(
      "given a text, it should change its case to lower case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "lower",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"ofmice and men\"\n";
        t.equal(actual, expected);
      },
    );

    tap.test(
      "given a text, it should change its case to no case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "no",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"of mice and men\"\n";
        t.equal(actual, expected);
      },
    );

    tap.test(
      "given a text, it should change its case to param case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "param",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"of-mice-and-men\"\n";
        t.equal(actual, expected);
      },
    );

    tap.test(
      "given a text, it should change its case to pascal case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "pascal",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"OfMiceAndMen\"\n";
        t.equal(actual, expected);
      },
    );

    tap.test(
      "given a text, it should change its case to path case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "path",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"of/mice/and/men\"\n";
        t.equal(actual, expected);
      },
    );

    tap.test(
      "given a text, it should change its case to sentence case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "sentence",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"Of mice and men\"\n";
        t.equal(actual, expected);
      },
    );

    tap.test(
      "given a text, it should change its case to snake case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "snake",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"of_mice_and_men\"\n";
        t.equal(actual, expected);
      },
    );

    tap.test(
      "given a text, it should change its case to sponge case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "sponge",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"ofmice and men\"\n";
        t.equal(actual.toLowerCase(), expected.toLowerCase());
      },
    );

    tap.test(
      "given a text, it should change its case to swap case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "swap",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"oFmICE AND MEN\"\n";
        t.equal(actual, expected);
      },
    );

    tap.test(
      "given a text, it should change its case to title case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "title",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"OfMice and Men\"\n";
        t.equal(actual, expected);
      },
    );

    tap.test(
      "given a text, it should change its case to upper case",
      async (t) => {
        const output = await adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "upper",
        });
        t.ok(output.data);
        const actual = fs.readFileSync(output.data.getSource(), "utf8");
        const expected = "\"text\"\n\"OFMICE AND MEN\"\n";
        t.equal(actual, expected);
      },
    );

    tap.test("given a wrong case name, it should throw an error", async (t) => {
      await t.rejects(
        adaptor({
          "data": createDatatable(tmpCsvFilePath),
          "column": "text",
          "case": "invalid",
        }),
        new Error("Invalid case converion. Supported converions are: `camel`, `capital`, `constant`, `dot`, `header`, `hyphen`, `kebab`, `lower`, `no`, `param`, `pascal`, `path`, `sentence`, `snake`, `sponge`, `swap`, `title`, `upper`"),
      );
    });

  },
);
