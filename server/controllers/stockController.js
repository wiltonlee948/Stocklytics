const Stock = require('../models/stockModels');

const stockController = {
  updateStock: (req, res, next) => {
    const stock = req.body;
  },
};

module.exports = stockController;