var Product = require('./product')
const faker = require('faker');
const url = "mongodb+srv://adminmongo:adminmongo@cluster0.emzni.azure.mongodb.net/namesdb?authSource=admin&replicaSet=atlas-fge72j-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true"
var mongoose = require('mongoose');
mongoose.connect(url);


async function generateProducts() {
    for (let i = 0; i < 10; i++) {
        let p = new Product({
            name: faker.commerce.productName(),
            department: faker.commerce.department(),
            price: faker.commerce.price()
        });
        try {
            await p.save()
        } catch (error) {
            throw new Error('Error generating products!')
        }
    }
}

generateProducts().then(() => {
    mongoose.disconnect()
    console.log('Produtos criados!')

})