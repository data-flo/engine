const tap = require("../testing/unit");
const parseRange = require("./parse-range");

await t.test("given a valid range, it should return [1,1] to [100,1]", async (t) => {
  const actual = parseRange("A1:K100");
  const expected = {
    start: { row: 1, col: 1 },
    end: { row: 100, col: 11 },
  };
  assert.deepEqual(actual, expected);
});

await t.test("given a valid range, it should return [2,null] to [null,null]", async (t) => {
  const actual = parseRange("2");
  const expected = {
    start: { row: 2, col: null },
    end: { row: null, col: null },
  };
  assert.deepEqual(actual, expected);
});

await t.test("given a valid range, it should return [2,2] to [null,null]", async (t) => {
  const actual = parseRange("B2");
  const expected = {
    start: { row: 2, col: 2 },
    end: { row: null, col: null },
  };
  assert.deepEqual(actual, expected);
});

await t.test("given a valid range, it should return [2,2] to [null,null]", async (t) => {
  const actual = parseRange("B2:");
  const expected = {
    start: { row: 2, col: 2 },
    end: { row: null, col: null },
  };
  assert.deepEqual(actual, expected);
});

await t.test("given a valid range, it should return [2,2] to [null,4]", async (t) => {
  const actual = parseRange("B2:D");
  const expected = {
    start: { row: 2, col: 2 },
    end: { row: null, col: 4 },
  };
  assert.deepEqual(actual, expected);
});

await t.test("given a valid range, it should return [null,2] to [null,4]", async (t) => {
  const actual = parseRange("B:D");
  const expected = {
    start: { row: null, col: 2 },
    end: { row: null, col: 4 },
  };
  assert.deepEqual(actual, expected);
});

await t.test("given a valid range, it should return [null,2] to [null,null]", async (t) => {
  const actual = parseRange("B:");
  const expected = {
    start: { row: null, col: 2 },
    end: { row: null, col: null },
  };
  assert.deepEqual(actual, expected);
});
