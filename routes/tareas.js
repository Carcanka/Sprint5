const express = require("express");
const routes = express.Router();

const { tareas, nuevaTarea, modificarTarea, obtenerTareasPorUsuario, agregarTarea, getByID } = require("../controllers/tareas");

routes.get("/", tareas);

routes.get("/:id", getByID);

// routes.post("/agregarTarea", nuevaTarea);

// routes.put("/modificarTarea/:titulo", modificarTarea);

routes.get("/obtenerTareasPorUsuario/:id", obtenerTareasPorUsuario);

routes.put("/modificarTarea/:id", modificarTarea);

routes.post("/agregarTarea", agregarTarea);

module.exports = routes;