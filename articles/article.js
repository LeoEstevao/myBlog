const sequelize = require('sequelize');
const connection = require('../database/database.js');
const Category = require('../categories/category.js');

const Article = connection.define('ARTICLES', {
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
    },
    BODY: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article);

// Article.sync(
//     { force: true }
//     );

module.exports = Article;