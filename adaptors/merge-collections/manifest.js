module.exports = {
  "description": "Merges the entries of two collections.",
  "group": "Transformations",
  "subgroup": "JSON Manipulation",
  "input": [
    {
      "name": "first collection",
      "type": "collection",
      "description": "The first collection."
    },
    {
      "name": "second collection",
      "type": "collection",
      "description": "The second collection."
    }
  ],
  "output": [
    {
      "name": "collection",
      "type": "collection",
      "description": "A new collection containing the merged entries."
    }
  ]
}