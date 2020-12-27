const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Categorias');
});

router.get('/new', (req, res) => {
    res.send('New Categorias');
});

module.exports = router;