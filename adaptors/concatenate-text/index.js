
export default function (args) {
  return { combination: `${args.left}${args.separator}${args.right}` };
};

export { default as manifest } from "./manifest";
