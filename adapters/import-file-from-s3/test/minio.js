const path = require("path");
const Minio = require("minio");

const currentFolder = path.resolve(__dirname);

const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "NNEV9C8ZYRHATNI2MRZ9",
  secretKey: "DgsAUwzoBssqAAa7WxzeBzO4Ty1rloXIFsTZFWXC",
});
function uploadFileToMinio() {
  // File that needs to be uploaded.
  const file = `${currentFolder}/output`;

  minioClient.makeBucket("test", "us-east-1", (err) => {
    if (err) return console.log("There is an error");

    const metaData = {
      "Content-Type": "application/octet-stream",
    };

    minioClient.fPutObject("test", "output", file, metaData, (error, etag) => {
      if (err) return console.log(error);
      console.log("Put file in bucket");
    });
  });
}
module.exports = { uploadFileToMinio };