const DBFFile = require("dbffile");

const createTmpFilePath = require("../../utils/file/tmp-path");
const { FileStream } = require("../../types/file");

module.exports = async function (args) {
  const fieldDescriptors = [];
  for (const [ key, value ] of args.columns.entries()) {
    const [ type, size ] = value.split(" ");
    fieldDescriptors.push({
      name: key,
      type,
      size: size ? parseInt(size, 10) : undefined,
    });
  }

  const path = await createTmpFilePath({ postfix: ".dbf" });

  const dbf = await DBFFile.create(path, fieldDescriptors);

  for await (const row of args.data.getReader()) {
    await dbf.append([ row ]);
  }

  const file = new FileStream(path);

  file.name = args["output file name"];
  file.mediaType = "application/dbf";

  return { file };
};
