const express = require("express")
const router = express.Router();

router.get("/articles",(req,res)=>{
    res.send("Rota Artigos")
})

router.get("/admin/articles/new",(req,res)=>{
    res.send("Rota Para Criar uma Nova Artigos")
})

module.exports = router;