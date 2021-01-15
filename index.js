// EXPRESS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database.js');
const articlesController = require('./articles/articlesController.js');
const categoriesController = require('./categories/categoriesController.js');
const usersController = require('./admin/usersController.js');

const Category = require('./categories/category.js');
const Article = require('./articles/article.js');
const User = require('./admin/user.js');
// DATABASE
connection.authenticate()

// STATIC
app.use(express.static('public'))
// EJS
app.set('view engine', 'ejs');
// BODY-PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/admin', articlesController);
app.use('/admin', categoriesController);
app.use('/admin', usersController);

app.get('/', (req, res) => {
    res.render('./index.ejs');
});

app.listen(8080);