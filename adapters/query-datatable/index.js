/* eslint-disable camelcase */
const rbql = require("rbql");

const tmpFilePath = require("../../utils/file/tmp-path.js");

const { Datatable } = require("../../types/datatable.js");

// const fs = require('fs');
// const os = require('os');
// const path = require('path');
// function is_ascii(str) {
//   return /^[\x00-\x7F]*$/.test(str);
// }
// async function query_csv(queryText, input_path, input_delim, input_policy, output_path, output_delim, output_policy, csv_encoding, output_warnings, with_headers = false, comment_prefix = null, user_init_code = "", options = null) {
//   let input_stream = null;
//   let bulk_input_path = null;
//   if (options && options["bulk_read"] && input_path) {
//     bulk_input_path = input_path;
//   }
//   else {
//     input_stream = input_path === null ? process.stdin : fs.createReadStream(input_path);
//   }
//   const [output_stream, close_output_on_finish] = output_path === null ? [process.stdout, false] : [fs.createWriteStream(output_path), true];
//   if (input_delim === "\"" && input_policy === "quoted") {
//     throw new rbql.RbqlIOHandlingError("Double quote delimiter is incompatible with \"quoted\" policy");
//   }
//   if (csv_encoding === "latin-1") {
//     csv_encoding = "binary";
//   }
//   if (!is_ascii(queryText) && csv_encoding === "binary") {
//     throw new rbql.RbqlIOHandlingError("To use non-ascii characters in query enable UTF-8 encoding instead of latin-1/binary");
//   }
//   if ((!is_ascii(input_delim) || !is_ascii(output_delim)) && csv_encoding === "binary") {
//     throw new rbql.RbqlIOHandlingError("To use non-ascii characters in query enable UTF-8 encoding instead of latin-1/binary");
//   }

//   // const default_init_source_path = path.join(os.homedir(), ".rbql_init_source.js");
//   // if (user_init_code === "" && fs.existsSync(default_init_source_path)) {
//   //   user_init_code = read_user_init_code(default_init_source_path);
//   // }
//   const input_file_dir = input_path ? path.dirname(input_path) : null;
//   const join_tables_registry = new rbql.FileSystemCSVRegistry(input_file_dir, input_delim, input_policy, csv_encoding, with_headers, comment_prefix, options);
//   const input_iterator = new rbql.CSVRecordIterator(
//     input_stream,
//     bulk_input_path,
//     csv_encoding,
//     input_delim,
//     input_policy,
//     with_headers,
//     comment_prefix,
//     "data",
//     "a",
//   );
//   const output_writer = new rbql.CSVWriter(output_stream, close_output_on_finish, csv_encoding, output_delim, output_policy);

//   await rbql.query(queryText, input_iterator, output_writer, output_warnings, join_tables_registry, user_init_code);
//   join_tables_registry.get_warnings(output_warnings);
// }

module.exports = async function (args) {
  const filePath = await tmpFilePath({ touch: false });

  const warnings = [];

  await rbql.query_csv(
    args.query,
    args.data.getSource(),
    ",",
    "quoted",
    filePath,
    ",",
    "quoted",
    "utf-8",
    warnings,
    true /* with_headers */,
  );

  const data = new Datatable(filePath);

  return { data };
};

module.exports.manifest = require("./manifest.js");
