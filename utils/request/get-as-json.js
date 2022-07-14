const axios = require("axios");
const { EmptyObject } = require("../constants");

module.exports = async function getJson(url, data, options = EmptyObject) {
  const response = await axios({
    method: "get",
    url,
    data,
    ...options,
  });

  if (response.status !== 200) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  return response.data;
};
