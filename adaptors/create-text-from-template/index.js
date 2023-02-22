import Mustache  from "mustache";

export default function (args) {
  const view = {};

  for (const [ key, value ] of args.variables.entries()) {
    view[key] = value;
  }

  const text = Mustache.render(
    args.template,
    view,
  );

  return { text };
};

export { default as manifest } from "./manifest";
