function createTextNormaliser(
  matchCase,
  matchDiacritics,
) {
  if (matchCase && matchDiacritics) {
    return (x) => x.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  if (matchCase) {
    return (x) => x.toLowerCase();
  }

  if (matchDiacritics) {
    return (x) => x.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  return (x) => x;
}

module.exports = createTextNormaliser;
