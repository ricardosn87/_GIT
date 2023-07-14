const express = require("express")
const app = express();
const bodyparser = require("body-parser")
const connection = require("./database/database")

const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")

const Article = require("./articles/Article")
const Category = require("./categories/Category")

//view engine
app.set("view engine", "ejs")

//static
app.use(express.static('public'))

//body parsers
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

//database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso")
    }).catch((error) => {
        console.log("Erro de conexão: " + error)
    });

app.use("/", categoriesController)
app.use("/", articlesController)

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(8080, () => {
    console.log("O servidor está rodando.")
})