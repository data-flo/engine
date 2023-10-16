const fs = require("fs");

module.exports = async function (index, source, from, to) {
  const entryIndex = Math.floor(from / 1000) + 1;
  const fromOffset = index[entryIndex];
  const toOffset = index[entryIndex + 1];
  const length = toOffset - fromOffset;
  const filehandle = await fs.promises.open(source, "r");
  const buffer = Buffer.alloc(length);
  filehandle.read(buffer, 0, length, fromOffset);
  await filehandle.close();
  return buffer.toString("utf8");
};
