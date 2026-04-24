const { Datatable } = require("../../types/datatable.js");
const { FileStream } = require("../../types/file.js");

module.exports = async function (args) {
  const params = new URLSearchParams();

  params.set("token", args["api token"]);
  params.set("content", "record");
  params.set("action", "export");
  params.set("format", "csv");
  params.set("type", "flat");
  params.set("csvDelimiter", "");
  params.set("rawOrLabel", "raw");
  params.set("rawOrLabelHeaders", "raw");
  params.set("exportCheckboxLabel", "false");
  params.set("exportSurveyFields", "false");
  params.set("exportDataAccessGroups", "false");
  params.set("returnFormat", "json");

  for (const [ index, formName ] of args["forms"].entries()) {
    params.set(`forms[${index}]`, formName);
  }

  const response = await fetch(
    args.url,
    {
      "body": params.toString(),
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      "method": "POST",
    },
  );

  if (!response.ok) {
    throw new Error(`REDCap request failed with status ${response.status}: ${bodyText}`);
  }

  const file = await FileStream.createFromStream(response.body);

  const datatable = new Datatable(file.getSource());

  return {
    data: datatable,
  };
};

module.exports.manifest = require("./manifest.js");
