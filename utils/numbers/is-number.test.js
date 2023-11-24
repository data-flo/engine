const test = require("node:test");
const assert = require("node:assert");

const isNumber = require("./is-number.js");

test("given a number, it should return true", async () => {
  const actual = isNumber(1);
  assert.deepEqual(actual, true);
});

test("given a valid string, it should return true", async () => {
  const actual = isNumber("1");
  assert.deepEqual(actual, true);
});

test("given an invalid string, it should return false", async () => {
  const actual = isNumber("A1");
  assert.deepEqual(actual, false);
});

test("given an invalid string, it should return false", async () => {
  const actual = isNumber("123abc");
  assert.deepEqual(actual, false);
});
