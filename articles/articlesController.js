const express = require('express');
const router = express.Router();

router.get('/articles/', (req, res) => {
    res.send('Artigo')
});

router.get('/articles/new', (req, res) => {
    res.render('./admin/articles/new.ejs');
});

module.exports = router;