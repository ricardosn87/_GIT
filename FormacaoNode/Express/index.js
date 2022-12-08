const express = require("express")
const app = express()


app.get("/", function (req, resp) {
    resp.send("Bem Vindo ao guia do programador")
})

app.get("/blog/:artigo?", function (req, resp) {

    var artigo = req.params.artigo
    if (artigo)
        resp.send("<h2>Artigo: " + artigo + "</h2>")
    else resp.send("Bem Vindo ao meu blog")


})
app.get("/canal/youtube", function (req, resp) {

    var canal = req.query["canal"];

    if (canal)
        resp.send("<h1>Bem Vindo ao meu canal " + canal + "!</h1>")
    else resp.send("<h1>Nenhum canal fornecido!</h1>")

})

app.get("/ola/:nome/:empresa", function (req, resp) {
    var nome = req.params.nome
    var empresa = req.params.empresa
    resp.send("<h1>Oi " + nome + " da Empresa: " + empresa + "</h1>")
})

app.listen(4000, function (erro) {
    if (erro) {
        console.log("Ocorrou um erro!")
    }
    else {
        console.log("Servidor inciado com sucesso!")
    }
})
