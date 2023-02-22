import { parse }  from "csv";

export default async function (args) {
  const list = [];

  const iterator = args.file.getReader({ encoding: args.encoding })
    .pipe(
      parse({
        columns: false,
        delimiter: args.separator,
        record_delimiter: args.separator,
        trim: args.trim,
        quote: null,
      })
    );

  for await (const item of iterator) {
    list.push(item[0]);
  }

  return {
    list,
  };
};

export { default as manifest } from "./manifest";
