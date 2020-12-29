const sequelize = require('sequelize');
const connection = require('../database/database.js');

const Category = connection.define('CATEGORIES', {
    ID: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    NAME: {
        type: sequelize.STRING,
        allowNull: false
    },
    // SLUG seria uma "conversão" do NAME de uma categoria, para um "formato" adequado na programação, ou seja, substituindo espaços, pontos, acentuações, caractéres especiais e etc para - ou _  etc
    SLUG: {
        type: sequelize.STRING,
        allowNull: false
    }
})

Category.sync(
    // { force: true }
);

module.exports = Category;