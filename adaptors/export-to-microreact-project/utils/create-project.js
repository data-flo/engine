const apiRequest = require("./api-request");

module.exports = function createProject(apiUrl, accessToken, json) {
  return apiRequest({
    method: "post",
    baseURL: apiUrl,
    url: "/projects/create/",
    data: json,
    headers: {
      "access-token": accessToken,
    },
  });
};
