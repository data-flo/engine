import makeRegexp  from "../../utils/text/make-regexp";

export default function (args) {
  const regexp = makeRegexp(args.pattern);
  const index = args.list.findIndex((item) => regexp.test(item));
  return {
    value: (index >= 0) ? args.list[index] : null,
    index: (index >= 0) ? index + 1 : null,
  };
};

export { default as manifest } from "./manifest";
