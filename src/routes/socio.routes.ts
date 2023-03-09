//Rutas de Socios
import { Router } from "express"; //Traigo solo la funcion Router
const router = Router();
import SocioModel from "../models/Socio";
import SocioController from "../controllers/SocioController";

// Listar socios
router.get("/", SocioController.findAllSocios);

// Listar socios query params (TipoDoc)
router.get("/params", SocioController.findSocios);

// Agregar socio
router.post("/", SocioController.addSocio);

// Filtrar socio por ID
router.get("/:id", SocioController.findSocioByID);

// Eliminar socio
router.delete("/:id", SocioController.deleteSocio);

// Actualizar socio por ID
router.put("/:id", SocioController.updateSocio);

export default router;
