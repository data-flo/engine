let currentCache = (key, expiryHours, valueGetter) => {
  return valueGetter();
};

export function  setCache (cache) {
  currentCache = cache;
}

export default function (key, expiryHours, valueGetter) {
  return currentCache(key, expiryHours, valueGetter);
};


