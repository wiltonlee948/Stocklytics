const express = require('express');
const stockController = require('../controllers/stockController');
const router = express.Router();

router.get('/', (req, res) => {
  res.json('cheero');
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.json('cheerios');
});

module.exports = router;