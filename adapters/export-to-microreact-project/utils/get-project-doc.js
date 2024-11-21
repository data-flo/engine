const apiRequest = require("./api-request.js");

module.exports = function getProjectDoc(apiUrl, accessToken, projectId) {
  return apiRequest({
    method: "post",
    baseURL: apiUrl,
    url: "/api/projects/json/",
    params: { project: projectId },
    headers: {
      "access-token": accessToken,
    },
  });
};
