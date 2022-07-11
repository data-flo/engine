module.exports = function newDateUTC(date) {
  const utcDate = new Date(date);
  const offsetInMiutes = date.getTimezoneOffset();
  utcDate.setMinutes(utcDate.getMinutes() - offsetInMiutes);
  return utcDate;
};
