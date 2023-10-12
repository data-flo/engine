const apiRequest = require("./api-request");

module.exports = function getProjectDoc(apiUrl, accessToken, projectId) {
  return apiRequest({
    method: "post",
    baseURL: apiUrl,
    url: "/projects/json/",
    params: { project: projectId },
    headers: {
      "access-token": accessToken,
    },
  });
};
