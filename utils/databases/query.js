import knex  from "knex";

export default function queryDatabase(client, connection, query) {
  if (!/^\s*SELECT/i.test(query)) {
    throw new Error("Invalid SQL Query: query should start with a SELECT statement.");
  }

  const instance = knex({
    client,
    connection,
    useNullAsDefault: true,
  });

  const stream = instance.raw(query).stream();

  stream.on(
    "end",
    () => instance.destroy(),
  );

  return stream;
};
