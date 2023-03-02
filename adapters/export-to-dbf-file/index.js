const DBFFile = require("dbffile");

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

  const file = await FileStream.createEmpty({ postfix: ".dbf" });

  const dbf = await DBFFile.create(file.getSource(), fieldDescriptors);

  for await (const row of args.data.getReader()) {
    await dbf.append([ row ]);
  }

  file.name = args["output file name"];
  file.mediaType = "application/dbf";

  return { file };
};

module.exports.manifest = require("./manifest");
