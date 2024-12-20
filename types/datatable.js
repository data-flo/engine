const fs = require("fs");
const stream = require("stream");
// const zlib = require("zlib");

const { parse, stringify } = require("csv");

const { EmptyObject, EmptyArray } = require("../utils/constants/index.js");
const tmpFilePath = require("../utils/file/tmp-path.js");
const getDatatableIndex = require("../utils/indexing/get-datatable-index.js");

const { FileStream } = require("./file.js");

let sum0 = 0;
let count0 = 0;

let sum1 = 0;
let count1 = 0;

let prev;

function createAsyncTransformer(transformer) {
  class Transformer extends stream.Transform {
    // eslint-disable-next-line class-methods-use-this
    _transform(chunk, encoding, done) {

      const t0 = performance.now();

      if (prev) {
        sum1 += (t0 - prev);
        count1 += 1;
      }
      prev = t0;

      transformer(chunk)
        .then((x) => {
          sum0 += (performance.now() - t0);
          count0 += 1;
          done(null, x);
        })
        .catch(done);
    }
  }
  return new Transformer({ objectMode: true });
}

class Datatable {

  static async create(options) {
    const filePath = await tmpFilePath();

    const stringifier = stringify({
      header: true,
      quoted: true,
      bom: true, // Add universal BOM to force excel to read CSV in utf-8 https://stackoverflow.com/questions/42462764/javascript-export-csv-encoding-utf-8-issue
      cast: {
        date(value) {
          return value.toISOString();
        },
        string(value) {
          return value.replace(/\n/g, "");
        },
      },
      ...options,
    });

    const fileStream = fs.createWriteStream(filePath);

    const pipeline = stream.promises.pipeline(
      stringifier,
      // zlib.createGzip(),
      fileStream,
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

  static async createFromIterable(rows, options) {
    const dataWriter = await Datatable.create(options);

    for (const row of rows) {
      dataWriter.write(row);
    }

    dataWriter.end();

    const data = await dataWriter.finalise();

    return data;
  }

  static async createFromAsyncIterable(rows, options) {
    const dataWriter = await Datatable.create(options);

    await stream.promises.pipeline(
      rows,
      dataWriter,
    );

    const data = await dataWriter.finalise();

    return data;
  }

  constructor(sourceFile) {
    if (!sourceFile) {
      throw new Error("Datatable requires a source file");
    }

    if (!fs.existsSync(sourceFile)) {
      throw new Error("Source is not accessible");
    }

    if (typeof sourceFile === "string") {
      this.source = sourceFile;
    }
    else if (typeof sourceFile.source === "string") {
      this.source = sourceFile.source;
    }
  }

  getSource() {
    return this.source;
  }

  getReader(options = EmptyObject) {
    const parserOptions = {
      bom: true,
      columns: true,
      trim: true,
      ...options,
    };

    return (
      fs.createReadStream(this.source)
        // .pipe(
        //   zlib.createGunzip()
        // )
        .pipe(
          parse(parserOptions)
        )
    );

    // const parser = parse(parserOptions);

    // stream.promises.pipeline(
    //   fs.createReadStream(this.source),
    //   // zlib.createGunzip(),
    //   parser,
    // );

    // return parser;
  }

  async getIndex() {
    return getDatatableIndex(this.getSource());
  }

  async getNumberOfRows() {
    const [rowCount] = await this.getIndex();
    return rowCount;
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

    // eslint-disable-next-line no-unreachable-loop
    for await (const { info } of parser) {
      parser.end();
      return info;
    }

    return EmptyObject;
  }

  async getColumns() {
    const info = await this.getInfo();
    return (info.columns || EmptyArray).map((x) => x.name);
  }

  async hasColumn(columnName) {
    const columns = await this.getColumns();
    return columns.includes(columnName);
  }

  async shouldIncludeColumns(...columnsToCheck) {
    const allColumns = await this.getColumns();
    if (allColumns.length) {
      const columns = Array.isArray(columnsToCheck[0]) ? columnsToCheck[0] : columnsToCheck;
      for (const columnName of columns) {
        if (!allColumns.includes(columnName)) {
          throw new Error(`Datatable does not include a column named ${columnName}`);
        }
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

  async clone(
    columns,
    options = EmptyObject,
  ) {
    //#region using transform

    // const { transform } = require("csv");
    // module.exports = async function (args) {
    //   const transformer = transform(
    //     (inRow) => {
    //       const outRow = {};
    //       for (const columnName of args.columns) {
    //         if (columnName in inRow) {
    //           outRow[columnName] = inRow[columnName];
    //         }
    //       }
    //       return outRow;
    //     }
    //   );

    //   const inDataReader = await args.data.getReader();
    //   const datatableWriter = await Datatable.create();

    //   inDataReader
    //     .pipe(transformer)
    //     .pipe(datatableWriter);

    //   const data = await datatableWriter.finalise();

    //   return {
    //     data,
    //   };
    // };

    //#endregion

    //#region manual selection of columns

    // module.exports = async function (args) {
    //   const transformer = (inRow) => {
    //     const outRow = {};
    //     for (const columnName of args.columns) {
    //       if (columnName in inRow) {
    //         outRow[columnName] = inRow[columnName];
    //       }
    //     }
    //     return outRow;
    //   };

    //   const data = await args.data.transform(transformer);

    //   return {
    //     data,
    //   };
    // };

    //#endregion

    //#region using partial reader

    // const datatableWriter = await Datatable.create();

    // if (columns) {
    //   this.getPartialReader(columns)
    //     .pipe(datatableWriter);
    // }
    // else {
    //   this.getReader()
    //     .pipe(datatableWriter);
    // }

    // const clonedDatatable = await datatableWriter.finalise();
    //#endregion

    const datatableWriter = await Datatable.create({
      columns,
      ...options,
    });

    this.getReader()
      .pipe(datatableWriter);

    const clonedDatatable = await datatableWriter.finalise();

    return clonedDatatable;
  }

  async transformSync(
    transformer,
    writerOptions,
  ) {
    const datatableWriter = await Datatable.create(writerOptions);

    await stream.promises.pipeline(
      this.getReader({ on_record: transformer }),
      datatableWriter,
    );

    const data = await datatableWriter.finalise();

    return data;
  }

  async transformAsync(transformer) {
    const datatableWriter = await Datatable.create();

    await stream.promises.pipeline(
      this.getReader(),
      createAsyncTransformer(transformer),
      datatableWriter,
    );

    // console.debug("timer 0", sum0, count0, sum0 / count0)
    // console.debug("timer 1", sum1, count1, sum1 / count1)

    // for await (const row of this.getReader()) {
    //   datatableWriter.write(await transformer(row));
    // }
    // datatableWriter.end();

    const data = await datatableWriter.finalise();

    return data;
  }

  async addColumnSync(newColumn, valueGetter) {
    await this.shouldExcludeColumns(newColumn);
    const data = await this.transformSync(
      (row, context) => {
        row[newColumn] = valueGetter(row, context);
        return row;
      },
    );
    return data;
  }

  async addColumnAsync(newColumn, valueGetter) {
    await this.shouldExcludeColumns(newColumn);
    const data = await this.transformAsync(
      async (row, context) => {
        row[newColumn] = await valueGetter(row, context);
        return row;
      },
    );
    return data;
  }

  async modifyColumnSync(existingColumn, valueGetter) {
    await this.shouldIncludeColumns(existingColumn);
    const data = await this.transformSync(
      (row, context) => {
        row[existingColumn] = valueGetter(
          row,
          context,
          row[existingColumn],
        );
        return row;
      },
    );
    return data;
  }

  async replaceColumnValues(columnNames, regex, replacement) {
    const data = await this.transformSync(
      (row) => {
        for (const columnName of columnNames) {
          if (typeof row[columnName] === "string") {
            row[columnName] = row[columnName].replace(regex, replacement);
          }
        }

        return row;
      }
    );

    return data;
  }

  async readAllRows() {
    const rows = [];

    for await (const row of this.getReader()) {
      rows.push(row);
    }

    return rows;
  }

  async toFileStream() {
    const file = new FileStream(this.getSource());
    return file;
  }

}

module.exports = function createDatatable(sourceValue) {
  if (sourceValue instanceof Datatable) {
    return sourceValue;
  }

  return new Datatable(sourceValue);
};

module.exports.Datatable = Datatable;
