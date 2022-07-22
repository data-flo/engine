module.exports = {
  "description": "Imports a list from a text file.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "file",
      "type": "file",
      "description": "The text file to be converted.",
    },
    {
      "name": "encoding",
      "type": "text",
      "default": "utf8",
      "description": "The character encoding of the input `file`.\nDefaults to `utf8`.",
      "enum": [
        "ascii",
        "base64",
        "binary",
        "hex",
        "ucs2",
        "utf8",
        "latin1",
      ],
    },
    {
      "name": "separator",
      "type": "text",
      "default": "\n",
      "description": "Character used as column separator. Defaults to `\\n` (newline).",
      "enum": [
        [ "\n", "Newline (\\n)" ],
        [ "\r\n", "CRLF (\\r\\n)" ],
        [ ",", "Comma (,)" ],
        [ ";", "Semicolon (;)" ],
        [ " ", "Space" ],
        [ "\t", "tab (\\t)" ],
      ],
    },
    {
      "name": "trim",
      "type": "boolean",
      "default": true,
      "description": "Specifies whether to ignore whitespace characters immediately around the separator.\nDefaults to True.",
    },
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "A list of values.",
    },
  ],
};
