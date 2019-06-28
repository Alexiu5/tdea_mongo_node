const users = require('express').Router()
const controller = require('../controllers/users.controller')
const bcrypt = require('bcrypt')

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

    const {nombre, tipoDocumento, nroDocumento, email, telefono, rol, password} = req.body
    let user = {
        nombre, 
        tipoDocumento,
        nroDocumento,
        email, 
        telefono, 
        rol,
        password: bcrypt.hashSync(password, 10) 
    }
    controller.createUser(user)
     .then((result)=> {
         console.log(result)
         res.send(user).status(200)
         
     })
     .catch(err =>{
         console.error(err)
         res.status(404).end()
     })

})

users.get('/login', (req, res) =>{
    const {email, password} = req.body
    controller.logIn(email, password)
        .then( response =>{
            console.log(response)
            res.send(response)
        })
        .catch(err =>{
            console.log(err)
            res.send(err)
            res.status(404).end()
        })

})



module.exports = users