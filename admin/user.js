const connection = require('../database/database.js');
const sequelize = require('sequelize');

const Users = connection.define('users', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    }
});

Users.sync(
    // {force: true}
);

module.exports = Users;