const validRegexp = /^https:\/\/((?:edge\.)?microreact\.org)\/project\/(.+)$/i;

function rewriteUrl(url) {
  const match = validRegexp.exec(url);
  if (match) {
    return `https://${match[1]}/api/viewer/data?project=${match[2]}`;
  }
  else {
    throw new Error("Invalid Microreact project URL.");
  }
}

module.exports = async function (args, context) {
  const sourceUrl = rewriteUrl(args.url);
  const data = await context.request.getHttp(sourceUrl);
  return {
    data,
    sourceUrl,
  };
};
