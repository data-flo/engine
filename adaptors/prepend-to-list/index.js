module.exports = function (args) {
  const list = [
    args.value,
    ...args.list,
  ];

  return { list };
};
