const test = require("node:test");
const assert = require("node:assert");

const isInteger = require("./is-integer.js");

test("given a number, it should return true", async () => {
  const actual = isInteger(1);
  assert.deepEqual(actual, true);
});

test("given a decimal, it should return true", async () => {
  const actual = isInteger(1.1);
  assert.deepEqual(actual, false);
});

test("given a valid string, it should return true", async () => {
  const actual = isInteger("1");
  assert.deepEqual(actual, true);
});

test("given an invalid string, it should return false", async () => {
  const actual = isInteger("A1");
  assert.deepEqual(actual, false);
});

test("given an invalid string, it should return false", async () => {
  const actual = isInteger("123abc");
  assert.deepEqual(actual, false);
});
