import Usuario from "../model/Usuarios.js";
import { generarId } from "../helpers/index.js";
import generarJWT from "../helpers/generarJWT.js";


const registrar = async (req,res)=>{
    // evitar registros duplicados 
 
    const {email} = req.body
    const existeUsuario = await Usuario.findOne({email})


    if (existeUsuario) {
        const error = new Error("usuario ya registrado")
        return res.status(400).json({msg:error.message})
    }


    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId()
        const usuarioAlmacenado = await usuario.save() 
        res.json(usuarioAlmacenado)
    } catch (error) {
        console.log(error);
    }

}

const autenticar = async (req, res) => {

    const {email,password} = req.body
    
    // comprobar si el usuario existe
    const usuario = await Usuario.findOne({email})
    if(!usuario){
        const error = new Error("el usuario no esta registrado")
        return res.status(404).json({msg:error.message})
    }

    // comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error("tu cuenta no ha sido confirmada")
        return res.status(404).json({msg:error.message})
    }
    // comprobar su password
    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id:usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        })
    }else{
        const error = new Error("la contraseña es incorrecta")
        return res.status(404).json({msg:error.message})
    }
}

const confirmar = async (req, res) => {
    const {token} = req.params

    c
}


export {
    registrar,
    autenticar,
    confirmar
}