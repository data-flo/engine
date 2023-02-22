
export default function (args) {
  const list = [
    ...args["first list"],
    ...args["second list"],
  ];
  return {
    list,
  };
};

export { default as manifest } from "./manifest";
