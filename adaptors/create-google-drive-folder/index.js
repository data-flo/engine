const { google } = require("googleapis");

const getClient = require("../../utils/google-drive/get-glient");
const urlToId = require("../../utils/google-drive/folder-url-to-id");
const idToUrl = require("../../utils/google-drive/folder-id-to-url");

module.exports = async function (args) {
  const parentFolderId = urlToId(args["parent folder"]);

  const authClient = await getClient();
  const drive = google.drive({ version: "v3", auth: authClient });

  try {
    const response = await drive.files.create({
      resource: {
        name: args["folder name"],
        mimeType: "application/vnd.google-apps.folder",
        parents: [ parentFolderId ],
      },
      fields: "id",
    });

    return {
      id: response.data.id,
      url: idToUrl(response.data.id),
    };
  }
  catch (error) {
    if (error.code === 404 && error.message.startsWith("File not found:")) {
      throw new Error(`Cannot access Google Drive folder ${args["parent folder"]}. Make sure it exists and it has been shared with ${authClient.email}.`);
    }
    else {
      throw error;
    }
  }
};

module.exports.manifest = require("./manifest");
