const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Artigo')
});

router.get('/new', (req, res) => {
    res.send('Novo Artigo')
});

module.exports = router;