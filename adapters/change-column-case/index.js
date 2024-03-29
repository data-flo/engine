const changeCase = require("change-case");
const { titleCase } = require("title-case");
const { swapCase } = require("swap-case");
const { spongeCase } = require("sponge-case");
const { lowerCase } = require("lower-case");
const { upperCase } = require("upper-case");

const conversions = {
  camel: changeCase.camelCase,
  capital: changeCase.capitalCase,
  constant: changeCase.constantCase,
  dot: changeCase.dotCase,
  header: changeCase.headerCase,
  hyphen: changeCase.paramCase,
  kebab: changeCase.paramCase,
  lower: lowerCase,
  no: changeCase.noCase,
  param: changeCase.paramCase,
  pascal: changeCase.pascalCase,
  path: changeCase.pathCase,
  sentence: changeCase.sentenceCase,
  snake: changeCase.snakeCase,
  sponge: spongeCase,
  swap: swapCase,
  title: titleCase,
  upper: upperCase,
};

module.exports = async function (args) {
  let conversionCase = args.case;

  const index = conversionCase.indexOf(" case");
  if (index >= 0) {
    conversionCase = conversionCase.substring(0, index);
  }

  const conversion = conversions[conversionCase];

  if (!conversion) {
    const validConversions = Object.keys(conversions).map((x) => `\`${x}\``).join(", ");
    throw new Error(`Invalid case conversion. Supported conversions are: ${validConversions}`);
  }

  const data = await args.data.modifyColumnSync(
    args.column,
    (row, context, sourceValue) => {
      if (sourceValue) {
        return conversion(sourceValue);
      }
      else {
        return sourceValue;
      }
    },
  );

  return {
    data,
  };
};

module.exports.manifest = require("./manifest.js");
