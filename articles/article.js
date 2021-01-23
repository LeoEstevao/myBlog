const sequelize = require('sequelize');
const connection = require('../database/database.js');
const Category = require('../categories/category.js');

const Article = connection.define('articles', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    // SLUG seria uma "conversão" do NAME de uma categoria, para um "formato" adequado na programação, ou seja, substituindo espaços, pontos, acentuações, caractéres especiais e etc para - ou _  etc
    slug: {
        type: sequelize.STRING,
        allowNull: false
    },
    body: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article
    , {
  foreignKey: {
    // name: 'categid',
    allowNull: false
  }
}
);
Article.belongsTo(Category);

Article.sync(
    // { force: true }
);

module.exports = Article;