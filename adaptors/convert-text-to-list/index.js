import makeRegexp  from "../../utils/text/make-regexp";

export default function (args) {
  const regex = makeRegexp(args.separator);
  const text = (args.separator === "\n") ? args.text.replace(/\r\n/g, "\n") : args.text;

  const hasLimit = Number.isInteger(args.limit);

  const list = (
    text
      .trim()
      .split(regex)
      .filter((x) => x !== "")
      .filter((_, index) => !hasLimit || index < args.limit)
  );

  return { list };
};

export { default as manifest } from "./manifest";
