const tap = require("tap");
const reverseGeocode = require("./reverse-geocode");

tap.test("given an invalid string, it should return undefined", async (t) => {
  const expected = undefined;
  const actual = await reverseGeocode(
    process.env.OPENCAGE_API_KEY,
    "52.12670207561581, 0.17255181706350176",
  );
  t.equal(actual, expected);
});
