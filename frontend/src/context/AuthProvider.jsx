import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})

    useEffect(()=>{
       const autenticarUsuarios = async ()=>{
        const token = localStorage.getItem("token")
        if (!token) {
            return
        }

        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
        
        try {
            const {data} = await clienteAxios(`/usuarios/perfil`,config)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
       }
       autenticarUsuarios()
    },[])
    

    return (
        <AuthContext.Provider
            value={{
                setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider}

export default AuthContext