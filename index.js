const express = require('express');
const bodyParser = require("body-parser");
const connection = require("./views/database/database");
const app = express();
const Pergunta = require("./views/database/Pergunta");
const Resposta = require("./views/database/Resposta");

//database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados")
    }).catch((msgErro) => { 
        console.log("ERRO")})

//dizendo para o EXPRESS usar o EJS como view engine
app.set('view engine','ejs');
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({}));

//rotas
app.get("/",(req,res) => {
    Pergunta.findAll({raw: true, order:[
        ['id', 'DESC'] // ASC = CRESCENTE || DESC = DECRESCENTE
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });  
});

app.get("/perguntar",(req,res)=> {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    //direcionando perguntas ao banco de dados
    Pergunta.create({ 
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req,res) => {
    var id= req.params.id;
    Pergunta.findOne({ //busca um dado com condicao no banco
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ //Pergunta encontrada
                
                Resposta.findAll({
                    where:{perguntaId: pergunta.id},
                    order:[['id', 'DESC']]

                }).then(respostas => {
                    res.render("pergunta", {
                        pergunta: pergunta,
                        respostas: respostas
                    });

                });

        }else{ // nao encontrada
            res.redirect("/");
        }
    });
});

app.post("/responder", (req,res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});

//porta
app.listen(8080, ()=>{console.log("App rodando");});