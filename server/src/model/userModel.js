const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../config/database');
const bcrypt = require('bcrypt');

const User = connection.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}); 

module.exports = User;

