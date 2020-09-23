const mongoose = require('mongoose')
const Person = require('./person')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const url = "mongodb+srv://adminmongo:adminmongo@cluster0.emzni.azure.mongodb.net/namesdb?authSource=admin&replicaSet=atlas-fge72j-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true"
mongoose.connect(url);

const connection = mongoose.connection;

connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
});

app.get('/', function(req, res, next) {
    Person.find({}).lean().exec((err, data) => {
        if (err) {
            return res.status(500).json({
                error: err,
                message: "internal error"
            })
        }
        return res.status(200).json(data)
    })
});

app.get('/:text', function(req, res) {

    var text = req.params.text;

    var query = {
        $or: [{ firstname: { $regex: text, $options: 'i' } },
            { lastname: { $regex: text, $options: 'i' } },
            { country: { $regex: text, $options: 'i' } },
            { email: { $regex: text, $options: 'i' } },
            { city: { $regex: text, $options: 'i' } }
        ]
    }

    Person.find(query).lean().exec((err, data) => {
        if (err) {
            return res.status(500).json({
                error: err,
                message: "internal error"
            })
        }
        return res.status(200).json(data)

        /* setTimeout
                    ((e) => { return res.status(200).json(data) }, 2000) */
    })
});


app.use(function(req, res, next) {
    res.status(404).send("route does not exist");
})

app.listen(9000)