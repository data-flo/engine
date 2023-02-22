import tap  from "../testing/unit";
import isNumber  from "./is-number";


tap.test("given a number, it should return true", async () => {
  const actual = isNumber(1);
  tap.same(actual, true);
});

tap.test("given a valid string, it should return true", async () => {
  const actual = isNumber("1");
  tap.same(actual, true);
});

tap.test("given an invalid string, it should return false", async () => {
  const actual = isNumber("A1");
  tap.same(actual, false);
});

tap.test("given an invalid string, it should return false", async () => {
  const actual = isNumber("123abc");
  tap.same(actual, false);
});
