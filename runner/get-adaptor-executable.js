import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function getAdaptorExecutable(name) {
  const executable = await import(
    path.join(
      __dirname,
      "..",
      "adaptors",
      name,
      "index.js",
    )
  );
  executable.default.manifest = executable.manifest;
  return executable.default;
}
