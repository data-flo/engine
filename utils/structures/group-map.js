module.exports = class GroupMap extends Map {
  add(key, value) {
    const group = super.get(key);
    if (group) {
      group.push(value);
    }
    else {
      super.set(key, [ value ]);
    }
  }
};
