const connection = require('../database/database.js');
const sequelize = require('sequelize');

const Users = connection.define('users', {
    ID: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    LOGIN: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    EMAIL: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    PASSWORD: {
        type: sequelize.STRING,
        allowNull: false
    }
});

Users.sync({force: false});

module.exports = Users;