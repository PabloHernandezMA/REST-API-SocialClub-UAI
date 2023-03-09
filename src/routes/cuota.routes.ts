//Rutas de Cuotas
import { Router } from "express"; //Traigo solo la funcion Router
const router = Router();
import CuotaModel from "../models/Cuota";
import TaskController from "../controllers/CuotaController";




// Listar cuotas
router.get("/", TaskController.findAllCuotas);

// Listar cuotas query params
//router.get("/params", TaskController.findCuotaQuery);

// Agregar cuota
router.post("/", TaskController.addCuota);

// Filtrar cuotas pagas
router.get("/pagas", TaskController.findAllCuotasPagas);

// Filtrar cuota por ID
router.get("/:id", TaskController.findCuotaByID);

// Eliminar cuota
router.delete("/:id", TaskController.deleteCuota);

// Actualizar cuota por ID
router.put("/:id", TaskController.updateCuota);

export default router;