import CaseInsensitiveSet  from "../../utils/structures/case-insensitive-set";

export default function (args) {
  const set = args["case sensitive"] ? new Set() : new CaseInsensitiveSet();
  const list = [];
  const duplicates = [];
  for (const value of args.list) {
    if (set.has(value)) {
      duplicates.push(value);
    }
    else {
      list.push(value);
      set.add(value);
    }
  }

  return {
    list,
    duplicates,
  };
};

export { default as manifest } from "./manifest";
