
export default function (args) {
  const list = [
    ...args.list,
    args.value,
  ];

  return { list };
};

export { default as manifest } from "./manifest";
