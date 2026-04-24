module.exports = {
  "description": "Imports records from a REDCap API endpoint as a datatable.",
  "group": "Import",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "text",
      "description": "The REDCap API endpoint URL, for example `https://redcap.example.com/api/`.",
      "required": true,
    },
    {
      "name": "api token",
      "type": "text",
      "description": "The REDCap API token.",
      "required": true,
      "ui": { "secret": true },
    },
    {
      "name": "forms",
      "type": "list",
      "description": "REDCap form names to export.",
      "required": true,
      "default": ["sample_site_questionnaire"],
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing the imported REDCap records.",
    },
  ],
};
