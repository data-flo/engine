const request = require("request");

module.exports = async function (url, data) {
  return request(url, data);
};
