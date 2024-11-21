const apiRequest = require("./api-request.js");

module.exports = function createProject(apiUrl, accessToken, json) {
  return apiRequest({
    method: "post",
    baseURL: apiUrl,
    url: "/api/projects/create/",
    data: json,
    headers: {
      "access-token": accessToken,
    },
  });
};
