const crypto = require("crypto");
const fs = require("fs");
const debug = require("cgps-stdlib/logger/debug.js");
// const { request } = require("undici");
// const { Curl } = require("node-libcurl");
// const { fetch } = require("undici");
const superagent = require("superagent");
// const ky = require("ky");

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

// async function sendFileAsRequestBody(filePath, url, accessToken, method = "POST") {
//   // Create a new Curl instance
//   const curl = new Curl();

//   try {
//     // Read the file content
//     const fileContent = fs.readFileSync(filePath);

//     // Get file information for content-type header
//     const fileStats = fs.statSync(filePath);

//     // Configure curl request
//     curl.setOpt(Curl.option.URL, url);
//     curl.setOpt(Curl.option.CUSTOMREQUEST, method); // HTTP method
//     curl.setOpt(Curl.option.POSTFIELDS, fileContent); // Set file content as body
//     curl.setOpt(Curl.option.HTTPHEADER, [
//       `Content-Type: application/octet-stream`, // Use appropriate content-type
//       `Content-Length: ${fileStats.size}`,
//       `access-token: ${accessToken}`,
//     ]);

//     // Optional: Verbose output for debugging
//     // curl.setOpt(Curl.option.VERBOSE, true);

//     // Return a promise for the request
//     return new Promise((resolve, reject) => {
//       curl.on("end", function (statusCode, data, headers) {
//         console.log(`Status code: ${statusCode}`);
//         console.log(`Response: ${data}`);

//         resolve({ statusCode, data, headers });
//         this.close();
//       });

//       curl.on("error", function (error) {
//         console.error("Error:", error);
//         reject(error);
//         this.close();
//       });

//       // Execute the request
//       curl.perform();
//     });
//   }
//   catch (error) {
//     curl.close();
//     throw error;
//   }
// }

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

  // const {
  //   body,
  //   statusCode,
  //   headers,
  // } = await fetch(
  //   `${apiUrl}api/files/store/`,
  //   {
  //     method: "POST",
  //     // dispatcher: agent,
  //     headers: { "access-token": accessToken },
  //     body: fs.createReadStream(fileInput.path),
  //     duplex: "half", // Add this line to fix the error
  //   },
  // );
  // const res = await body.json();
  // const res = await sendFileAsRequestBody(
  //   fileInput.path,
  //   `${apiUrl}api/files/store/`,
  //   accessToken,
  // );
  // console.error(`${apiUrl}api/files/store/`, { statusCode, headers });

  const buffer = await fs.promises.readFile(fileInput.path);

  const res = await superagent.post(`${apiUrl}api/files/store/`)
    .set("access-token", accessToken)
    // .attach("file", fileInput.path)
    // .set("Content-Type", "application/octet-stream") // or appropriate content-type
    // .send(fs.readFileSync(fileInput.path)) // you can also stream with `.pipe()`
    .send(buffer)
    // .then((r) => {
    //   debug("File uploaded successfully", r.status);
    //   return r.body;
    // })
    .catch((err) => {
      debug("Error uploading file", err);
      throw err;
    });
  const json = res.body;

  // const res = await ky.default.post(
  //   `${apiUrl}api/files/store/`,
  //   {
  //     method: "POST",
  //     headers: { "access-token": accessToken },
  //     // body: fs.createReadStream(fileInput.path),
  //   }
  // )
  //   .json();

  debug("File uploaded to Microreact API", json);

  return json;
};
