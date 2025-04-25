const crypto = require("crypto");
const fs = require("fs");
const debug = require("cgps-stdlib/logger/debug.js");

const apiRequest = require("./api-request.js");

/**
 * Calculates the SHA-1 hash of a file
 * @param {string} filePath - Path to the file
 * @returns {Promise<string>} SHA-1 hash of the file
 */
async function calculateFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const shasum = crypto.createHash("sha1");
    const stream = fs.createReadStream(filePath);

    stream.on("data", (data) => {
      shasum.update(data);
    });

    stream.on("error", (error) => {
      reject(error);
    });

    stream.on("end", () => {
      const hash = shasum.digest("hex");
      resolve(hash);
    });
  });
}

module.exports = async function storeFile(apiUrl, accessToken, fileInput) {
  debug("Uploading file to Microreact API...", { path: fileInput.path });

  // Calculate hash before uploading
  if (fileInput.path) {
    try {
      const fileHash = await calculateFileHash(fileInput.path);
      debug("File SHA-1 hash:", fileHash);
    }
    catch (error) {
      debug("Error calculating file hash:", error);
    }
  }

  const res = await apiRequest({
    method: "post",
    baseURL: apiUrl,
    url: "/api/files/store/",
    data: fileInput,
    headers: {
      "access-token": accessToken,
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  debug("File uploaded to Microreact API", res);
  return res;
};
