const users = require('express').Router()
const controller = require('../controllers/users.controller')

users.get('/', (req, res)=>{
    res.send(controller.searchUser())
    res.status(200).end()
})



module.exports = users