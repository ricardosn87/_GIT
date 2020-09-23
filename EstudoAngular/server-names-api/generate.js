/* const { MongoClient } = require("mongodb");
const faker = require('faker');
const Person = require('./person.js');


const url = "mongodb+srv://adminmongo:adminmongo@cluster0.emzni.azure.mongodb.net/namesdb?authSource=admin&replicaSet=atlas-fge72j-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true"
const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
const dbName = "namesdb" */

const faker = require('faker');
const Person = require('./person.js');
const url = "mongodb+srv://adminmongo:adminmongo@cluster0.emzni.azure.mongodb.net/namesdb?authSource=admin&replicaSet=atlas-fge72j-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true"
var mongoose = require('mongoose');
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

async function run() {
    try {

        db.once("open", function() {
            console.log("Connection Successful!");
            createRandompeople().then(() => {
                console.log("OK")
            })
        })
    } catch (err) {
        console.log(err.stack);
    } finally {

    }
}

run()

async function createRandompeople() {
    const N = 1000;
    for (let i = 0; i < N; i++) {
        let p = new Person({
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            city: faker.address.city(),
            country: faker.address.country()
        });

        try {
            await p.save()
        } catch (err) {
            throw new Error('Erro ao gerar Person')
        }
    }
}