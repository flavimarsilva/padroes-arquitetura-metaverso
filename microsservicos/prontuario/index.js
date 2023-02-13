const express = require("express");
const cors = require("cors");
const db = require("./database");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors());
app.get("/prontuario", (req, res) => res.send("Hello Users API"));
app.post("/prontuario", async (req, res) => {
  console.log(req.body);
  const { name, age, situation } = req.body;
  const { rows } = await db.query(
    "UPDATE prontuario SET (nome, idade,situacao) = ($1, $2,$3) WHERE id = 1",
    [name, age, situation]
  );

  res.status(201).send({
    message: "Product adWded successfully!",
    body: {
      product: { name, age, situation },
    },
  });
});

app.listen(3001, () => console.log(`Users API listening on port 3001!`));
