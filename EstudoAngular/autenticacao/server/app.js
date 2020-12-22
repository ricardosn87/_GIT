var express = require('express')
var bodyparser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors')
var app = express();

var api = require('./routes/api')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())

const url = "mongodb+srv://angular:angular@cluster0.9cjkm.azure.mongodb.net/angular?retryWrites=true&w=majority"
mongoose.connect(url,{ useNewUrlParser: true });

app.use('/api', api)

app.use(function (req, res, next) {
    res.status(404).send("route does not exist");
})

app.listen(9000)