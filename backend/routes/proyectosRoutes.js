import express from "express"
import checkAuth from "../middleware/checkAuth.js"
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyectos,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas
} from "../controllers/proyectoControllers.js"

const router = express.Router()

router.route("/")
    .get(checkAuth,obtenerProyectos)
    .post(checkAuth,nuevoProyecto)

router.route("/:id")
    .get(checkAuth, obtenerProyecto)
    .put(checkAuth,editarProyectos)
    .delete(checkAuth,eliminarProyecto)

router.get("/tareas/:id",checkAuth,obtenerTareas)
router.post("/agreagar-colaborador/:id",checkAuth, agregarColaborador)
router.post("/eliminar-colaborador/:id",checkAuth,eliminarColaborador)


export default router