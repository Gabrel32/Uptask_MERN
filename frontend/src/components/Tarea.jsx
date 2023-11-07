import React from 'react'
import { formatearFecha } from '../helpers'
import useProyectos from '../hooks/useProyectos'

function Tarea({tarea}) {
    const { handleModalEditarTarea,handleModalEliminarTarea}= useProyectos()

  return (
    <div className=' border-b p-5 flex justify-between items-center flex-col md:flex-row'>
        <div className=' flex flex-col gap-1 text-left w-2/3 capitalize' >
            <p className='text-xl'>{tarea.nombre}</p>
            <p className='text-sm text-gray-500 uppercase'>{tarea.descripcion}</p>
            <p className=' text-sml'>{formatearFecha(tarea.fechaEntrega)}</p>
            <p className=' text-gray-600'>Prioridad: {tarea.prioridad}</p>
        </div>
        <div className='mt-10 flex gap-4'>
            <button onClick={()=>handleModalEditarTarea(tarea)} className='bg-indigo-600 px-2 py-3 text-white uppercase font-bold text-sm rounded-lg'>editar</button>
            {tarea.estado ?(
                <button className='bg-sky-600 px-2 py-3 text-white uppercase font-bold text-sm rounded-lg'>completa</button>
            ):(
                <button className='bg-gray-600 px-2 py-3 text-white uppercase font-bold text-sm rounded-lg'>incompleta</button>
            )}
            <button onClick={()=>handleModalEliminarTarea(tarea)} className='bg-red-600 px-2 py-3 text-white uppercase font-bold text-sm rounded-lg'>eliminar</button>

        </div>
    </div>
  )
}

export default Tarea