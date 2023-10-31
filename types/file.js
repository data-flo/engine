const FS = require("fs");
const StreamPromises = require("stream/promises");
// const maybeGunzip = require("gunzip-maybe");

const { EmptyObject } = require("../utils/constants/index.js");

const tmpFilePath = require("../utils/file/tmp-path.js");

class FileStream {

  static async createEmpty(options = EmptyObject) {
    const { name, mediaType, ...rest } = options;
    const filePath = await tmpFilePath(rest);

    const file = new FileStream(filePath);

    file.name = name;
    file.mediaType = mediaType;

    return file;
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

  // static async createFromSource(source) {
  //   const fileWriter = await FileStream.createWriter();

  //   if (await fileExists(source)) {
  //     return new FileStream(source);
  //   }

  //   const file = await fileWriter.finalise();

  //   file.name = stream.name;
  //   file.mediaType = stream.mediaType;

  //   return file;
  // }

  constructor(sourceValue) {
    if (!sourceValue) {
      throw new Error("FileStream requires a source file");
    }

    if (typeof sourceValue !== "string") {
      throw new Error(`Cannot convert value '${sourceValue}' to file stream`);
    }

    if (!FS.existsSync(sourceValue)) {
      throw new Error("Source is not accessible");
    }

    this.source = sourceValue;
  }

  getSource() {
    return this.source;
  }

  getReader(options) {
    return (
      FS.createReadStream(
        this.source,
        options,
      )
        // .pipe(maybeGunzip())
    );
  }

  async getContents(options) {
    const contents = await FS.promises.readFile(this.getSource(), options);
    return contents;
  }

}

module.exports = function createFile(sourceValue) {
  if (sourceValue instanceof FileStream) {
    return sourceValue;
  }

  if (typeof sourceValue === "object" && typeof sourceValue.source === "string") {
    return new FileStream(sourceValue.source);
  }

  return new FileStream(sourceValue);
};

module.exports.FileStream = FileStream;
