const fs = require("fs");
// import maybeGunzip from "gunzip-maybe";

async function createIndex(source, startLine = 0) {
  const fileIndex = [ 0 ];
  let count = 1 - startLine;
  let offset = 0;
  if (startLine === 0) {
    fileIndex.push(offset);
  }
  return new Promise((resolve, reject) => {
    fs.createReadStream(source)
      .on("data", (chunk) => {
        let index = -1;
        while ((index = chunk.indexOf(10, index + 1)) > -1) { // eslint-disable-line no-cond-assign
          count++; // eslint-disable-line no-plusplus
          if ((count - 1) % 1000 === 0) {
            fileIndex.push(offset + index + 1);
          }
        }
        offset += chunk.length;
      })
      .on("end", () => {
        fileIndex[0] = count - startLine;
        fileIndex.push(offset);
        resolve(fileIndex);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

module.exports = createIndex;
