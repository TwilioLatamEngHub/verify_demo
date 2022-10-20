const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

require("dotenv").config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const verifyService = process.env.VERIFY_SERVICE;

const client = require("twilio")(accountSid, authToken);

app.post("/sendCode", (req, res) => {
  const number = req.body.number;
  const channel = req.body.channel;
  console.log(number, channel);

  client.verify.v2
    .services(verifyService)
    .verifications.create({ to: number, channel })
    .then((verification) => {
      console.log(verification.sid);
      res.json({ created: verification.sid });
    })
    .catch((e) => {
      console.log("Error", e);
      res.send(400);
    });
});

app.post("/verifyCode", (req, res) => {
  const number = req.body.number;
  const code = req.body.code;
  console.log(number, code);

  client.verify.v2
    .services(verifyService)
    .verificationChecks.create({ to: number, code })
    .then((verification_check) => {
      console.log(verification_check.status);
      res.json(verification_check.status);
    });
});

app.use(express.static(__dirname + "/website"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
