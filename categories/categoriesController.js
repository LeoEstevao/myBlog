const express = require('express');
const router = express.Router();
const Category = require('./category.js');
const slugify = require('slugify');

// middleware
const adminAuth = require('../middlewares/adminAuth.js');

// LIST CATEGORYS
router.get('/categories', adminAuth, (req, res) => {
    Category.findAll().then( resCategories => {
        res.render('./admin/categories/index.ejs', { categories:resCategories })
    })

})

// CREATE CATEGORY
router.get('/categories/new', adminAuth, (req, res) => {
    res.render('./admin/categories/new.ejs');

});

router.post('/categories/save', adminAuth, (req, res) => {
    let categTitle = req.body.categTitle;
    
    if(categTitle != '') 
    Category.create({
        name: categTitle,
        slug: slugify(categTitle)
    }).then( () => {
        res.redirect('./');
    })
    else
    res.render('./admin/categories/new.ejs');
})


// DELETE CATEGORY
router.post('/categories/delete', adminAuth, (req, res) => {
    let categId = req.body.categId;
    if(categId == undefined)
        // return res.send(categId)
        return res.send('Erro ao excluir categoria, id inválido!');
    if(isNaN(categId))
        return res.send('Erro ao excluir categoria, id passado nao é um número!');

    Category.destroy({
        where: {
            id: categId
        }
    }).then( () => {
        res.redirect('.');
    })
})


// EDIT CATEGORY

router.get('/categories/edit', adminAuth, (req, res) => {
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

router.post('/categories/update', adminAuth, (req, res) => {
    let categId = req.body.categId;
    let categName = req.body.categName;
    Category.update(
        {// Updated field
            name: categName,
            slug: slugify(categName)
        },
        {
            where:
            {id: categId}
        }).then(() =>{
            res.redirect('./')
        })
})

module.exports = router;