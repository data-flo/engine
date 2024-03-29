const test = require("node:test");
const assert = require("node:assert");

const difference = require("./difference.js");

test("given an invalid unit, it should return undefined", async (t) => {
  const expected = undefined;
  const actual = difference(new Date(2015, 1, 11), new Date(2013, 11, 31), "");
  assert.equal(actual, expected);
});

test("given two dates, it should return difference in years", async (t) => {
  const expected = 1;
  const actual = difference(new Date(2015, 1, 11), new Date(2013, 11, 31), "years");
  assert.equal(actual, expected);
});

test("given two dates, it should return difference in quarters", async (t) => {
  const expected = 2;
  const actual = difference(new Date(2014, 6, 2), new Date(2013, 11, 31), "quarters");
  assert.equal(actual, expected);
});

test("given two dates, it should return difference in months", async (t) => {
  const expected = 7;
  const actual = difference(new Date(2014, 8, 1), new Date(2014, 0, 31), "months");
  assert.equal(actual, expected);
});

test("given two dates, it should return difference in weeks", async (t) => {
  const expected = 2;
  const actual = difference(new Date(2014, 6, 20), new Date(2014, 6, 5), "weeks");
  assert.equal(actual, expected);
});

test("given two dates, it should return difference in days", async (t) => {
  const expected = 92;
  const actual = difference(new Date(2020, 5, 1), new Date(2020, 2, 1), "days");
  assert.equal(actual, expected);
});

test("given two dates, it should return difference in hours", async (t) => {
  const expected = 12;
  const actual = difference(new Date(2014, 6, 2, 19, 0), new Date(2014, 6, 2, 6, 50), "hours");
  assert.equal(actual, expected);
});

test("given two dates, it should return difference in minutes", async (t) => {
  const expected = 12;
  const actual = difference(new Date(2014, 6, 2, 12, 20, 0), new Date(2014, 6, 2, 12, 7, 59), "minutes");
  assert.equal(actual, expected);
});

test("given two dates, it should return difference in seconds", async (t) => {
  const expected = 12;
  const actual = difference(new Date(2014, 6, 2, 12, 30, 20, 0), new Date(2014, 6, 2, 12, 30, 7, 999), "seconds");
  assert.equal(actual, expected);
});

test("given two dates, it should return difference in milliseconds", async (t) => {
  const expected = 1100;
  const actual = difference(new Date(2014, 6, 2, 12, 30, 21, 700), new Date(2014, 6, 2, 12, 30, 20, 600), "milliseconds");
  assert.equal(actual, expected);
});
