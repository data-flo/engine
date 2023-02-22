export default function (value) {
  if (typeof value === "string") {
    return value;
  }

  return String(value);
};
