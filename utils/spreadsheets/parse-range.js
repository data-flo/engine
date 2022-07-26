/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-cond-assign */

const isInteger = require("../numbers/is-integer");

function rangeToIndex(range) {
  const o = { start: { col: 0, row: 0 }, end: { col: 0, row: 0 } };
  let idx = 0; let i = 0; let
    cc = 0;
  const len = range.length;
  for (idx = 0; i < len; ++i) {
    if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
    idx = 26 * idx + cc;
  }
  o.start.col = --idx;

  for (idx = 0; i < len; ++i) {
    if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
    idx = 10 * idx + cc;
  }
  o.start.row = --idx;

  if (i === len || cc != 10) { o.end.col = o.start.col; o.end.row = o.start.row; return o; }
  ++i;

  for (idx = 0; i != len; ++i) {
    if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
    idx = 26 * idx + cc;
  }
  o.end.col = --idx;

  for (idx = 0; i != len; ++i) {
    if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
    idx = 10 * idx + cc;
  }
  o.end.row = --idx;
  return o;
}

module.exports = function parseRange(input) {
  let range;

  if (isInteger(input)) {
    range = rangeToIndex(`${input}:`);
  }
  else if (input.indexOf(":") < 0) {
    range = rangeToIndex(`${input}:`);
  }
  else {
    range = rangeToIndex(input);
  }

  if (range.start.col === -1) {
    range.start.col = null;
  }
  else {
    range.start.col += 1;
  }
  if (range.start.row === -1) {
    range.start.row = null;
  }
  else {
    range.start.row += 1;
  }
  if (range.end.col === -1) {
    range.end.col = null;
  }
  else {
    range.end.col += 1;
  }
  if (range.end.row === -1) {
    range.end.row = null;
  }
  else {
    range.end.row += 1;
  }

  return range;
};
