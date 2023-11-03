module.exports = class NormalisedSet extends Set {
  constructor(keyNormaliser) {
    super();
    this.normaliser = keyNormaliser;
  }

  add(key) {
    if (typeof key === "string") {
      return super.add(this.normaliser(key));
    }

    return super.add(key);
  }

  has(key) {
    if (typeof key === "string") {
      return super.has(this.normaliser(key));
    }

    return super.has(key);
  }

  delete(key) {
    if (typeof key === "string") {
      return super.delete(this.normaliser(key));
    }

    return super.delete(key);
  }
};
