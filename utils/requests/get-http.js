import request  from "request";

export default async function (url, data) {
  return new Promise((resolve, reject) => {
    request(url, data, (error, response, body) => {
      if (error) {
        reject(error);
      }
      else {
        resolve(body);
      }
    });
  });
};
