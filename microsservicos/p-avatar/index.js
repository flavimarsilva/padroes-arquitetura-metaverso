const express = require("express");
const cors = require("cors");
const db = require("./database");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors());

app.use(express.static("public"));

app.get("/p-avatar/get", async (req, res) => {
  const response = await db.query(
    "select * from prontuario where id = 1 limit 1"
  );
  console.log(response.rows);
  res.json({
    data: response.rows,
  });
});
app.get("/p-avatar", (req, res) =>
  res.sendFile("./index.html", { root: __dirname })
);

app.listen(3002, () => console.log(`Users API listening on port 3002!`));
