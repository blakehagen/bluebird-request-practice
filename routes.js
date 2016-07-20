'use strict';

const _        = require('lodash');
const request  = require('request');
const Promise  = require('bluebird');
const BRequest = Promise.promisify(request);

module.exports = (app) => {

  // TEST ROUTE //
  app.get('/api/v1/test', (req, res) => {
    res.send('im here!')
  });


};