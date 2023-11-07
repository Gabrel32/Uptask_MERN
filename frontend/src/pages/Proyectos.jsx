import useAuth from "../hooks/useAuth"
import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto";

function Proyectos() {

    const {proyectos} = useProyectos()

  return (
    <>
        <h1 className='text-4xl font-black'>Proyectos</h1>
        <div className=" bg-white shadow mt-10 rounded-lg ">
            {proyectos.length ?(
              proyectos.map(e=>(<PreviewProyecto key={e._id} proyecto={e}/>))
            ) : <p className=" p-5 text-center text-gray-600 uppercase"></p>}
        </div>
    </>
  )
}

export default Proyectos