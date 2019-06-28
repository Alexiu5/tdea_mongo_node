const cursos = require('express').Router()
const CursosController = require('../controllers/cursos.controller')

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
            resp.status(200).send(data)
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
            resp.status(200).send(data)
        })
        .catch(err => resp.status(404).send(err).end())
        
})


module.exports = cursos