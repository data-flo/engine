const getJsonRequest = require("../../utils/request/get-json");

const getProjectSlug = require("./utils/get-project-slug");
const { Datatable } = require("../../types/datatable");

const sleep = require("./utils/sleep");

const getAuthorisationHeader = require("./get-authorisation-header");

async function* fetchEntries(slug, mapIndex = "", clientId, clientSecret, pageSize = 1000) {
  let url = new URL(slug, "https://five.epicollect.net/api/export/entries/").toString();

  const options = {};

  if ((clientId || clientSecret)) {
    if (clientId && clientSecret) {
      options.headers = await getAuthorisationHeader(clientId, clientSecret);
    }
    else {
      throw new Error("Both `client id` and `client secret` are required.");
    }
  }

  while (url) {
    const body = await getJsonRequest(
      url,
      {
        map_index: mapIndex,
        per_page: pageSize,
        format: "json",
      },
      options,
    );

    for (const commit of body.data.entries) {
      yield commit;
    }

    url = body.links.next;

    if (url) {
      await sleep(1001);
    }
  }
}

module.exports = async function (args) {
  const slug = getProjectSlug(args.url);

  const datatableWriter = await Datatable.create();

  for await (const row of fetchEntries(slug, args["map index"], args["client id"], args["client secret"])) {
    datatableWriter.write(row);
  }

  datatableWriter.end();

  const data = await datatableWriter.finalise();

  return {
    data,
    slug,
  };
};

module.exports.manifest = require("./manifest");
