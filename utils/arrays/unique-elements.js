export default function uniqueElements(array, valueOf, sort = false) {
  const unique = new Set();

  if (typeof valueOf === "function") {
    for (const item of array) {
      unique.add(valueOf(item));
    }
  }
  else if (typeof valueOf === "string") {
    for (const item of array) {
      unique.add(item[valueOf]);
    }
  }
  else {
    for (const item of array) {
      unique.add(item);
    }
  }

  if (sort) {
    return Array.from(unique).sort();
  }
  else {
    return Array.from(unique);
  }
}
