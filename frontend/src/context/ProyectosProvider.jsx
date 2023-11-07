import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate, } from "react-router-dom";

const ProyectosContext = createContext()

const ProyectosProvider = ({children}) =>{

    const navigate = useNavigate()

    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando]= useState(false)
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
    const [tarea, setTarea] = useState({})
    const [modalEliminarTarea , setModalEliminarTarea] = useState(false)
    const [colaborador, setColaborador] = useState({})
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)

    useEffect(()=>{
        const obtenerProyectos = async ()=>{
            try {
                const token = localStorage.getItem("token")
                if(!token) return
    
                const config = {
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${token}`
                    }
                }
                
    
                const {data} = await clienteAxios("/proyectos",config)
                setProyectos(data)
            } catch (error) {
                console.log(error);
            }
        }
        obtenerProyectos() 
    },[])

    
    const mostrarAlerta = alerta =>{
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitProyecto = async proyecto =>{
        if (proyecto.id) {
            await editarProyecto(proyecto)
        }else{
            await nuevoProyecto(proyecto)
        }
        return
       
    }
    const editarProyecto = async proyecto =>{
        try {
            const token = localStorage.getItem("token")
            if(!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }

            // sincronizar proyectos
            const {data} = await clienteAxios.put(`/proyectos/${proyecto.id}`,proyecto,config)

            const proyetosActualizados = proyectos.map(e=>e._id === data._id ? data :e)

            setProyectos(proyetosActualizados)

            
            setAlerta({
                msg:"proyecto actualizado correctamente",
                error:false
            })

            setTimeout(() => {
                setAlerta({})
                navigate("/proyectos")
            }, 3000);
            

            
        } catch (error) {
            console.log(error);
        }
    }

    const nuevoProyecto = async proyecto =>{
        try {
            const token = localStorage.getItem("token")
            if(!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            

            const {data} = await clienteAxios.post("/proyectos",proyecto,config)

            setProyectos([...proyectos,data])
            
            setAlerta({
                msg:"proyecto creado correctamente",
                error:false
            })
            
            setTimeout(() => {
                setAlerta({})
                navigate("/proyectos")
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarProyecto = async id =>{
        try {
            const token = localStorage.getItem("token")
            if(!token) return
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.delete(`/Proyectos/${id}`,config)

            // sincroniar el stade
            const proyectosActualizados = proyectos.filter(e=>e._id !== id)

            setProyectos(proyectosActualizados)
            setAlerta({
                msg:data.msg,
                error:false
            })
            
            setTimeout(() => {
                setAlerta({})
                navigate("/proyectos")
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }
    
    const obtenerProyecto = async id =>{
        setCargando(true)
        try {
            const token = localStorage.getItem("token")
            if(!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await clienteAxios(`/proyectos/${id}`,config)
            setProyecto(data)
        } catch (error) {
            mostrarAlerta({
                msg:error.response.data.msg,
                error:true
            })   
        }finally{
            setCargando(false)

        }
    }

    const handleModalTarea = ()=>{
        setModalFormularioTarea(!modalFormularioTarea)
        setTarea({})
    }

    const submitTarea = async (tarea)=>{
        if (tarea?.id) {
           await editarTarea(tarea)
        }else{
           await crearTarea(tarea)
        }

        return
    }

    const crearTarea = async tarea =>{
        try {
            const token = localStorage.getItem("token")
            if(!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post("/tareas",tarea,config)
            const proyectoActualizado = { ...proyecto}
            proyectoActualizado.tareas = [...proyecto.tareas, data]

            setProyecto(proyectoActualizado)
        } catch (error) {
            console.log(error);
        }
    }
    const editarTarea = async tarea =>{
        try {
            const token = localStorage.getItem("token")
            if(!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }

            const {id} = tarea
            const {data} = await clienteAxios.put(`/tareas/${id}`,tarea,config)
            
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.map(e=>e._id === data._id ? data : e)
            setProyecto(proyectoActualizado)
            setAlerta({})
            handleModalTarea(false)
        } catch (error) {
            console.log(error);
        }
    }

    const handleModalEditarTarea = tarea =>{
        setTarea(tarea)
        setModalFormularioTarea(true)
    }
    const handleModalEliminarTarea = tarea =>{
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }

    const eliminarTarea = async () =>{
        try {
            const token = localStorage.getItem("token")
            if(!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.delete(`/tareas/${tarea._id}`,config)
            mostrarAlerta({
                msg:data.msg,
                error:false
            })
            
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter(e=> e._id !== tarea._id)
            
            console.log(data);
            handleModalEliminarTarea(false)
            setTarea({})
        } catch (error) {
            console.log(error);
        }
    }

    const submitColaborador = async email =>{
        setCargando(true)
        try {

            const token = localStorage.getItem("token")
            if(!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post("/proyectos/colaboradores",{email},config)
            setColaborador(data)
            mostrarAlerta({})
        } catch (error) {
            console.log(error);
            mostrarAlerta({msg:error.response.data.msg,error:true});
        }finally{
            setCargando(false)
        }
    }

    const agregarColaboradores = async email =>{
        try {
            const token = localStorage.getItem("token")
            if(!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`,{email},config)
            mostrarAlerta({
                msg:data.msg,
                error:false
            });
        } catch (error) {
            mostrarAlerta({
                msg:error.response.data.msg,
                error:true
            })
        }
    }
    const handelEliminarColaborador = (colaborador) => {
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador);
    }

    const eliminarColaborador = async () =>{
        try {
            const token = localStorage.getItem("token")
            if(!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`,{_id:colaborador._id},config)
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(e=>e._id !== colaborador._id)
            setProyecto(proyectoActualizado)
            mostrarAlerta({
                msg:data.msg,
                error:false
            })

            setColaborador({})

        } catch (error) {
            console.log(error);
        }finally{
            setModalEliminarColaborador(false)
        }
    }
    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                alerta,
                mostrarAlerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                eliminarProyecto,
                handleModalTarea,
                modalFormularioTarea,
                handleModalTarea,
                submitTarea,
                tarea,
                handleModalEditarTarea,
                modalEliminarTarea,
                handleModalEliminarTarea,
                eliminarTarea,
                submitColaborador,
                colaborador,
                agregarColaboradores,
                handelEliminarColaborador,
                modalEliminarColaborador,
                eliminarColaborador
            }}
        >{children}
        </ProyectosContext.Provider>
    )
}

export {ProyectosProvider}

export default ProyectosContext