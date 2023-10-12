/* eslint-disable no-throw-literal */

const axios = require("axios");

module.exports = function apiRequest(request) {
  return (
    axios.request(request)
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
        throw new Error(
          `${error.message}. ${error && error.response ? error.response.data : ""}`
        );
        // throw {
        //   // error,
        //   code: error && error.response ? error.response.status : undefined,
        //   status: error && error.response ? error.response.statusText : undefined,
        //   message: error && error.response ? error.response.data : undefined,
        // };
      })
  );
};
