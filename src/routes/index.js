const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const dirViews = path.join(__dirname + '../../../template/views')
const dirPartials = path.join(__dirname+'../../../template/partials')
const usuarioRouter = require('./usuarios.routes')
const cursosRouter = require('./cursos.router')
const cursoCtrl = require('../controllers/cursos.controller')
//helpers?
require('../helpers/')

//hbs
app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(dirPartials)

app.use('/usuario', usuarioRouter)
app.use('/curso', cursosRouter)

app.get('/', (req, res)=>{
    const {usuario} = req.session
    if(usuario) req.session.usuario = {}

    res.render('index', {
    })
})

app.get('/registro', (req, res)=>{
    res.render('register', {})
})

app.get('/home', (req, response)=>{
    const {usuario} = req.session
    if(usuario) {
        cursoCtrl.searchCourses(usuario.rol)
            .then(cursos => {
                response.render('home',{
                    usuario,
                    cursos
                })
            })
    }else{
        response.redirect('/')
    }
})

app.get('*', (req, res)=>{
    res.render('error', {
        title: 404
    })
})

module.exports =  app;

