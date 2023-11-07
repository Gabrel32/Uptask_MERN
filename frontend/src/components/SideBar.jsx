import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function SideBar() {
    const {auth} = useAuth()
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10 bg-gray-200">
        <p className="text-xl font-medium">Hola: {auth.nombre}</p>
        <Link to={"crear-proyecto"} className="  uppercase font-bold block mt-5 text-center bg-sky-600 w-full p-3 text-white rounded-lg ">
            nuevo proyecto
        </Link>
    </aside>
  )
}

export default SideBar