const nodemailer = require("nodemailer");

module.exports = async function (args) {
  const transporter = nodemailer.createTransport({
    host: args["smtp host"],
    port: args["smtp port"],
    secure: args["smtp secure"],
    auth: {
      user: args["smtp username"],
      pass: args["smtp password"],
    },
  });

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

module.exports.manifest = require("./manifest");
