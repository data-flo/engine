module.exports = {
  "description": "Downloads a file on the web.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "url",
      "description": "The url of the file to download."
    }
  ],
  "output": [
    {
      "name": "file",
      "type": "file",
      "description": "The downloaded file."
    }
  ]
}