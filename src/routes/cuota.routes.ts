/*

//Rutas de Tasks
import { Router } from "express"; //Traigo solo la funcion Router
const router = Router();
import CuotaModel from "../models/Cuota";
import TaskController from "../controllers/SocioController";

// Listar tareas
router.get("/", TaskController.findAllTasks);

// Listar tareas query params
router.get("/params", TaskController.findTasks);

// Agregar tarea
router.post("/", TaskController.addTask);

// Filtrar tareas completadas
router.get("/done", TaskController.findAllDoneTasks);

// Filtrar tarea por ID
router.get("/:id", TaskController.findTask);

// Eliminar tarea
router.delete("/:id", TaskController.deleteTask);

// Actualizar tarea por ID
router.put("/:id", TaskController.updateTask);

export default router;

*/