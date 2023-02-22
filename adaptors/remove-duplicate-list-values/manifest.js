export default {
  "description": "Removes duplicate values in a list.",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "The list containing duplicate values to be removed.",
      "required": true,
    },
    {
      "name": "case sensitive",
      "type": "boolean",
      "description": "When set to `True`, lowercase and uppercase letters are treated as different. When set to `False`, lowercase and uppercase letters are treated as equivalent.\nIf unspecified, defaults to `False`",
      "required": false,
      "default": false,
    },
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "A list containing unique values.",
    },
    {
      "name": "duplicates",
      "type": "list",
      "description": "A list containing duplicate values.",
    },
  ],
};
