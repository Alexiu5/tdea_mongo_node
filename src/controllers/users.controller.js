const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config')

const searchUser = async ()=>{
    return new Promise((reject, resolve)=>{
        Usuario.find({}, (err, res)=>{
            if(err) {
                reject(err)
            }else{
                console.log('error searching users')
                resolve(res)
            }
        })
    })
}

const createUser = (usuario)=>{
    return new Promise((reject, resolve)=>{
        const user = new Usuario(usuario)
        user.save((err, result)=>{
            if(err) reject(err)
            resolve(result)
        })
    })
}

const findUsuarioById = (idUsuario) => {
    return new Promise((reject, resolve)=> {
        Usuario.findOne({nroDocumento: idUsuario}, (err, usuario)=>{
            if(err) reject(err)
            resolve(usuario)
        })
    })
}

const actualizar = (id, usuario)=>{
    return new Promise((reject, resolve)=>{
        Usuario.findOneAndUpdate({nroDocumento:id}, usuario, {new:true, runValidators:true, context:'query'},(err, result)=>{
            if(err) reject(err)

            resolve(result)
        })
    })
}

const deleteUsuario = id =>{
    return new Promise((reject, resolve) => {
        Usuario.findOneAndRemove({nroDocumento:id}, (err, result)=>{
            if (err) reject(err)
            resolve(result)
        })
    })
}

const logIn = (mail, password)=>{
    return new Promise((reject, resolve)=>{
        Usuario.findOne({email: mail}, (err, response)=>{
            if(err) reject(err)
            
            const comparePassword = bcrypt.compareSync(password, response.password)

            if(!comparePassword){
                reject({error: 'Contraseña no coinciden', status:404})
            }

            let token = jwt.sign({
            	usuario: [response.email, response.nroDocumento]
        	}, config.SECRET_KEY, { expiresIn: '1h' })

            if(typeof localStorage === 'undefined' || localStorage === null){
                var LocalStorage = require('node-localstorage').LocalStorage;
                localStorage = new LocalStorage('./scratch');
            }

            localStorage.setItem(config.SESSION_KEY_STORAGE, token)
            console.log(localStorage.getItem('tokenjwt'))

            resolve(response)
        })
    })
}

const logOut = ()=>{
    localStorage.setItem(config.SESSION_KEY_STORAGE,'')
}

module.exports = {
    searchUser,
    createUser,
    findUsuarioById,
    actualizar,
    deleteUsuario,
    logIn,
    logOut
}
