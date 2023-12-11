const DBFFile = require("dbffile");

const { FileStream } = require("../../types/file.js");

module.exports = async function (args) {
  const fieldDescriptors = [];
  for (const [ key, value ] of args["column types"].entries()) {
    const [ type, size ] = value.split(" ");
    const fieldDescriptor = {
      name: key,
      type,
    };
    if (size) {
      fieldDescriptor.size = parseInt(size);
    }
    fieldDescriptors.push(fieldDescriptor);
  }

  const filePath = await FileStream.createTempPath({
    touch: false,
    postfix: ".dbf",
  });

  const dbf = await DBFFile.create(
    filePath,
    fieldDescriptors,
  );

  for await (const row of args.data.getReader()) {
    await dbf.append([ row ]);
  }

  const file = new FileStream(filePath);

  file.name = args["output file name"];
  file.mediaType = "application/dbf";

  return { "dbf": file };
};

module.exports.manifest = require("./manifest.js");
