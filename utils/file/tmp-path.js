import tmp  from "tmp-promise";
import { EmptyObject }  from "../constants";



export default async function (options = EmptyObject) {
  const { fd, path, cleanup } = await tmp.file({ discardDescriptor: true, ...options });
  return path;
};
