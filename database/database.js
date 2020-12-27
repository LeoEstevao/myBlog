const sequelize = require('sequelize');
const connection = new sequelize(
    'DB_MYBLOG',
    'root',
    '1234',
    {
        host: 'localhost',
        dialect: 'mysql'
    });

module.exports = connection;