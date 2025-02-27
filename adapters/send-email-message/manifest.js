module.exports = {
  "description": "Sends an email message via a SMTP server.",
  "group": "Export",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "smtp host",
      "type": "text",
      "description": "The hostname or IP address of the SMTP server.",
      "required": true,
    },
    {
      "name": "smtp port",
      "type": "number",
      "description": "The port of the SMTP server.",
      "required": true,
    },
    {
      "name": "smtp username",
      "type": "text",
      "description": "The username of the SMTP account.",
      "required": false,
    },
    {
      "name": "smtp password",
      "type": "text",
      "description": "The password of the SMTP account.",
      "required": false,
    },
    {
      "name": "smtp secure",
      "type": "boolean",
      "description": "When set to `True`, the connection to the server will use TLS protocol.",
      "required": true,
    },
    {
      "name": "from address",
      "type": "text",
      "description": "The email address of the sender.\nCan be plain `sender@example.com` or formatted `\"Sender Name\" sender@example.com`.",
      "required": true,
    },
    {
      "name": "to address",
      "type": "text",
      "description": "Comma separated list or an array of recipients email addresses.\nCan be plain `recipient@example.com` or formatted `\"recipient Name\" recipient@example.com`.",
      "required": true,
    },
    {
      "name": "subject",
      "type": "text",
      "description": "The subject of the email.",
      "required": true,
    },
    {
      "name": "text",
      "type": "text",
      "description": "The plaintext version of the message.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "message id",
      "type": "text",
      "description": "The final Message-Id value returned by the SMTP server.",
    },
    {
      "name": "status code",
      "type": "text",
      "description": "Includes the last SMTP response from the server.",
    },
  ],
};
