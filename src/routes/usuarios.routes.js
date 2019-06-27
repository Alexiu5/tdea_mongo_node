const users = require('express').Router()
const controller = require('../controllers/users.controller')

users.get('/', (req, res)=>{
    controller.searchUser()
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            console.error(err)
            res.status(404).end()
        })
})

users.post('/', (req, res)=>{
    console.log(req.body)

    const {nombre, tipoDocumento, nroDocumento, email, telefono, rol} = req.body
    let user = {
        nombre, 
        tipoDocumento,
        nroDocumento,
        email, 
        telefono, 
        rol
    }
    controller.createUser(user)
     .then((result)=> {
         console.log(result)
         res.status(404).end()
     })
     .catch(err =>{
         console.error(err)
         res.status(404).end()
     })

})



module.exports = users