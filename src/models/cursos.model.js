const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')


const cursosSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    idCurso:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    descripcion: {
        type: String,
        trim: true,
        required: true
    },
    valor: {
        type: Number,
        min: 0,
        required: true
    },
    estado: {
        type: String,
        trim: true,
        required: true,
        enum: ['disponible', 'no disponible'],
        default: 'disponible'
    },
    modalidad: {
        type: String,
        enum: ['virtual', 'presencial'],
        default: 'presencial'
    }, 
    intensidadHoraria: {
        type: Number,
        min: 0
    },
    cantCupos:{
        type: Number,
        min: 0
    }
})

cursosSchema.plugin(uniqueValidator)
const cursosModel = mongoose.model('cursos', cursosSchema)
module.exports = cursosModel