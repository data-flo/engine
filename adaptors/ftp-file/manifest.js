module.exports = {
  "description": "Use the either the SSH File Transfer Protocol to File Transfer Protocol to import a file.\n\n**FTP server**\nWhen specifying the URL for connection to a FTP server use the syntax\n```\nftp:://[username:password@]hostname.com/path/to/file.txt\n```\nusername and password are optional. If you omit the `username:password@` then `anonymous` will be used for both username and password\n\n**SFTP server**\nWhen specifying the URL for connection to a SFTP server use the syntax\n```\nsftp:://username:password@hostname.com/path/to/file.txt\n```\nusername and password are required.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "text",
      "description": "The url of the file to be imported. e.g [s]ftp:://[username:password@]hostname.com/path/to/file.txt"
    }
  ],
  "output": [
    {
      "name": "file",
      "type": "file",
      "description": "The imported file."
    }
  ]
}