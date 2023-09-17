import { Link } from "react-router-dom"

function Login() {
  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>inicia sesion y administra tus <span className=' text-gray-800'>proyectos</span></h1>
    <form action="" className='my-10 bg-white shadow rounded-lg p-10'>
        <div>
            <label htmlFor="email" className=' uppercase text-gray-700 block text-xl font-bold'>correo</label>
            <input id='email' type="text" placeholder='Email de Registro' className='w-full mt-3 p-3 border outline-none rounded-xl bg-gray-50'/>
        </div>
        <div className=' my-5'>
            <label htmlFor="contraseña" className=' uppercase text-gray-700 block text-xl font-bold'>contraseña</label>
            <input id='contraseña' type="password" placeholder='contraseña de Registro' className='w-full mt-3 p-3 border outline-none rounded-xl bg-gray-50'/>
        </div>

        <input type="submit" value="Ingresar" className={"bg-sky-700 w-full py-3 font-bold uppercase text-white rounded hover:cursor-pointer hover:bg-sky-900 transition-colors"}  />
    </form>

    <nav className='lg:flex lg:justify-between'>
        <Link
        className="block text-center my-5 text-slate-500 capitalize text-sm"
        to={"registrar"}
        >no tienes una cuenta? registrate</Link>
        <Link
        className="block text-center my-5 text-slate-500 capitalize text-sm"
        to={"olvide-password"}
        >Olvide mi contraseña</Link>
    </nav>
    </>
  )
}

export default Login