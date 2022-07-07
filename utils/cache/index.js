let currentCache = (key, expiryHours, valueGetter) => {
  return valueGetter();
};

function setCache(cache) {
  currentCache = cache;
}

module.exports = function (key, expiryHours, valueGetter) {
  return currentCache(key, expiryHours, valueGetter);
};

module.exports.setCache = setCache;
