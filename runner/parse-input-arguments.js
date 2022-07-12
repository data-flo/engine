const castType = require("./cast-type");

module.exports = function inputArguments(manifest, rawValues) {
  const input = {};

  // check arguments against manifest
  for (const spec of manifest) {
    if (typeof spec.required !== "boolean") {
      throw new Error(`required is missing from ${spec.name}`);
    }

    const rawValue = rawValues[spec.name];
    if (rawValue !== undefined) {
      input[spec.name] = castType(spec.type, rawValue);
    }
    else if (spec.required) {
      throw new Error(`A value is required for input argument ${spec.name}`);
    }
    else if (spec.default !== undefined) {
      input[spec.name] = castType(spec.type, spec.default);
    }
  }

  return input;
};
