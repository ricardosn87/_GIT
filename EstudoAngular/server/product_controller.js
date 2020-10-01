const express = require('express')
var router = express.Router();
var Product = require('./product')

router.post('/', function (req, res) {
    let p = new Product({        
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        departments: req.body.departments
    });

    p.save((err, prod) => {
        if (err)
            res.status(500).send(err)
        else res.status(200).send(prod)

    })
})

router.get('/', function (req, res) {
    Product.find().exec((err, prod) => {
        if (err)
            res.status(500).send(err)
        else res.status(200).send(prod)
    })
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Product.deleteOne({
        _id: id
    }, (err) => {
        if (err)
            res.status(500).send(err)
        else res.status(200).send({})
    })
})

router.patch('/:id', (req, res) => {
    Product.findById(req.params.id, (err, prod) => {
        if (err)
            res.status(500).send(err)
        else if (!prod)
            res.status(404).send({})
        else {
            prod.name = req.body.name;
            prod.price = req.body.price;
            prod.stock = req.body.stock
            prod.departments = req.body.departments
            prod.save()
                .then((d) => res.status(200).send(d))
                .catch((e) => res.status(500).send(e))
        }
    })
})

module.exports = router;