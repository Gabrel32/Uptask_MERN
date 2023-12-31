import express from "express"
import dotenv from "dotenv"
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js"
import proyectosRoutes from "./routes/proyectosRoutes.js"
import tareaRoutes from "./routes/tareaRoutes.js"


const app = express()
app.use(express.json())

dotenv.config()

conectarDB()

// Routing
app.use("/api/usuarios",usuarioRoutes)
app.use("/api/proyectos",proyectosRoutes)
app.use("/api/tareas",tareaRoutes)



const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`servidor corriendo en el puerto ${PORT}`);
})