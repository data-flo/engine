
export default function (args) {
  const list = [
    args.value,
    ...args.list,
  ];

  return { list };
};

export { default as manifest } from "./manifest";
