import naturalCompare  from "natural-compare";

export default function (args) {
  const sign = (args["sort direction"] === "desc") ? -1 : 1;
  const list = (
    [ ...args.list ]
      .sort(
        (a, b) => sign * naturalCompare(a, b)
      )
  );

  return { list };
};

export { default as manifest } from "./manifest";
