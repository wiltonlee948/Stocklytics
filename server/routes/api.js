const express = require('express');
const stockController = require('../controllers/stockController');
const router = express.Router();

router.get('/', stockController.getStock, (req, res) => {
  console.log(res.locals.doc)
  res.status(200).res.json(res.locals.doc);
});

router.post('/', stockController.updateStock, (req, res) => {
  res.status(200).json(res.locals.doc);
});

module.exports = router;