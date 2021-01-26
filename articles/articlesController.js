const express = require('express');
const router = express.Router();

const Category = require('../categories/category.js');
const Article = require('./article.js');
const slugify = require('slugify');

// Funcao middleware
const adminAuth = require('../middlewares/adminAuth.js');


router.get('/articles/', adminAuth, (req, res) => {
    // res.send('Artigo')
    Article.findAll({
        // Dar joins: passar um array com as tabelas que queremos receber na consulta
        // include: [{model: modalImportado}]
        include: [ {model: Category} ]
    }).then( results => {
        res.render('./admin/articles/index.ejs', { 
            articles: results,
            authStatus: req.session.user
        })
    })
});

// router.get('/article/')

router.get('/articles/new', adminAuth, (req, res) => {
    Category.findAll().then( result => {
        res.render('./admin/articles/new.ejs', { 
            categResults: result,
            authStatus: req.session.user 
        })
    })
});

router.post('/articles/save', adminAuth, (req, res) => {
    let articTitle = req.body.articTitle;
    let articText = req.body.articText;
    let categId = req.body.categId;

    Article.create({
        name: articTitle,
        slug: slugify(articTitle),
        body: articText,
        // PROBLEMA
        categoryId: categId
    }).then( () => {
        res.redirect('/admin/articles');
    })
})

router.post('/articles/delete', adminAuth, (req, res) => {
    articId = req.body.articId;
    if(articId == undefined)
        // return res.send(categId)
        return res.send('Erro ao excluir categoria, id inválido!');
    if(isNaN(articId))
        return res.send('Erro ao excluir categoria, id passado nao é um número!');

    Article.destroy({
        where: {
            id: articId
        }
    }).then( () => {
        res.redirect('/admin/articles');
    })
})

router.get('/articles/edit', adminAuth, (req, res) => {
    articId = req.query['articId'];
    Category.findAll().then( (results) => {
        Article.findByPk(articId).then( articleResult => {
            res.render('./admin/articles/edit', { 
                article: articleResult,
                categResults: results,
                authStatus: req.session.user
        })
         });
    })
    // console.log(req.query['articId'])
    // res.send(req.query['articId']);

})

router.post('/articles/update', adminAuth, (req, res) => {
    articId = req.body.articId;
    articText = req.body.articText;
    articTitle = req.body.articTitle;
    categId = req.body.categId;

    Article.update(
        {
            name: articTitle,
            slug: slugify(articTitle),
            body: articText,
            // PROBLEMA
            categoryId: categId
        },
        {
            where:{
                id: articId
            }
        }
    ).then( () => {
        res.redirect('/admin/articles');
    }).catch( err => {
        if(err)
            res.redirect('./');
    })
})
module.exports = router;