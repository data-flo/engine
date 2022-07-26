const tap = require("../testing/unit");
const parseRange = require("./parse-range");

tap.test("given a valid range, it should return [0,0] to [99,0]", async (t) => {
  const actual = parseRange("A1:K100");
  const expected = {
    start: { row: 0, col: 0 },
    end: { row: 99, col: 10 },
  };
  t.same(actual, expected);
});

tap.test("given a valid range, it should return [1,0] to [-1,-1]", async (t) => {
  const actual = parseRange("2");
  const expected = {
    start: { row: 1, col: 0 },
    end: { row: -1, col: -1 },
  };
  t.same(actual, expected);
});

tap.test("given a valid range, it should return [1,1] to [-1,-1]", async (t) => {
  const actual = parseRange("B2");
  const expected = {
    start: { row: 1, col: 1 },
    end: { row: -1, col: -1 },
  };
  t.same(actual, expected);
});

tap.test("given a valid range, it should return [1,1] to [-1,-1]", async (t) => {
  const actual = parseRange("B2:");
  const expected = {
    start: { row: 1, col: 1 },
    end: { row: -1, col: -1 },
  };
  t.same(actual, expected);
});

tap.test("given a valid range, it should return [1,1] to [-1,3]", async (t) => {
  const actual = parseRange("B2:D");
  const expected = {
    start: { row: 1, col: 1 },
    end: { row: -1, col: 3 },
  };
  t.same(actual, expected);
});

tap.test("given a valid range, it should return [0,1] to [-1,3]", async (t) => {
  const actual = parseRange("B:D");
  const expected = {
    start: { row: 0, col: 1 },
    end: { row: -1, col: 3 },
  };
  t.same(actual, expected);
});

tap.test("given a valid range, it should return [0,1] to [-1,-1]", async (t) => {
  const actual = parseRange("B:");
  const expected = {
    start: { row: 0, col: 1 },
    end: { row: -1, col: -1 },
  };
  t.same(actual, expected);
});
