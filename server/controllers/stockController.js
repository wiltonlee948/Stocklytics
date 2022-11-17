const Stock = require('../models/stockModels');

const stockController = {};

stockController.updateStock = async (req, res, next) => {
  try {
    const stock = req.body;
    const ssid = req.cookies.ssid;
    if (!req.cookies.ssid) {
      const response = await Stock.create({stock: stock});
      const ssid = response._id.valueOf();
      res.cookie('ssid', ssid, {httpOnly: true});
      res.locals.doc = response;
      return next();
    }
    const response = await Stock.findOneAndUpdate({_id: ssid},{stock:req.body}, {new: true});
    console.log(response);
    res.locals.doc = response.stock;
    return next();
  } catch(err) {
    return next({err});
  }
};

stockController.getStock = async (req, res, next) => {
  const ssid = req.cookies.ssid;
  try {
    const response = await Stock.findOne({_id: ssid});
    if (!response) {
      res.locals.doc = [];
      return next();
    }
    res.locals.doc = response;
    return next();
  } catch(err) {
    return next({log: 'ERROR at stockController.getStock middleware', err: JSON.stringify(err)});
  }

};

module.exports = stockController;