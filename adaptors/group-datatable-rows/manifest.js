module.exports = {
  "description": "Groups rows by specified columns and puts them in a collection.",
  "group": "Transformations",
  "subgroup": "Data Manipulation",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable to sum."
    },
    {
      "name": "group by",
      "type": "list",
      "description": "Columns to group by.",
      "default": null
    },
    {
      "name": "group name",
      "type": "text",
      "description": "The name of the group.",
      "default": null
    }
  ],
  "output": [
    {
      "name": "collection",
      "type": "collection",
      "description": "A collection."
    }
  ]
}
