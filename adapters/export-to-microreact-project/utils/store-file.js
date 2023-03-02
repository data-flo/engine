const apiRequest = require("./api-request");

module.exports = function storeFile(apiUrl, accessToken, fileInput) {
  return apiRequest({
    method: "post",
    baseURL: apiUrl,
    url: "/files/store/",
    data: fileInput,
    headers: {
      "access-token": accessToken,
    },
  });
};
