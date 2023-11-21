const tap = require("../../utils/testing/unit");
const toString = require("./to-string");

await t.test("given a string, it should return undefined", async (t) => {
  const input = "2022-06-29T09:33:49-00:00";
  const expected = undefined;
  const actual = toString(input);
  assert.equal(actual, expected);
});

await t.test("given an ISO string, it should return the same string", async (t) => {
  const expected = "2022-06-29T09:33:49+00:00";
  const input = new Date(expected);
  const actual = toString(input);
  assert.equal(actual, expected);
});

await t.test("given an ISO string, it should return the same string", async (t) => {
  const expected = "2022-06-29T21:33:49+12:00";
  const input = new Date("2022-06-29T09:33:49+00:00");
  const actual = toString(input, undefined, undefined, "Pacific/Auckland");
  assert.equal(actual, expected);
});

await t.test("given a date and a format, it should return the formatted string", async (t) => {
  const expected = "2022-06-29";
  const input = new Date("2022-06-29");
  const actual = toString(input, "YYYY-MM-DD");
  assert.equal(actual, expected);
});

await t.test("given a date, a format, and a locale string, it should return the formatted string", async (t) => {
  const expected = "29 jun 2022";
  const input = new Date("2022-06-29");
  const actual = toString(input, "DD MMM YYYY", "es");
  assert.equal(actual, expected);
});
