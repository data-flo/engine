const fs = require("fs");
const stream = require("stream/promises");

const { parse, stringify } = require("csv");

const { EmptyObject, EmptyArray } = require("../constants");

const tmpFilePath = require("../utils/file/tmp-path");

class Datatable {

  static async create(options) {
    const filePath = await tmpFilePath();

    console.log({filePath})

    const stringifier = stringify({
      header: true,
      quoted: true,
      ...options,
    });

    const pipeline = stream.pipeline(
      stringifier,
      fs.createWriteStream(filePath)
    );

    stringifier.finalise = () => {
      return pipeline.then(() => new Datatable(filePath));
    };

    // stringifier
    //   .pipe(
    //     fs.createWriteStream(filePath)
    //   );
    // stringifier.finalise = () => {
    //   return (
    //     finished(stringifier)
    //       .then(() => new Datatable(filePath))
    //   );
    // };

    return stringifier;
  }

  constructor(sourceFile) {
    if (!sourceFile) {
      throw new Error("Datatable requires a source file");
    }

    this.source = sourceFile;
  }

  getSource() {
    return this.source;
  }

  getReader(options = EmptyObject) {
    const parserOptions = {
      columns: true,
      ...options,
    };
    return (
      fs.createReadStream(this.source)
        .pipe(
          parse(parserOptions)
        )
    );
  }

  getPartialReader(columns) {
    return this.getReader({
      columns: true,
      on_record(inRow) {
        for (const columnName of columns) {
          if (!(columnName in inRow)) {
            delete inRow[columnName];
          }
        }
        return inRow;
      },
    });
  }

  async getInfo() {
    const parser = this.getReader({ info: true });

    for await (const { info } of parser) {
      parser.end();
      return info;
    }

    return EmptyObject;
  }

  async getColumns() {
    const { columns } = await this.getInfo();
    return (columns || EmptyArray).map((x) => x.name);
  }

  async hasColumn(columnName) {
    const columns = await this.getColumns();
    return columns.includes(columnName);
  }

  async shouldIncludeColumns(...columnsToCheck) {
    const allColumns = await this.getColumns();
    for (const columnName of columnsToCheck) {
      if (!allColumns.includes(columnName)) {
        throw new Error(`Datatable does not include a column named ${columnName}`);
      }
    }
  }

  async shouldExcludeColumns(...columnsToCheck) {
    const allColumns = await this.getColumns();
    for (const columnName of columnsToCheck) {
      if (allColumns.includes(columnName)) {
        throw new Error(`Datatable already includes a column named ${columnName}`);
      }
    }
  }

  async transform(transformer) {
    const datatableWriter = await Datatable.create();

    this.getReader({ on_record: transformer }).pipe(datatableWriter);

    const data = await datatableWriter.finalise();

    return data;
  }

  async transformAsync(transformer) {
    const datatableWriter = await Datatable.create();

    for await (const row of this.getReader()) {
      datatableWriter.write(await transformer(row));
    }
    datatableWriter.end();

    const data = await datatableWriter.finalise();

    return data;
  }

  async addColumnSync(newColumn, valueGetter) {
    await this.shouldExcludeColumns(newColumn);
    const data = await this.transform(
      (row, context) => {
        row[newColumn] = valueGetter(row, context);
        return row;
      },
    );
    return data;
  }

}

// class AsyncDatatable {

//   static async create(options) {
//     const filePath = await tmpFile();

//     const datatable = new Datatable({
//       streamGetter: () => fs.createReadStream(filePath),
//     });

//     const stringifier = stringify({
//       header: true,
//       ...options,
//     });

//     stringifier
//       .pipe(
//         fs.createWriteStream(filePath)
//       );

//     stringifier.finalise = () => {
//       return finished(stringifier).then(() => datatable);
//     };

//     return stringifier;
//   }

//   constructor({ streamGetter, parserOptions } = {}) {
//     if (!streamGetter) {
//       throw new Error("Datatable requires stream getter");
//     }

//     this.streamGetter = streamGetter;
//     this.parserOptions = parserOptions || {};
//   }

//   async getReader() {
//     if (!this.streamGetter) {
//       throw new Error("Datatable is not readable");
//     }

//     return (
//       (await this.streamGetter())
//         .pipe(
//           parse({
//             columns: true,
//             // columns(headerCells) {
//             //   return headerCells.map((column) => column.trim());
//             // },
//             // ...this.parserOptions,
//           })
//         )
//     );
//   }

//   async getWriter(options = {}) {
//     if (this.streamGetter) {
//       throw new Error("Datatable is not writable");
//     }

//     const filePath = await tmpFile();
//     this.streamGetter = () => fs.createReadStream(filePath);

//     const stringifier = stringify({
//       header: true,
//       ...options,
//     });

//     stringifier
//       .pipe(
//         fs.createWriteStream(filePath)
//       );

//     console.log({filePath})

//     return stringifier;
//   }

//   // addColumn(columnName, valueGetter) {
//   //   if (!this.columns.includes(columnName)) {
//   //     this.columns.push(columnName);
//   //   }

//   //   for (const row of this.rows) {
//   //     row[columnName] = valueGetter.call(row, row);
//   //   }
//   //   return this;
//   // }

//   // clone() {
//   //   return new Datatable(this.columns, this.rows);
//   // }

//   // hasColumn(columnName) {
//   //   return this.columns.includes(columnName);
//   // }

//   // getColumn(columnName) {
//   //   if (!this.columns.includes(columnName)) {
//   //     throw new Error(`datatable does not include a column named ${columnName}. Columns are: ${this.columns}.`);
//   //   }
//   //   return columnName;
//   // }

//   // forEachRow(callback) {
//   //   return this.rows.forEach(callback);
//   // }

//   // map(callback) {
//   //   return this.rows.map(callback);
//   // }

// }

module.exports = function createDatatable(sourceValue) {
  if (sourceValue instanceof Datatable) {
    return sourceValue;
  }

  return new Datatable(sourceValue);
};

module.exports.Datatable = Datatable;
