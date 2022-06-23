const fs = require("fs");

const { parse, stringify } = require("csv");
const { finished } = require("stream/promises");

const tmpFilePath = require("../utils/file/tmp-path");

class Datatable {

  static async create(options) {
    const filePath = await tmpFilePath();

    const stringifier = stringify({
      header: true,
      ...options,
    });

    console.log({filePath})

    stringifier
      .pipe(
        fs.createWriteStream(filePath)
      );

    stringifier.finalise = () => {
      return (
        finished(stringifier)
          .then(() => new Datatable(filePath))
      );
    };

    return stringifier;
  }

  constructor(sourceFile) {
    if (!sourceFile) {
      throw new Error("Datatable requires a source file");
    }

    this.source = sourceFile;
  }

  getReader() {
    return (
      fs.createReadStream(this.source)
        .pipe(
          parse({
            columns: true,
          })
        )
    );
  }

}

class AsyncDatatable {

  static async create(options) {
    const filePath = await tmpFile();

    const datatable = new Datatable({
      streamGetter: () => fs.createReadStream(filePath),
    });

    const stringifier = stringify({
      header: true,
      ...options,
    });

    stringifier
      .pipe(
        fs.createWriteStream(filePath)
      );

    stringifier.finalise = () => {
      return finished(stringifier).then(() => datatable);
    };

    return stringifier;
  }

  constructor({ streamGetter, parserOptions } = {}) {
    if (!streamGetter) {
      throw new Error("Datatable requires stream getter");
    }

    this.streamGetter = streamGetter;
    this.parserOptions = parserOptions || {};
  }

  async getReader() {
    if (!this.streamGetter) {
      throw new Error("Datatable is not readable");
    }

    return (
      (await this.streamGetter())
        .pipe(
          parse({
            columns: true,
            // columns(headerCells) {
            //   return headerCells.map((column) => column.trim());
            // },
            // ...this.parserOptions,
          })
        )
    );
  }

  async getWriter(options = {}) {
    if (this.streamGetter) {
      throw new Error("Datatable is not writable");
    }

    const filePath = await tmpFile();
    this.streamGetter = () => fs.createReadStream(filePath);

    const stringifier = stringify({
      header: true,
      ...options,
    });

    stringifier
      .pipe(
        fs.createWriteStream(filePath)
      );

    console.log({filePath})

    return stringifier;
  }

  // addColumn(columnName, valueGetter) {
  //   if (!this.columns.includes(columnName)) {
  //     this.columns.push(columnName);
  //   }

  //   for (const row of this.rows) {
  //     row[columnName] = valueGetter.call(row, row);
  //   }
  //   return this;
  // }

  // clone() {
  //   return new Datatable(this.columns, this.rows);
  // }

  // hasColumn(columnName) {
  //   return this.columns.includes(columnName);
  // }

  // getColumn(columnName) {
  //   if (!this.columns.includes(columnName)) {
  //     throw new Error(`datatable does not include a column named ${columnName}. Columns are: ${this.columns}.`);
  //   }
  //   return columnName;
  // }

  // forEachRow(callback) {
  //   return this.rows.forEach(callback);
  // }

  // map(callback) {
  //   return this.rows.map(callback);
  // }

}

module.exports = function createDatatable(sourceValue) {
  if (sourceValue instanceof Datatable) {
    return sourceValue;
  }

  return new Datatable(sourceValue);
};

module.exports.Datatable = Datatable;
