function replacer(key, value) {
  if (value instanceof Map) {
    return Array.from(value.entries());
  }
  return value;
}

function stringify(
  object,
) {
  return JSON.stringify(
    object,
    replacer,
  );
}

module.exports = stringify;
