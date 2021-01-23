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
    // TODO: LIMITAR?
    Article.findAll({
        order :[['ID', 'DESC']]
    }).then( (articResults) => {
        Category.findAll().then( categResults => {
            res.render('./index.ejs', {articles: articResults, categories: categResults});
        })
    })
});

app.get('/article', (req, res) => {
    let slug = req.query['slug'];

    if(slug == undefined)
        return res.redirect('/');

    Article.findOne({
        where: {
            slug: slug
        }
    }).then( articResult => {
        if(articResult == undefined)
            return res.redirect('/');
        Category.findAll().then( categResults => {
            res.render('./article.ejs', {article: articResult, categories: categResults});

        })
    }).catch( err =>
        res.redirect('/')
    )
});

app.get('/category', (req, res) => {
    let categName = req.query['categName'];
    Category.findOne({
        where:{
            SLUG: categName
        },
        // JOIN -> Retornar todos os artigos que estão relacionados com o resultado, ou seja, que tem a categoria resultante
        include: [{model: Article}]
    }).then( (categResult) => {
        if(categResult == undefined)
            return res.redirect('/');

        Category.findAll().then( categResults => {
            res.render('index.ejs', {
                categories: categResults,
                articles: categResult.ARTICLEs
            })
            // res.send(categResults)
        })
        

        // console.log(categResult.ARTICLEs)
        // res.send(categResult.ARTICLEs)
    }).catch( err => {
        res.redirect('/');
    })
});

app.listen(8080);