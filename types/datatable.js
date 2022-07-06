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
    for (const columnName of (Array.isArray(columnsToCheck[0]) ? columnsToCheck[0] : columnsToCheck)) {
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

  async transformSync(transformer) {
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
    const data = await this.transformSync(
      (row, context) => {
        row[newColumn] = valueGetter(row, context);
        return row;
      },
    );
    return data;
  }

  async modifyColumnSync(existingColumn, valueGetter) {
    await this.shouldIncludeColumns(existingColumn);
    const data = await this.transformSync(
      (row, context) => {
        row[existingColumn] = valueGetter(row[existingColumn], row, context);
        return row;
      },
    );
    return data;
  }

}

module.exports = function createDatatable(sourceValue) {
  if (sourceValue instanceof Datatable) {
    return sourceValue;
  }

  return new Datatable(sourceValue);
};

module.exports.Datatable = Datatable;
