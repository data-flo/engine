const assert = require("node:assert");
const test = require("node:test");

const { zonedTimeToUtc } = require("date-fns-tz");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("convert-date-to-text adaptor", async (t) => {

  await t.test("given no date it should return current date as text", async () => {
    const output = await runAdaptor(
      adaptor,
      {
      },
    );
    assert.ok(output.text, "adaptor should return text");
    const actual = output.text;
    const expected = zonedTimeToUtc(new Date()).toISOString();
    assert.equal(actual.substr(0, 19), expected.substr(0, 19));
  });

  await t.test("given a date value, original format and new format it should return date as text in new format", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "value": "23/10/2012",
        "original format": "dd/MM/yyyy",
        "new format": "dd.MM.yyyy",
      },
    );
    assert.ok(output.text, "adaptor should return text");
    const actual = output.text;
    const expected = "23.10.2012";
    assert.equal(actual,
      expected);
  });
  await t.test("given a date and a timezone it should return the date in the new timezone", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "value": "23/10/2012",
        "original format": "dd/MM/yyyy",
        "timezone": "CET",
      },
    );
    assert.ok(output.text, "adaptor should return text");
    const actual = output.text;
    const expected = "2012-10-23T02:00:00";
    assert.equal(actual.substr(0, 19), expected.substr(0, 19));
  });
});
