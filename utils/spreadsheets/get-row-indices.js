module.exports = function getRowIndices(rows) {
  if (rows) {
    return new Set(rows.map((x) => Number.parseInt(x)));
  }
  return undefined;
};
