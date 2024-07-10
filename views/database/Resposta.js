const Sequelize = require("sequelize");
const connection = require("./database");


//direcionando as respostas as perguntas de acordo com o id da pergunta
const Resposta = connection.define("respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

//Sincronixando com o banco de dados
Resposta.sync({force: false});

module.exports = Resposta;