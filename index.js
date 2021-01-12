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

app.use('/admin', articlesController);
app.use('/admin', categoriesController);

app.get('/', (req, res) => {
    // TODO: LIMITAR?
    Article.findAll({
        order :[['ID', 'DESC']],
        limit: 4
    }).then( (articResults) => {
        Category.findAll().then( categResults => {
            res.render('./index.ejs', {
                articles: articResults, 
                categories: categResults,
                page: false,
                next: true,
            });
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
                articles: categResult.ARTICLEs,
                page: false,
                next: true,
            })
            // res.send(categResults)
        })
        

        // console.log(categResult.ARTICLEs)
        // res.send(categResult.ARTICLEs)
    }).catch( err => {
        res.redirect('/');
    })
})

// PAGINAÇÃO
app.get('/page', (req, res) => {
    // Número de itens exibidos por página
    let numItems = 5;
    // Parâmetro recebido via url (GET)
    let page = req.query['pageNum'];
    // Caso o parâmetro recebido seja 0, números negativos ou algo não numérico, page automaticamente será transformado em 1, para renderizar o primeiro índice
    if(isNaN(page) || page <= 0)
        page = 1; // Or Redirect?
    // Fazer o calculo reduzindo o índice da página em 1, pois o OFFSET é de onde inicia a contagem dos registros, caso contrário, a página 1 vai iniciar pelo registro 5
    let offSet = (page - 1) * numItems; 
    // SELECT * COM UM COUNT
    Article.findAndCountAll({
        order:[['ID', 'DESC']],
        offset: offSet,
        limit: numItems
    }).then( articResults => {
        // Quantidade de resultados
        let numResults = articResults.rows.length
        // Se há mais itens na próxima página
        let next = true;

        // MELHOR LOGICA
        // Se o offset (índice inicial) +  numItems (quantidade de queries retornadas na página)
            // FOR MAIOR OU IGUAL O TOTAL DE QUERYES DO SELECT ALL
                // Significa que não há mais itens restantes
        if(offSet + numItems >= articResults.count)
            next = false;
            // res.send('Não há próxima página! ')

        console.log(`Offset é: ${offSet}; Num items é: ${numItems}; Num Results é: ${numResults}`)
        // Caso a quantidade de itens na página for menor que o limite, não há próxima página
        // if(numResults < numItems)
            // res.send('Não há próxima página! Resultados:' + numResults)
        // Caso a quantidade de itens na página for igual ao limite, porém o (resultado total / itens por página) for igual ao índice da página, é pq os itens foram exibidos redondamente, e não há mais registros
        // if(numResults == numItems && articResults.count / numItems == page)
            // res.send('Não há próxima página! Resultados:' + numResults)
        Category.findAll().then( categResults => {
            res.render('./page.ejs', {
                articles: articResults,
                categories: categResults,
                next: next,
                page: page
            })
        })
        // res.json(articResults);
    }).catch(err => {

    })
})
app.listen(8080);