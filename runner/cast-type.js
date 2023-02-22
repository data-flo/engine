import types from "../types/index";

export default function get(name, value) {
  const typeCreator = types[name];

  return typeCreator(value);
}
