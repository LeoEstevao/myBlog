const express = require('express');
const router = express.Router();

router.get('/article', (req, res) => {
    res.send('Artigo')
});

router.get('/Article/new', (req, res) => {
    res.send('Novo Artigo')
});

module.exports = router;