const express = require("express");
const httpProxy = require("express-http-proxy");
const app = express();
const port = 3000;
const { MEDICAL_RECORD_API_URL, P_AVATAR_API_URL } = require("./URLs");

const medicalRecordServiceProxy = httpProxy(MEDICAL_RECORD_API_URL);
const pAvatarServiceProxy = httpProxy(P_AVATAR_API_URL);

app.get("/", (req, res) => res.send("Hello Gateway API"));

app.get("/prontuario", (req, res, next) =>
  medicalRecordServiceProxy(req, res, next)
);
app.get("/p-avatar", (req, res, next) => pAvatarServiceProxy(req, res, next));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
