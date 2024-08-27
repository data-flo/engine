const getJsonRequest = require("../../utils/requests/get-as-json");

const sleep = require("../../utils/async/sleep");

const getAuthorisationHeader = require("./get-authorisation-header");

module.exports = async function* fetchEntries(slug, mapIndex = "", clientId, clientSecret, pageSize = 1000) {
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
      "get",
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
};
