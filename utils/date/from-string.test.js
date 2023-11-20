const tap = require("../../utils/testing/unit");
const fromString = require("./from-string");

await t.test("given an invalid string, it should return undefined", async (t) => {
  const input = "";
  const expected = undefined;
  const actual = fromString(input);
  t.equal(actual, expected);
});

await t.test("given an ISO string, it should return a date", async (t) => {
  const input = "2022-06-29T09:33:49+00:00";
  const expected = new Date(input);
  const actual = fromString(input);
  t.equal(actual.toISOString(), expected.toISOString());
});

await t.test("given a date and a format, it should return the formatted string", async (t) => {
  const expected = new Date(2022, (6 - 1 /* zero-based month */), 29);
  const actual = fromString("06/29/2022", "MM/DD/YYYY");
  t.equal(actual.toISOString(), expected.toISOString());
});

await t.test("given a date, a format, and a locale string, it should return the formatted string", async (t) => {
  const expected = new Date(2022, (6 - 1 /* zero-based month */), 29);
  const actual = fromString("29 jun 2022", "DD MMM YYYY", "es");
  t.equal(actual.toISOString(), expected.toISOString());
});
