const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  stock: {type: Array, required: true},
});

module.exports = mongoose.model('Stock', stockSchema);