module.exports = {
  "description": "Renders a Mustache template and returns rendered text.",
  "group": "Transformations",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "stmp host",
      "type": "text",
      "description": "The the hostname or IP address of the SMTP server."
    },
    {
      "name": "stmp port",
      "type": "integer",
      "description": "The the port of the SMTP server."
    },
    {
      "name": "stmp username",
      "type": "text",
      "description": "The username of the SMTP account."
    },
    {
      "name": "stmp password",
      "type": "text",
      "description": "The password of the SMTP account."
    },
    {
      "name": "stmp secure",
      "type": "boolean",
      "description": "When true the connection will use TLS when connecting to server."
    },
    {
      "name": "from address",
      "type": "text",
      "description": "The email address of the sender.\nCan be plain `sender@example.com`’` or formatted `\"Sender Name\" sender@example.com`."
    },
    {
      "name": "to address",
      "type": "text",
      "description": "Comma separated list or an array of recipients email addresses.\nCan be plain `recipient@example.com`’` or formatted `\"recipient Name\" recipient@example.com`."
    },
    {
      "name": "subject",
      "type": "text",
      "description": "The subject of the email."
    },
    {
      "name": "text",
      "type": "text",
      "description": "The plaintext version of the message."
    }
  ],
  "output": [
    {
      "name": "message id",
      "type": "text",
      "description": "The final Message-Id value retruned by the SMTP server."
    },
    {
      "name": "response",
      "type": "text",
      "description": "Includes the last SMTP response from the server."
    }
  ]
}