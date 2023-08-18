const { google } = require("googleapis");

const folderUrlToId = require("../../utils/google-api/folder-url-to-id");
const fileUrlToId = require("../../utils/google-api/file-url-to-id");
const fileIdToUrl = require("../../utils/google-api/file-id-to-url");
const getClient = require("../../utils/google-api/get-glient");

module.exports = async function (args) {
  let fileId;
  if (args["file url"]) {
    fileId = fileUrlToId(args["file url"]);
  }

  const authClient = await getClient();
  const drive = google.drive({ version: "v3", auth: authClient });

  try {
    const method = fileId ? "update" : "create";
    const parents = fileId ? undefined : [ folderUrlToId(args["folder url"]) ];
    const response = await drive.files[method]({
      resource: {
        name: args["output file name"] || args.file.name || "Untitled",
        parents,
      },
      fileId,
      media: {
        mimeType: args.file.mediaType || "application/octet-stream",
        body: args.file.getReader(),
      },
      fields: "id",
    });

    return {
      id: response.data.id,
      url: fileIdToUrl(response.data.id),
    };
  }
  catch (error) {
    if (error.code === 404 && error.message.startsWith("File not found: ")) {
      throw new Error(`Cannot access Google Drive folder ${args["folder url"]}. Make sure it exists and it has been shared with ${authClient.email}`);
    }
    else {
      throw error;
    }
  }
};

module.exports.manifest = require("./manifest.js");
