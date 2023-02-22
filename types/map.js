export default function (value) {
  if (value instanceof Map) {
    return value;
  }

  const map = new Map();

  if (Array.isArray(value)) {
    for (const row of value) {
      if (Array.isArray(row)) {
        map.set(row[0], row[1]);
      }
      else {
        map.set(row.key, row.value);
      }
    }
  }
  else {
    for (const [key, row] of Object.entries(value)) {
      map.set(key, row);
    }
  }

  return map;
};
