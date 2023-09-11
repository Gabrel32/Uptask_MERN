import express from "express"
import {
    autenticar,
    confirmar,
    registrar
} from "../controllers/usuarioControllers.js"

// Autenicacion, registro y confirrmacion de usuarios

const router = express.Router()

router.post("/",registrar)
router.post("/login",autenticar)
router.get("/confirmar/:token",confirmar)


export default router