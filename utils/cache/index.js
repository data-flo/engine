const sqliteCache = require("./sqlite-cache.js");

const noCache = (key, valueGetter, expiryHours) => {
  return valueGetter();
};

let currentCache = process.env.NO_CACHE ? noCache : sqliteCache;

function setCache(cache) {
  currentCache = cache;
}

module.exports = function (
  key,
  valueGetter,
  expiryHours,
) {
  return currentCache(key, valueGetter, expiryHours);
};

module.exports.setCache = setCache;
