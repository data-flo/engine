export default class CaseInsensitiveSet extends Set {
  constructor(values) {
    super(
      Array.from(
        values || [],
        (x) => (
          (typeof x === "string") ? x.toLowerCase() : x
        ),
      )
    );
  }

  add(key) {
    if (typeof key === "string") {
      return super.add(key.toLowerCase());
    }

    return super.add(key);
  }

  has(key) {
    if (typeof key === "string") {
      return super.has(key.toLowerCase());
    }

    return super.has(key);
  }

  delete(key) {
    if (typeof key === "string") {
      return super.delete(key.toLowerCase());
    }

    return super.delete(key);
  }
};
