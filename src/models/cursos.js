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
        trim: true
    },
    valor: {
        type: Number,
        min: 0
    },
    estado: {
        type: String,
        trim: true,
        required: true
    },
    modalidad: {
        type: String,
        enum: ['disponible', 'no disponible'],
        default: 'disponible'
    }, 
    intensidadHoraria: {
        type: Number,
        min: 0
    }
})

cursosSchema.plugin(uniqueValidator)
const cursosModel = mongoose.model('Cursos', cursosSchema)
module.exports = cursosModel