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
         const {usuario} = req.session
         if(usuario){
            res.redirect('/usario/usuarios')
         }{
             res.redirect('/')
         }
     })
     .catch(err =>{
        res.redirect('/404')
     })

})

users.get('/delete/:id', (req, res)=>{
    const {id} = req.params
    controller.deleteUsuario(id)
        .then(response => {
            res.redirect('/home')
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

users.get('/usuarios', (req, res)=>{
    const {usuario} = req.session
    if(usuario){
        controller.searchUsers()
            .then(usuarios => {
                res.render('listar-usuario', {
                    usuario,
                    usuarios
                })
            })
            .catch(err => {
                console.error(err)
                res.status(404).send(err).end()
            })
    }else{
        res.redirect('/')
    }
})

users.get('/register', (req, res)=>{
    const {usuario} = req.session
    if(usuario){
        res.render('register-usuario', {
            usuario
        })
    }else{
        res.redirect('/')
    }

})

users.put('/', (req, res) => {
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

    controller.actualizar(user)
     .then((result)=> {
         const {usuario} = req.session
         if(usuario){
            res.redirect('/usario/usuarios')
         }{
             res.redirect('/')
         }
     })
     .catch(err =>{
        res.redirect('/404')
     })
})

users.get('/edit/:id', (req,res)=>{
    const {usuario} = req.session
    const {id} = req.params
    
    if(usuario){
        controller.findUsuarioById(id)
            .catch(response => {
                console.log(response)
                res.render('edit-usuario', {
                    responseUsuario: response,
                    usuario
                })
            })
            .catch(err => {
                res.redirect('usuario/usuarios')
            })
    }else{
        res.redirect('/')
    }
})



module.exports = users