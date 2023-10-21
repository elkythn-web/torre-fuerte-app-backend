import express from "express";
import {
    ObtenerDonadores,
    CrearDonador,
    ObtenerDonador,
    ActualizarDonador,
    EliminarDonador,
    ObtenerUltimosTresDonadores
} from "../controllers/donadoresController.js";

const router = express.Router();

router.route('/')
    .get(ObtenerDonadores)
    .post(CrearDonador);

router.route('/ultimos')
    .get(ObtenerUltimosTresDonadores);

router.route('/:id')
    .get(ObtenerDonador)
    .put(ActualizarDonador)
    .delete(EliminarDonador);


export default router;