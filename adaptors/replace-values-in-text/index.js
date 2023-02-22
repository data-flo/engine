import makeRegexp  from "../../utils/text/make-regexp";

export default function (args) {
  const pattern = makeRegexp(args.pattern, true, true);

  const text = args.text.replace(
    pattern,
    args.replacement,
  );

  return { text };
};

export { default as manifest } from "./manifest";
