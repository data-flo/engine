import fs  from "fs";
import stream  from "stream/promises";
import { parse, stringify }  from "csv";
import { FileStream }  from "./file";
import { EmptyObject, EmptyArray }  from "../utils/constants";
import tmpFilePath  from "../utils/file/tmp-path";









export class Datatable  {

  static async create(options) {
    const filePath = await tmpFilePath();

    const stringifier = stringify({
      header: true,
      quoted: true,
      bom: true, // Add universal BOM to force excel to read CSV in utf-8 https://stackoverflow.com/questions/42462764/javascript-export-csv-encoding-utf-8-issue
      ...options,
    });

    const fileStream = fs.createWriteStream(filePath);

    const pipeline = stream.pipeline(
      stringifier,
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

    for await (const row of rows) {
      dataWriter.write(row);
    }

    dataWriter.end();

    const data = await dataWriter.finalise();

    return data;
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
      bom: true,
      columns: true,
      trim: true,
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

  async clone(columns, options = EmptyObject) {
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

export default function createDatatable(sourceValue) {
  if (sourceValue instanceof Datatable) {
    return sourceValue;
  }

  return new Datatable(sourceValue);
};


