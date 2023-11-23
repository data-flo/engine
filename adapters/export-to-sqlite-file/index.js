const knex = require("knex");

module.exports = async function (args, context) {
  const db = knex({
    client: "sqlite3",
    connection: {
      filename: args.sqlite.getSource(),
    },
    useNullAsDefault: true,
  });

  try {
    const fields = await db.raw(
      "pragma table_info(??)",
      [ args["table name"] ],
    );
    const dbColumns = new Set();
    for (const field of fields) {
      dbColumns.add(field.name);
    }

    const dataColumns = await args.data.getColumns();
    for (const column of dataColumns) {
      if (!dbColumns.has(column)) {
        throw new Error(`SQLite DB table ${args["table name"]} has no column named ${column}`);
      }
    }

    const idColumnName = args["id column name"];
    const createdIds = [];
    const updatedIds = [];
    for await (const row of args.data.getReader()) {
      let update = false;
      if (idColumnName && row[idColumnName] !== undefined) {
        const rows = await db(args["table name"]).select(idColumnName).where({ [idColumnName]: row[idColumnName] });
        if (rows.length) {
          update = true;
        }
      }
      if (update) {
        await db(args["table name"]).where({ [idColumnName]: row[idColumnName] }).update(row);
        updatedIds.push(row[idColumnName]);
      }
      else {
        const result = await db(args["table name"]).insert(row);
        createdIds.push(row[idColumnName] || result[0]);
      }
    }
  }
  finally {
    db.destroy();
  }

  return {
    "sqlite": args.sqlite,
    // ids: [ ...createdIds, ...updatedIds ],
    // "created ids": createdIds,
    // "updated ids": updatedIds,
  };
};

module.exports.manifest = require("./manifest.js");
