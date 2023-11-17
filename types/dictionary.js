module.exports = function (value) {
  if (value instanceof Map) {
    return value;
  }

  const dictionary = new Map();

  if (value) {
    if (Array.isArray(value)) {
      for (const row of value) {
        if (Array.isArray(row)) {
          dictionary.set(row[0], row[1]);
        }
        else {
          dictionary.set(row.key, row.value);
        }
      }
    }
    else {
      for (const [key, row] of Object.entries(value)) {
        dictionary.set(key, row);
      }
    }
  }

  return dictionary;
};
