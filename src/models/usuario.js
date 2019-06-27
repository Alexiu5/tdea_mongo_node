const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const usuarioSchema = new Schema({
    nombre:{
        type: String,
        trim: true,
        required: true
    },
    tipoDocumento: {
        type: String,
        enum: ['CC', 'TI', 'Pasaporte'],
        required: true
    },
    nroDocumento:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique:true
    },
    telefono:{
        type: String,
        trim: true
    },
    rol:{
        type: String,
        required: true,
        enum : ['coordinador', 'aspirante', 'interesado'],
        default: 'aspirante'
    }
})

usuarioSchema.plugin(uniqueValidator)
const usuarioModel = mongoose.model('Usuario', usuarioSchema)
module.exports = usuarioModel