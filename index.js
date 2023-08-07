const express = require("express");
const { getAllUser } = require("./controllers/usuarios");
const app = express();
app.use(express.json());
const port = 3000;
const tareasRouter = require ("./routes/tareas")
const { object, string, number } = require("yup");

app.get("/", (req, res) => {
  const usuarios = getAllUser();
  res.json(usuarios);
});

app.use("/api/tareas", tareasRouter)

/*app.post("/", (req, res) => {
  res.json({ respuesta: "Hola mundo" });
});*/

app.listen(port, () => {
  console.log(`${port}`);
});

module.exports = app