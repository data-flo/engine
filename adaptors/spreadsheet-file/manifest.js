module.exports = {
  "description": "Imports a spreadsheet file and converts to a datatable.\nSupported file formats: `.xlsx`, `.xlsm`, `.xlsb`, `.xls`, `.xls`, `.xls`, `.xls`, `.ods`, `.fods`, `.csv`, `.txt`, `.sylk`, `.html`, `.dif`, `.dbf`, `.rtf`, `.prn`, and `.eth`.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "file",
      "type": "file",
      "description": "A list to be converted to a datatable."
    },
    {
      "name": "sheetname",
      "type": "text",
      "default": null,
      "description": "The name of sheet from which the data will be read.\nThe first sheet will be used if `sheetname` is unspecified."
    },
    {
      "name": "range",
      "type": "text",
      "description": "A valid sheet range which contains data.\nIf unspecified, the whole sheet will be included.",
      "default": null
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing the sheet data."
    }
  ]
}