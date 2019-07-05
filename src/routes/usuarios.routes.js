const users = require('express').Router()
const controller = require('../controllers/users.controller')
const bcrypt = require('bcrypt')

users.get('/', (req, res)=>{
    controller.searchUser()
        .then(response => {
            res.status(200).send({'response':'mensaje de error'})
        })
        .catch(err => {
            console.error(err)
            res.status(404).end()
        })
})

users.post('/', (req, res)=>{
    console.log(req.body)
    const saltRounds = 10
    const {nombre, tipoDocumento, nroDocumento, email, telefono, rol, password} = req.body
    let user = {
        nombre, 
        tipoDocumento,
        nroDocumento,
        email, 
        telefono, 
        rol,
        password: bcrypt.hashSync(password, saltRounds) 
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

users.delete('/:id', (req, res)=>{
    const {id} = req.params
    controller.deleteUsuario(id)
        .then(response => {
            res.send(response)
        })
        .catch(err =>{
            res.status(404).end()
        })
})

users.post('/login', (req, res) =>{
    const {email, password} = req.body

    controller.logIn(email, password)
        .then( response =>{
            const {id, nroDocumento, nombre	, rol} = response
            req.session.usuario = {
                id,
                nroDocumento,
                nombre,
                rol
            }
            res.redirect('/home')
        })
        .catch(err =>{
            console.log(err)
            res.redirect('/')
        })

})



module.exports = users