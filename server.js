'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const logger     = require('morgan');
const port       = 3300;

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

// ROUTES //
require('./routes')(app);


app.listen(port, () => {
  console.log('Listening on port ', port);
});