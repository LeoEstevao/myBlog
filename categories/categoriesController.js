const express = require('express');
const router = express.Router();
const Category = require('./category.js');
const slugify = require('slugify');

// LIST CATEGORYS
router.get('/categories', (req, res) => {
    Category.findAll().then( resCategories => {
        res.render('./admin/categories/index.ejs', { categories:resCategories })
    })

})

// CREATE CATEGORY
router.get('/categories/new', (req, res) => {
    res.render('./admin/categories/new.ejs');

});

router.post('/categories/save', (req, res) => {
    let categTitle = req.body.categTitle;
    
    if(categTitle != '') 
    Category.create({
        NAME: categTitle,
        SLUG: slugify(categTitle)
    }).then( () => {
        res.redirect('./');
    })
    else
    res.render('./admin/categories/new.ejs');
})


// DELETE CATEGORY
router.post('/categories/delete', (req, res) => {
    let categId = req.body.categId;
    if(categId == undefined)
        // return res.send(categId)
        return res.send('Erro ao excluir categoria, id inválido!');
    if(isNaN(categId))
        return res.send('Erro ao excluir categoria, id passado nao é um número!');

    Category.destroy({
        where: {
            ID: categId
        }
    }).then( () => {
        res.redirect('.');
    })
})


// EDIT CATEGORY

router.get('/categories/edit', (req, res) => {
    let categId = isNaN(req.query['categId']) ? undefined : req.query['categId'];

    Category.findByPk(categId).then( result => {
        if(categId == undefined)
            res.redirect('/categories');
        res.render('./admin/categories/edit.ejs', {
            result
        })
    }).catch(err => {
        res.redirect('./');
    })
})

router.post('/categories/update', (req, res) => {
    let categId = req.body.categId;
    let categName = req.body.categName;
    Category.update(
        {// Updated field
            NAME: categName,
            SLUG: slugify(categName)
        },
        {
            where:
            {ID: categId}
        }).then(() =>{
            res.redirect('./')
        })
})

module.exports = router;