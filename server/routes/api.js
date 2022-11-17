const express = require('express');
const stockController = require('../controllers/stockController');
const router = express.Router();

// router.get('/', (req, res) => {
//   console.log('TEST');
//   res.status(200).res.json('success');
// });

router.get('/', stockController.getStock, (req, res) => {
  console.log(res.locals.doc)
  res.status(200).json(res.locals.doc);
});

router.post('/', stockController.updateStock, (req, res) => {
  res.status(200).json(res.locals.doc);
});

module.exports = router;