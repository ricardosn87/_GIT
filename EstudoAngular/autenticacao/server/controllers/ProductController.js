var ProductModel = require('../models/ProductModel')

module.exports = {
    all: function (req, res) {
        ProductModel.find().lean().exec(function (err, products) {
            if (err) {
                console.log("ERRO:" + err)
                return res.json([])
            }

            return res.json(products);
        })
    }
}