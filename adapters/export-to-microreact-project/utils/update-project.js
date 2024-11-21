const apiRequest = require("./api-request.js");

module.exports = function updateProject(apiUrl, accessToken, projectId, json) {
  return apiRequest({
    method: "post",
    baseURL: apiUrl,
    url: "/api/projects/update/",
    data: json,
    params: { project: projectId },
    headers: {
      "access-token": accessToken,
    },
  });
};
