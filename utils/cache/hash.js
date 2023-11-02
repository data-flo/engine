const crypto = require("crypto");

function replacer(_, value) {
  if (value instanceof Map) {
    return Array.from(value.entries());
  }
  return value;
}

function hash(
  object,
) {
  const string = JSON.stringify(
    object,
    replacer,
  );

  const shasum = crypto.createHash("sha1");
  shasum.update(string);
  const checksum = shasum.digest("hex");

  return checksum;
}

module.exports = hash;
