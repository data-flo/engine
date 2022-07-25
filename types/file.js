const FS = require("fs");
const StreamPromises = require("stream/promises");
const { EmptyObject } = require("../utils/constants");

const tmpFilePath = require("../utils/file/tmp-path");

class FileStream {

  static async createEmpty(options = EmptyObject) {
    const { fileName, ...rest } = options;
    const filePath = await tmpFilePath(rest);

    return new FileStream(filePath);
  }

  static async createWriter(options) {
    const file = await FileStream.createEmpty(options);

    const writeStream = FS.createWriteStream(file.getSource());

    writeStream.finalise = () => {
      return (
        StreamPromises.finished(writeStream)
          .then(() => file)
      );
    };

    return writeStream;
  }

  static async createFromStream(stream) {
    const fileWriter = await FileStream.createWriter();

    await StreamPromises.pipeline(
      stream,
      fileWriter,
    );

    const file = await fileWriter.finalise();

    file.name = stream.name;
    file.mediaType = stream.mediaType;

    return file;
  }

  constructor(sourceValue) {
    if (!sourceValue) {
      throw new Error("FileStream requires a source file");
    }

    if (typeof sourceValue !== "string") {
      throw new Error(`Cannot convert value '${sourceValue}' to file stream`);
    }

    this.source = sourceValue;
  }

  getSource() {
    return this.source;
  }

  getReader(options) {
    return (
      FS.createReadStream(this.source, options)
    );
  }

}

module.exports = function createFile(sourceValue) {
  if (sourceValue instanceof FileStream) {
    return sourceValue;
  }

  return new FileStream(sourceValue);
};

module.exports.FileStream = FileStream;
