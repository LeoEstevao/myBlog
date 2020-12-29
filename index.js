// EXPRESS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database.js');
const articlesController = require('./articles/articlesController.js');
const categoriesController = require('./categories/categoriesController.js');

const Category = require('./categories/category.js');
const Article = require('./articles/article.js');
// DATABASE
connection.authenticate()

// STATIC
app.use(express.static('public'))
// EJS
app.set('view engine', 'ejs');
// BODY-PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', articlesController);
app.use('/', categoriesController);

app.get('/', (req, res) => {
    res.render('./index.ejs');
});

app.listen(8080);