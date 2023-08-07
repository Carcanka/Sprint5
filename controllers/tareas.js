const listaDeTareas = require("./tareas");
const {knex} = require ("../db");
const { request } = require("..");

exports.tareas = async (req, res) => {
    const tareas = await knex.select("*").from("tarea")
    res.json(tareas);
    res.status(500);
  };

exports.nuevaTarea = async (req, res) => {
    listaDeTareas.push(req.body);
    res.json(listaDeTareas);
  };

exports.modificarTarea = async (req, res) => {
    const modificar = listaDeTareas.findIndex(
      (p) => p.titulo === String(req.params.titulo)
    );
    if (modificar === -1) {
      res.json({ respuesta: "titulo incorrecto"});
      res.status(404);
    } else res.status(200);
    listaDeTareas[modificar]=req.body
    res.json(listaDeTareas);
  };

  exports.obtenerTareasPorUsuario = async (req, res) => {
    const idUsuario = req.params.id 
    const tareas = await knex.select("*").from("tarea").where('usuario_id', idUsuario);
    res.json(tareas);
    res.status(200);
  };

  exports.agregarTarea = async (req, res) => {
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
  };

  exports.getByID = async (req, res) => {
    const tareas = await knex.select("*").from("tarea").where({id:req.params.id})
    res.json(tareas);
  };
