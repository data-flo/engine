const { FileStream } = require("../../types/file.js");
const getRequestAsStream = require("../../utils/requests/get-as-stream.js");
const getRequestAsJSON = require("../../utils/requests/get-as-json.js");

module.exports = async function (args) {
  const validUrl = /^https:\/\/figshare\.com\/.+\/(\d+)/i;

  const match = validUrl.exec(args.url);

  if (!match || !match[1]) {
    throw new Error("Invalid FigShare URL.");
  }

  const info = await getRequestAsJSON(`https://api.figshare.com/v2/articles/${match[1]}`);

  if (info?.files?.[0]?.download_url) {
    const data = await getRequestAsStream(info.files[0].download_url);

    const file = await FileStream.createFromStream(data);

    file.name = info?.files?.[0]?.name || file.name;

    return { file };
  }
  else {
    throw new Error("Invalid FigShare URL");
  }
};

module.exports.manifest = require("./manifest.js");
