// EXPRESS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database.js');
const session = require('express-session');
const articlesController = require('./articles/articlesController.js');
const categoriesController = require('./categories/categoriesController.js');
const usersController = require('./admin/usersController.js');

const Category = require('./categories/category.js');
const Article = require('./articles/article.js');
const User = require('./admin/user.js');
// DATABASE
connection.authenticate()
// SESSION
// PS: Por padrao, o express salva as sessions na "memória RAM" do servidor, o que pode acarretar ao gargalo da memória em grandes projetos. 
    // Para resolver isso, há um banco de dados chamado "Redis", que foi feito especialmente para armazenar sessions
app.use(session({
    secret: 'myRandomWord',
    cookie: {
        maxAge: 3000000
    }
}));
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


// APENAS TESTES - APAGAR
app.get('/session-set', (req, res) => {
    req.session.name = 'Leonardo';
    req.session.email = 'leooestevao@gmail.com';

    res.send('Criado a sessao')
    // res.redirect('/session-get');
})
app.get('/session-get', (req, res) => {
    res.json({
        
        // req.session
        nome: req.session.name,
        email: req.session.email
    });
})

app.listen(8080);