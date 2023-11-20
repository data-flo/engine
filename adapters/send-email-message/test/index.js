const assert = require("node:assert");
const path = require("path");
const test = require("node:test");

const { setupServices } = require("../../../utils/testing/unit.js");

const adaptor = require("../index.js");

test("send-email-message adaptor", async (t) => {
  setupServices(path.resolve(__dirname));

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  await t.test("given a pubic object with keys, it should download it", async () => {
    const output = await adaptor(
      {
        "smtp host": "localhost",
        "smtp port": 1025,
        "smtp secure": false,
        "from address": "sender@example.com",
        "to address": "recipient@example.com",
        "subject": "Hello World!",
        "text": "Sent from Data-flo!",
      }
    );
    assert.ok(output["message id"], "adaptor should return message id");
    assert.ok(output["status code"], "adaptor should return status code");
    const [ message ] = await fetch("http://localhost:1080/api/emails")
      .then((res) => res.json());
    assert.equal(message.subject, "Hello World!");
    assert.equal(message.text, "Sent from Data-flo!\n");
    assert.equal(message.from.value[0].address, "sender@example.com");
    assert.equal(message.to.value[0].address, "recipient@example.com");
  });

});
