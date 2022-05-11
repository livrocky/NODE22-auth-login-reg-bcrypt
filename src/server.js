// server
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const PORT = 3002;

//MiddleWare
app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(PORT, () => console.log('server online on port', PORT));
