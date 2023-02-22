import { parse }  from "csv";
import getRequestAsStream  from "../../utils/requests/get-as-stream";
import { Datatable }  from "../../types/datatable";

const getRequestAsJSON = require("../../utils/requests/get-as-json");



function rewriteUrl(url) {
  const validRegexp = /^https?:\/\/(.+)\/project\/(.+)$/i;
  const match = validRegexp.exec(url);
  if (match) {
    return `https://${match[1]}/api/projects/json/?project=${match[2]}`;
  }
  else {
    throw new Error("Invalid Microreact project URL.");
  }
}

function getMainDataset(info) {
  for (const datasetId of Object.keys(info.datasets)) {
    if (info.datasets[datasetId].idFieldName) {
      return info.datasets[datasetId];
    }
  }

  throw new Error("Invalid");
}

export default async function (args, context) {
  const infoUrl = rewriteUrl(args.project);

  const info = await getRequestAsJSON(infoUrl);

  // find the data file id from the main dataset
  const mainDataset = getMainDataset(info);
  const dataFile = info.files[mainDataset.file];

  const stream = await getRequestAsStream(dataFile.url);

  const datatableWriter = await Datatable.create();

  stream
    .pipe(
      parse({
        columns: (
          (headerCells) => headerCells.map((column) => column.trim())
        ),
        trim: true,
      })
    )
    .pipe(
      datatableWriter
    );

  const data = await datatableWriter.finalise();

  return { data };
};

export { default as manifest } from "./manifest";
