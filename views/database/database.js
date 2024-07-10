const Sequelize = require('sequelize');

//através do sequelize é posiivel criar tabelas no banco de dado usando javascript
const connection = new Sequelize('guiaperguntas','root','senha1234',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;