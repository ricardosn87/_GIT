var mongoose = require('mongoose')
var faker = require('faker')
var ProductModel = require('../models/ProductModel')

const url = "mongodb+srv://angular:angular@cluster0.9cjkm.azure.mongodb.net/angular?retryWrites=true&w=majority"
mongoose.connect(url);

async function Add(n) {
    try {
        for (let i = 0; i < n; i++) {
            const p = new ProductModel();
            p.name = faker.commerce.productName()
            p.department = faker.commerce.department()
            p.price = faker.commerce.price()
            await p.save()
        }
    } catch (error) {
        console.log(error)
    }
}

Add(100)
  .then(()=>{
      console.log("Produto Criado.")
      mongoose.disconnect()
  })