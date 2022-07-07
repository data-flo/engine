const changeCase = require("change-case");
const { titleCase } = require("title-case");
const { swapCase } = require("swap-case");
const { spongeCase } = require("sponge-case");
const { lowerCase } = require("lower-case");
const { upperCase } = require("upper-case");

const converions = {
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
  const converion = converions[args.case];
  if (!converion) {
    const validConverions = Object.keys(converions).map((x) => `\`${x}\``).join(", ");
    throw new Error(`Invalid case converion. Supported converions are: ${validConverions}`);
  }

  const data = await args.data.modifyColumnSync(
    args.column,
    (sourceValue) => {
      if (sourceValue) {
        return converion(sourceValue);
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

module.exports.manifest = require("./manifest");
