function createTextNormaliser(
  matchMode,
) {
  if (matchMode === "match-case") {
    return (x) => x.toLowerCase();
  }

  if (matchMode === "match-diacritics") {
    return (x) => x.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  if (matchMode === "match-case-and-diacritics") {
    return (x) => x.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  throw new Error("Invalid match mode");
}

module.exports = createTextNormaliser;
