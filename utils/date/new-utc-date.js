// module.exports = function newUtcDate(...args) {
//   return new Date(Date.UTC(...args));
// };
export default function newDateUTC(fullYear, month = 0, day = 1, hour = 0, minute = 0, second = 0, millisecond = 0) {
  const utcDate = new Date(0);
  utcDate.setUTCFullYear(fullYear, month, day);
  utcDate.setUTCHours(hour, minute, second, millisecond);
  return utcDate;
};
