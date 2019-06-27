const Usuario = require('../models/usuario')


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
       resolve(usuario)
    })
}


module.exports = {
    searchUser,
    createUser
}
