const Usuario = require('../models/usuario.model')
const bcrypt = require('bcrypt');
const config = require('../config')

const searchUsers = ()=>{
    return new Promise((resolve, reject)=>{
        Usuario.find({}, (err, res)=>{
            if(err) {
                reject(err)
            }
            resolve(res)
        })
    })
}

const createUser = (usuario)=>{
    return new Promise((resolve, reject)=>{
        const user = new Usuario(usuario)
        user.save((err, result)=>{
            if(err) reject(err)
            resolve(result)
        })
    })
}

const findUsuarioByNroDocumento = (idUsuario) => {
    return new Promise((resolve, reject)=> {
        Usuario.findOne({nroDocumento: idUsuario}, (err, usuario)=>{
            if(err) reject(err)
            resolve(usuario)
        })
    })
}

const findUsuarioById = id => {
    return new Promise((resolve, reject) => {
        Usuario.findById(id, (err, response)=>{
            if(err) reject(err)
            resolve(response)
        })
    })
}

const actualizar = (id, usuario)=>{
    return new Promise((resolve, reject)=>{
        Usuario.findOneAndUpdate({nroDocumento:id}, usuario, {new:true, runValidators:true, context:'query'},(err, result)=>{
            if(err) reject(err)

            resolve(result)
        })
    })
}

const deleteUsuario = id =>{
    return new Promise((resolve, reject) => {
        Usuario.findOneAndRemove({ _id:id }, (err, result)=>{
            if (err) reject(err)
            resolve(result)
        })
    })
}

const logIn = (mail, password)=>{
    return new Promise((resolve, reject)=>{
        Usuario.findOne({email: mail}, (err, response)=>{
            if(err) {
                reject(err)
                return;
            }

            if(response === null) {
                reject({error:'no such element'})
                return;
            }

            const comparePassword = bcrypt.compareSync(password, response.password)

            if(!comparePassword){
                reject({error: 'Contraseña no coinciden', status:404})
            }
            resolve(response)
        })
    })
}

const logOut = ()=>{
    localStorage.setItem(config.SESSION_KEY_STORAGE,'')
}

module.exports = {
    searchUsers,
    createUser,
    findUsuarioById,
    findUsuarioByNroDocumento,
    actualizar,
    deleteUsuario,
    logIn,
    logOut
}
