const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')


const estudianteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    matematicas: {
        type: Number,
    },
    ingles:{
        type: Number
    },
    programacion:{
        type: Number
    }
})

estudianteSchema.plugin(uniqueValidator)

const Estudiante = mongoose.model('Estudiante', estudianteSchema)

module.exports = Estudiante