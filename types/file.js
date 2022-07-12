const fs = require("fs");
const { finished } = require("stream/promises");

const tmpFilePath = require("../utils/file/tmp-path");

class FileStream {

  static async createEmpty(options) {
    const filePath = await tmpFilePath(options);

    return new FileStream(filePath);
  }

  static async createWriter(options) {
    const filePath = await tmpFilePath(options);

    const writeStream = fs.createWriteStream(filePath);

    writeStream.finalise = () => {
      return (
        finished(writeStream)
          .then(() => new FileStream(filePath))
      );
    };

    return writeStream;
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
      fs.createReadStream(this.source, options)
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
