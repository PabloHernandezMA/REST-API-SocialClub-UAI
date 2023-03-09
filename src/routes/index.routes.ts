import { Router } from "express";
import socioRoutes from "./socio.routes";
import cuotaRoutes from "./cuota.routes";

const router = Router();

router.use("/socio", socioRoutes);
router.use("/cuota", cuotaRoutes);


export default router;
