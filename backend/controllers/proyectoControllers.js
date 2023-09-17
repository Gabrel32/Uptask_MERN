import Proyecto from "../model/Proyecto.js"
import Tarea from "../model/Tareas.js"
import mongoose from "mongoose"
const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find().where("creador").equals(req.usuario)
    
    res.json(proyectos)
}

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id

    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error);
    }
}

const obtenerProyecto = async (req, res) => {
    const {id} = req.params

    const valido = mongoose.Types.ObjectId.isValid(id)
    
    if (!valido) {
        const error = new Error("El Proyecto no existe")
        return res.status(404).json({msg:error.message})
    }
    
    const proyecto = await Proyecto.findById(id)

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No tienes los permisos necesarios")
        return res.status(401).json({msg:error.message})
    }

    // obtener Tareas del proyecto

    const tareas = await Tarea.find().where("proyecto").equals(proyecto._id)

    res.json({proyecto,tareas})
}

const editarProyectos = async (req, res) => {
    const {id} = req.params
    const {nombre, cliente, descripcion, fechaEntrega} = req.body

    const valido = mongoose.Types.ObjectId.isValid(id)
    
    if (!valido) {
        const error = new Error("El Proyecto no existe")
        return res.status(404).json({msg:error.message})
    }
    
    const proyecto = await Proyecto.findById(id)

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No tienes los permisos necesarios")
        return res.status(401).json({msg:error.message})
    }

    proyecto.nombre = nombre || proyecto.nombre
    proyecto.descripcion = descripcion || proyecto.descripcion
    proyecto.cliente = cliente || proyecto.cliente
    proyecto.fechaEntrega || fechaEntrega || proyecto.fechaEntrega

    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error);
    }



}

const eliminarProyecto = async (req, res) => {
    const {id} = req.params

    const valido = mongoose.Types.ObjectId.isValid(id)
    
    if (!valido) {
        const error = new Error("El Proyecto no existe")
        return res.status(404).json({msg:error.message})
    }
    
    const proyecto = await Proyecto.findById(id)

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No tienes los permisos necesarios")
        return res.status(401).json({msg:error.message})
    }

    try {
        await proyecto.deleteOne()
        res.json({msg:"el proyecto se a eliminado correctamente"})
    } catch (error) {
        console.log(error);
    }

}

const agregarColaborador = async (req, res) => {}

const eliminarColaborador = async (req, res) => {}

const obtenerTareas = async (req, res) => {
    const {id} = req.params

    const valido = mongoose.Types.ObjectId.isValid(id)
    
    if (!valido) {
        const error = new Error("No Encontrado")
        return res.status(404).json({msg:error.message})
    }

    

    res.json(tareas)
}

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyectos,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador
}