module.exports = class NormalisedMap extends Map {
  constructor(keyNormaliser) {
    super();
    this.normaliser = keyNormaliser;
  }

  set(key, value) {
    if (typeof key === "string") {
      key = this.normaliser(key);
    }
    return super.set(key, value);
  }

  get(key) {
    if (typeof key === "string") {
      key = this.normaliser(key);
    }

    return super.get(key);
  }

  has(key) {
    if (typeof key === "string") {
      key = this.normaliser(key);
    }

    return super.has(key);
  }
};
