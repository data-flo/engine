const tap = require("../testing/unit");
const reverseGeocoder = require("./here-revgeocode");

tap.test("given an address string, it should return a location", async (t) => {
  const expected = [
    37.37634,
    -122.03405,
    "houseNumber",
    "USA",
    "200 S Mathilda Ave, Sunnyvale, CA 94086-6135, United States",
  ];
  const actual = await reverseGeocoder(
    process.env.HERE_API_KEY,
    "37.37634,-122.03405",
  );
  t.same(actual, expected);
});

tap.test("given a city, it should return a location", async (t) => {
  const expected = [
    51.50643,
    -0.12719,
    "city",
    "GBR",
    "London, England, United Kingdom",
  ];
  const actual = await reverseGeocoder(
    process.env.HERE_API_KEY,
    "london",
  );
  t.same(actual, expected);
});

tap.test("given a city and a geographic area, it should return a location", async (t) => {
  const expected = [
    37.12723,
    -84.08383,
    "city",
    "USA",
    "London, KY, United States",
  ];
  const actual = await geocoder(
    process.env.HERE_API_KEY,
    "london",
    "USA",
  );
  t.same(actual, expected);
});

tap.test("given an invalid string, it should return undefined", async (t) => {
  const expected = undefined;
  const actual = await geocoder(
    process.env.HERE_API_KEY,
    "52.12670207561581, 0.17255181706350176",
  );
  t.equal(actual, expected);
});
