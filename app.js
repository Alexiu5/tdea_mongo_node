const config = require('./src/config')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//Path
const dirPublic = path.join(__dirname,'./public')
const dirNode_modules = path.join(__dirname, './node_modules')

//static
app.use(express.static(dirPublic))
app.use('/js', express.static(dirNode_modules + '/jquery'))
app.use('/js', express.static(dirNode_modules + '/popper.js'))


//body parser
app.use(bodyParser.urlencoded({ 
    extended: true 
}));

//Routes
app.use(require('./src/routes/index'))

let connectionString;
if(config.ENVIROMENT === 'local'){
   connectionString = `${config.DATABASEURL}/${config.DB_NAME}`
}else{
   connectionString = `${config.ONLINEDBCONNECT}`
}

mongoose.connect(connectionString,{useNewUrlParser: true}, (err, res)=>{
    if(err) return console.log('something went wrong in mongoose database connection', err)
    console.log('connected')
}) 


app.listen(config.PORT, ()=>{
    console.log(`server running at ${config.ENVIROMENT}`)
})



