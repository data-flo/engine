import tmp  from "tmp-promise";

export default async function (options) {
  const { fd, path, cleanup } = await tmp.file();
  return fd;
};
