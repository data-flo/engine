import yn  from "yn";

export default function (value) {
  if (typeof value === "boolean") {
    return value;
  }

  const bool = yn(value);

  return bool;
};
