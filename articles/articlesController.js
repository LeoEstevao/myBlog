const express = require('express');
const router = express.Router();

const Category = require('../categories/category.js');
const Article = require('./article.js');
const slugify = require('slugify');

router.get('/articles/', (req, res) => {
    // res.send('Artigo')
    Article.findAll({
        // Dar joins: passar um array com as tabelas que queremos receber na consulta
        // include: [{model: modalImportado}]
        include: [ {model: Category} ]
    }).then( results => {
        res.render('./admin/articles/index.ejs', { articles: results })
    })
});

// router.get('/article/')

router.get('/articles/new', (req, res) => {
    Category.findAll().then( result => {
        res.render('./admin/articles/new.ejs', { categResults: result })
    })
});

router.post('/articles/save', (req, res) => {
    let articTitle = req.body.articTitle;
    let articText = req.body.articText;
    let categId = req.body.categId;

    Article.create({
        NAME: articTitle,
        SLUG: slugify(articTitle),
        BODY: articText,
        CATEGORYID: categId
    }).then( () => {
        res.redirect('/admin/articles');
    })
})

router.post('/articles/delete', (req, res) => {
    articleId = req.body.articleId;
    if(articleId == undefined)
        // return res.send(categId)
        return res.send('Erro ao excluir categoria, id inválido!');
    if(isNaN(articleId))
        return res.send('Erro ao excluir categoria, id passado nao é um número!');

    Article.destroy({
        where: {
            ID: articleId
        }
    }).then( () => {
        res.redirect('/admin/articles');
    })
})

router.get('/articles/edit', (req, res) => {
    articleId = req.query['articleId'];
    Category.findAll().then( (results) => {
        res.render('./admin/articles/edit', { 
            articleId: articleId,
            categResults: results
         });
    })
    // console.log(req.query['articleId'])
    // res.send(req.query['articleId']);

})

router.post('/articles/update', (req, res) => {
    articleId = req.body.articleId;
    articText = req.body.articText;
    articTitle = req.body.articTitle;
    categId = req.body.categId;

    Article.update(
        {
            NAME: articTitle,
            SLUG: slugify(articTitle),
            BODY: articText,
            CATEGORYID: categId
        },
        {
            where:{
                ID: articleId
            }
        }
    ).then( () => {
        res.redirect('/admin/articles');
    })
})
module.exports = router;