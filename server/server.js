const path = require('path');
const express = require('express');
// import dotenv to use env variables in process
const dotenv = require('dotenv').config();
const colors = require('colors');
// connect go mongodb
const connectDB = require('./config/db');
// import cookie parser
const cookieParser = require('cookie-parser');

connectDB();
const app = express();

const PORT = 3000;

// parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// parse cookies
app.use(cookieParser());

// static files
app.use(express.static(path.join(__dirname, '../client')));

// route requests to router
app.use('/api', require('./routes/api'));


// global error handler
app.use((err, req, res, next) => {

});



app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;