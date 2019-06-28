const Cursos = require('../models/cursos.model')
const config = require('../config')

const searchAllCursos = () =>{
    return new Promise((resolve, reject)=>{
        Cursos.find({}, (err, response)=>{
            if(err) reject(err)
            resolve(response)
        })
    })
}


const searchCursosById = id =>{
    return new Promise((resolve, reject)=>{
        Cursos.findOne({idCurso: id}, (err, response)=>{
            if(err) reject(err)
            resolve(response)
        })
    })
}

const createCurso = curso =>{
    return new Promise((resolve, reject)=>{
        const cursoToCreate = new Cursos(curso)
        cursoToCreate.save(curso, (err, response)=>{
            if(err) reject(err)
            resolve(response)
        })
    })
}

const updateCurso = (id, curso) =>{
    return new Promise((resolve, reject) => {
        Cursos.findOneAndUpdate({idCurso: id}, curso, (err, resp)=>{
            if(err) reject(err)
            resolve(resp)
        })
    })
}

const deleteCurso = (idCurso)=>{
    return new Promise((resolve, reject)=>{
        Cursos.findOneAndRemove({idCurso}, (err, resp)=>{
            if(err) reject(err)
            resolve(resp)
        })
    })
}


module.exports = {
    searchAllCursos,
    searchCursosById,
    createCurso,
    updateCurso,
    deleteCurso
}