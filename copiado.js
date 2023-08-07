const express = require("express");
const app = express();
app.use(express.json());
const { object, string, number } = require("yup");

let schema = object({
  password: string()
    .typeError("password debe ser un string")
    .required("password es requerido"),
  cantidad: number()
    .required()
    .positive("cantidad debe ser positivo")
    .integer("debe ser entero")
    .typeError("debe ser un número"),
});

const validacion = async (req, resp, next, schema) => {
  try {
    await schema.validate(req.body, { strict: true });
    next();
  } catch (error) {
    resp.json({ error: error.errors });
  }
};

app.post("/user", validacion(schema), async (req, res) => {
  try {
    res.json({ mensaje: "todo ok" });
  } catch (error) {
    res.json({ error: error.errors });
  }
});

app.get("/", (req, resp) => resp.send("ok "));

app.listen(3000, () => {
  console.log("escuchando puerto 3000");
});

/* exports.agregarTarea = async (req, res) => {
  const nuevaTarea = req.body;
  await knex("tarea").insert(nuevaTarea);
  res.status(201).json({ Mensaje: "Tarea agregada correctamente" });
};
exports.modificarTarea = async (req, res) => {
  const tareaID = Number(req.params.id);
  const nuevaTarea = req.body;

  const tareaExistente = await knex("tarea").where("id", tareaID).first();

  if (!tareaExistente) {
    return res.status(404).json({ error: "La tarea no existe" });
  }
  const tareaActualizada = await knex("tarea")
    .where("id", tareaID)
    .update(nuevaTarea);

  if (tareaActualizada > 0) {
    res.status(200).json({ mensaje: "Tarea modificada correctamente" });
  } else {
    res.status(500).json({ error: "Error al modificar la tarea" });
  }
};*/