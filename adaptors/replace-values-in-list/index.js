import makeRegexp  from "../../utils/text/make-regexp";

export default function (args) {
  const pattern = makeRegexp(args.pattern);

  const list = [];

  for (const item of args.list) {
    list.push(
      (item || "").replace(
        pattern,
        args.replacement,
      )
    );
  }

  return { list };
};

export { default as manifest } from "./manifest";
