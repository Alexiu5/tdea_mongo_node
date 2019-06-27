const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const Estudiante = require('../models/estudiantes')
const dirViews = path.join(__dirname + '../../../template/views')
const dirPartials = path.join(__dirname+'../../../template/partials')
const usuarioRouter = require('./usuarios.routes')
// const bcrypt = require('bcrypt')
//helpers?

require('../helpers/')

//hbs
app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(dirPartials)

app.use('/usuario', usuarioRouter)

app.get('/', (req, res)=>{
    res.render('index', {
        name: 'Alex',
        profession: 'Web Developer',
        since_date: '2017',
    })
})

app.post('/', (req, res)=>{
    const {nombre, matematicas, ingles, programacion} = req.body
    let estudiante = new Estudiante({
        nombre,
        matematicas, 
        ingles, 
        programacion
    })
    estudiante.save((err, res)=>{
        if(err){
            res.render('indexpost', {
                mostrar: err
            })
        }
        res.render('indexpost', {
            mostrar: res
        })

    })
})

app.get('/vernotas', (req, res)=>{
    Estudiante.find({}).exec((err, response)=>{
            if(err){
                res.render('error',{
                    title: res.status
                })
            }
            res.render('vernotas',{
                listado: response
            })
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        title: 404
    })
})


module.exports =  app;

