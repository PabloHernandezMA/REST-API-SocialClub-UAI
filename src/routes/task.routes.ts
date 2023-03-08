//Rutas de Tasks
import { Router } from "express"; //Traigo solo la funcion Router
const router = Router();
import TaskModel from "../models/Task";
import TaskController from "../controllers/taskController";

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
