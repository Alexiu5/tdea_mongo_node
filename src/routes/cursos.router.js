const cursos = require('express').Router()
const CursosController = require('../controllers/cursos.controller')

cursos.get('/register', (req, res)=>{
    const {usuario} = req.session
    if(usuario){
        res.render('registrar-curso', {
            usuario
        })
    }else{
        res.redirect('/')
    }
})

cursos.get('/editar/:idCurso', (req, res)=>{
    const {usuario} = req.session
    const {idCurso} = req.params

    if(usuario){
        CursosController.findCourseById(idCurso)
            .then(curso => {
                res.render('editar-curso',{
                    usuario,
                    curso
                })
            })
            .catch(err => {
                console.log(err)
                res.status(404).send(err).end()
            })
    }else{
        res.redirect('/')
    }
})

cursos.get('/', (req, resp)=>{
 CursosController.searchAllCursos()
    .then(data =>{
        resp.status(200).send(data)
    })
    .catch(err => resp.status(404).send(err).end())
})



cursos.post('/', (req, resp)=>{
    const {nombre, idCurso, descripcion, valor, estado, modalidad, intensidadHoraria, cantCupos } = req.body

    let newCurso = {
        nombre,
        idCurso,
        descripcion,
        valor,
        estado,
        modalidad,
        intensidadHoraria,
        cantCupos
    }

    CursosController.createCurso(newCurso)
        .then(data => {
            resp.status(200).send(data)
        })
        .catch(err =>{
             resp.status(404).send(err).end()
        })
})

cursos.put('/', (req, resp)=>{
    const {nombre, idCurso, descripcion, valor, estado, modalidad, intensidadHoraria, cantCupos } = req.body

    let newCurso = {
        nombre,
        idCurso,
        descripcion,
        valor,
        estado,
        modalidad,
        intensidadHoraria,
        cantCupos
    }

    CursosController.updateCurso(newCurso)
        .then(data => {
           resp.redirect('/home')
        })
        .catch(err => resp.status(404).send(err).end())
})

cursos.delete('/:id', (req, resp)=>{
    const {idCurso} = req.params
    CursosController.deleteCurso(idCurso)
        .then( data => {
            resp.status(200).send(data)
        })
        .catch(err => resp.status(404).send(err).end())
})

cursos.get('/:idCurso', (req, response)=>{
    const {idCurso} = req.params

    CursosController.searchCursosById(idCurso)
        .then( data => {
            response.status(200).send(data)
        })
        .catch(err => response.status(404).send(err).end())
        
})


cursos.get('/registrar/:id', (req, response)=>{
    const {idCurso} = req.params
    const {usuario}  = req.session

    if(usuario){
        CursosController.searchCursosById(idCurso)
            .then(curso => {
                if(curso){
                    console.log(curso)
                    response.render('registrarseEnCurso',{
                        curso,
                        usuario
                    })
                }else{
                   response.redirect('/home')
                }
            })
            .catch(err => console.log(err))
    }
}) 


module.exports = cursos