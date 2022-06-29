module.exports = function (args) {
  const list = [
    ...args.list,
    args.value,
  ];
  return {
    list,
  };
};
