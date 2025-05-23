const test = require("node:test");
const assert = require("node:assert");

const { zonedTimeToUtc } = require("date-fns-tz");
const fromString = require("./from-string.js");

test("given an invalid string, it should return undefined", async (t) => {
  const input = "";
  const expected = undefined;
  const actual = fromString(input);
  assert.equal(actual, expected);
});

test("given an ISO string, it should return a date", async (t) => {
  const input = "2022-06-29T09:33:49+00:00";
  const expected = new Date(input);
  const actual = fromString(input);
  assert.equal(actual.toISOString(), zonedTimeToUtc(expected).toISOString());
});

test("given a date and a format, it should return the formatted string", async (t) => {
  const expected = new Date(2022, (6 - 1 /* zero-based month */), 29);
  const actual = fromString("06/29/2022", "MM/DD/YYYY");
  assert.equal(actual.toISOString(), zonedTimeToUtc(expected).toISOString());
});
test("given a date, a format, and a locale string, it should return the formatted string", async (t) => {
  const expected = new Date(2012, 9, 23);
  const actual = fromString("23/10/2012", "dd/MM/yyyy");
  assert.equal(actual.toISOString(), zonedTimeToUtc(expected).toISOString());
});
