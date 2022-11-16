const path = require('path');
const express = require('express');

const app = express();

const PORT = 3000;

// parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// static files
app.use(express.static(path.join(__dirname, '../client')));

// get requests to main page
app.get('/', (req, res) => {
  res.send('TEST');
});

// global error handler
app.use((err, req, res, next) => {

});



app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;