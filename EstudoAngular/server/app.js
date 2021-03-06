const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const department_controller = require('./department_controller')
const product_controller = require('./product_controller')

const app = express()
app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(cors())
app.use(bodyparser.json())

//const url = "mongodb+srv://adminmongo:adminmongo@cluster0.emzni.azure.mongodb.net/namesdb?retryWrites=true&w=majority"
const url = "mongodb+srv://adminmongo:adminmongo@cluster0.9cjkm.azure.mongodb.net/productsapp?retryWrites=true&w=majority"
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected Mongo...")
}).catch(err => console.log("Erro: " +err));


app.use('/departments', department_controller);
app.use('/products',product_controller);

app.listen(3000)