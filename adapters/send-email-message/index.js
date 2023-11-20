const nodemailer = require("nodemailer");

module.exports = async function (args) {
  const options = {
    host: args["smtp host"],
    port: args["smtp port"],
    secure: args["smtp secure"],
  };
  if (args["smtp username"] && args["smtp password"]) {
    options.auth = {
      user: args["smtp username"],
      pass: args["smtp password"],
    };
  }
  const transporter = nodemailer.createTransport(options);

  const info = await transporter.sendMail({
    from: args["from address"],
    to: args["to address"],
    subject: args.subject,
    text: args.text,
  });

  return {
    "message id": info.messageId,
    "status code": info.response,
  };
};

module.exports.manifest = require("./manifest.js");
