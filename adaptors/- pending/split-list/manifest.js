module.exports = {
  "description": "Splits a list into two lists at the frist instance of a specified separator element.",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "A list to be sliced."
    },
    {
      "name": "separator",
      "type": "text",
      "description": "The element at which the list is split."
    },
    {
      "name": "append",
      "type": "boolean",
      "default": false,
      "description": "Whether to append the separator element to the first list.\nDefaults to `False`."
    },
    {
      "name": "prepend",
      "type": "boolean",
      "default": false,
      "description": "Whether to prepend the separator element to the second list.\nDefaults to `False`."
    }
  ],
  "output": [
    {
      "name": "first",
      "type": "list",
      "description": "A new list containing elements to the before the separator element."
    },
    {
      "name": "second",
      "type": "list",
      "description": "A new list containing elements to the after the separator element."
    }
  ]
}