import { Datatable }  from "../../types/datatable";
import getProjectSlug  from "./get-project-slug";
import fetchEntries  from "./fetch-entries";




export default async function (args) {
  const slug = getProjectSlug(args.url);

  const datatableWriter = await Datatable.create();

  const entries = fetchEntries(
    slug,
    args["map index"],
    args["client id"],
    args["client secret"],
  );

  for await (const row of entries) {
    datatableWriter.write(row);
  }

  datatableWriter.end();

  const data = await datatableWriter.finalise();

  return {
    data,
    slug,
  };
};

export { default as manifest } from "./manifest";
