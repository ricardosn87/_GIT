var PersonModel = require('../models/PersonModel')

module.exports = {
    all: function (req, res) {
        PersonModel.find().lean().exec(function (err, persons) {
            if (err) {
                console.log("ERRO:" + err)
                return res.json([])
            }
            return res.json(persons);
        })
    }
}