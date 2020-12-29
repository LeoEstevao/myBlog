const express = require('express');
const router = express.Router();
const Category = require('./category.js');
const slugify = require('slugify');

// router.get('/admin/categories/new', (req, res) => {
//     res.send('Categorias');
// });

router.get('/admin/categories/new', (req, res) => {
    res.render('./admin/categories/new.ejs');

});

router.post('/admin/categories/save', (req, res) => {
    let categTitle = req.body.categTitle;
    
    if(categTitle != '') 
    Category.create({
        NAME: categTitle,
        SLUG: slugify(categTitle)
    }).then( () => {
        res.redirect('/');
    })
    else
    res.render('./admin/categories/new.ejs');
})

router.get('/admin/categories', (req, res) => {
    Category.findAll().then( resCategories => {
        res.render('./admin/categories/index.ejs', { categories:resCategories })
    })

})

module.exports = router;