const express = require('express');
const router = express.Router();

const Category = require('../categories/category.js');
const Article = require('./article.js');
const slugify = require('slugify');

router.get('/articles/', (req, res) => {
    res.send('Artigo')
});

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
        res.redirect('/admin/articles/new');
    })
})

module.exports = router;