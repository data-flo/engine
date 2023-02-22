import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
import fs  from "fs";
import path  from "path";
import manifests  from "./manifests";



const inputs = {
  "Metadata ENA": (path.resolve(__dirname, "abaumannii_20220401_V1.csv")),
  // "Metadata ENA": (path.resolve(__dirname, "100k.csv")),
  // "Metadata ENA": (path.resolve(__dirname, "all.csv")),
  // "Metadata ENA": (path.resolve(__dirname, "mini.csv")),
  "ID's file": (path.resolve(__dirname, "abaumannii_20220401_ids.txt")),
  // "ID's file": (path.resolve(__dirname, "ids.txt")),
};

export default {
  inputs,
  manifest: manifests[0].manifest,
};
