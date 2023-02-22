import changeCase  from "change-case";
import { titleCase }  from "title-case";
import { swapCase }  from "swap-case";
import { spongeCase }  from "sponge-case";
import { lowerCase }  from "lower-case";
import { upperCase }  from "upper-case";






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

export default async function (args) {
  const converion = converions[args.case];
  if (!converion) {
    const validConverions = Object.keys(converions).map((x) => `\`${x}\``).join(", ");
    throw new Error(`Invalid case converion. Supported converions are: ${validConverions}`);
  }

  const data = await args.data.modifyColumnSync(
    args.column,
    (row, context, sourceValue) => {
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

export { default as manifest } from "./manifest";
