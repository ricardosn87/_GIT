var mongoose = require('mongoose')
var faker = require('faker')
var PersonModel = require('../models/PersonModel')

const url = "mongodb+srv://angular:angular@cluster0.9cjkm.azure.mongodb.net/angular?retryWrites=true&w=majority"
mongoose.connect(url);


async function Add(n) {
    try {
        for (let i = 0; i < n; i++) {
            const p = new PersonModel({
                name: faker.name.firstName(),
                country: faker.address.country(),
                email: faker.internet.email(),
                company: faker.company.companyName()
            })
            console.log("Classe Pessoa: " + p)
            await p.save()
        }
    } catch (error) {
        console.log("Person Erro." + error)
    }
}

Add(100)
    .then(() => {
        console.log("Person Criado.")
        mongoose.disconnect()
    })