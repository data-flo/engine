const crypto = require("crypto");
const fs = require("fs");
const { spawn } = require('child_process');
const debug = require("cgps-stdlib/logger/debug.js");

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

  const res = await new Promise((resolve, reject) => {
    const curl = spawn(
      'curl', 
      [
        "--location",
        "--request",
        "POST",
        "--data-binary",
        `@${fileInput.path}`,
        "--header",
        `access-token: ${accessToken}`,
        "--header",
        `Content-Type: application/octet-stream`,
        `${apiUrl}api/files/store/`
      ],
    );

    const chunks = [];
    curl.stdout.on('data', (data) => {
      chunks.push(data.toString());
    });

    curl.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    curl.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Child process exited with code ${code}`));
      }
      else {
        const json = JSON.parse(chunks.join(''));
        debug("File uploaded to Microreact API", json);
        resolve(json);
      }
    });
  });

  return res;
};
