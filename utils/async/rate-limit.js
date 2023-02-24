const sleep = require("./sleep");

let lastRun = 0;

module.exports = async function rateLimit(limit = 1000) {
  if ((new Date()).getTime() - lastRun < limit) {
    await sleep();
  }
  lastRun = new Date().getTime();
};
