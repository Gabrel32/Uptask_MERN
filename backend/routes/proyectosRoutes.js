import express from "express"
import checkAuth from "../middleware/checkAuth.js"
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyectos,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador
} from "../controllers/proyectoControllers.js"

const router = express.Router()

router.route("/")
    .get(checkAuth,obtenerProyectos)
    .post(checkAuth,nuevoProyecto)

router.route("/:id")
    .get(checkAuth, obtenerProyecto)
    .put(checkAuth,editarProyectos)
    .delete(checkAuth,eliminarProyecto)

router.post("/agreagar-colaborador/:id",checkAuth, agregarColaborador)
router.post("/eliminar-colaborador/:id",checkAuth,eliminarColaborador)


export default router