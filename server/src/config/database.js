const {Sequelize} = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD  , {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

try{
    connection.authenticate();
    console.log("Connected with success");
}catch(err){
    console.log("Error: " + err);
}

module.exports = connection;