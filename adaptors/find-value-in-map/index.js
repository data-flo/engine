
export default function (args) {
  if (args.map.has(args.key)) {
    return {
      value: args.map.get(args.key),
    };
  }
  else {
    return {
      value: args["default value"],
    };
  }
};

export { default as manifest } from "./manifest";
