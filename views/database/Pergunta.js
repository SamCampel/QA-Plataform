const Sequelize = require ("sequelize");
const connection = require ("./database");

//definir model
//isso criará uma tabela no banco dde dados
const Pergunta = connection.define('pergunta', {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// não vai recriar outra tabela caso já exista
Pergunta.sync({force: false}).then (() => {});

module.exports = Pergunta;