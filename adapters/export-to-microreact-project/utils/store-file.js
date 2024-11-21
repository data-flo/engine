const apiRequest = require("./api-request.js");

module.exports = function storeFile(apiUrl, accessToken, fileInput) {
  return apiRequest({
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
};
