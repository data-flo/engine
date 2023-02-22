
const getJsonRequest = require("../../utils/requests/get-as-json");

export default async function (clientId, clientSecret) {
  if (!clientId || !clientSecret) {
    throw new Error("Both `client id` and `client secret` are required.");
  }

  const url = "https://five.epicollect.net/api/oauth/token";
  const data = {
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  };
  const response = await getJsonRequest(url, data);

  return { Authorization: `Bearer ${response.access_token}` };
};
