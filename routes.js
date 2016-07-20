'use strict';

const _        = require('lodash');
const request  = require('request');
const Promise  = require('bluebird');
const BRequest = Promise.promisify(request);

module.exports = (app) => {

  // TEST ROUTE //
  app.get('/api/v1/test', (req, res) => {
    res.send('im here!');
  });

  app.get('/character/:name', (req, res) => {
    console.log(req.params);



    let options = {
      method: 'GET',
      uri: 'http://swapi.co/api/people/1',
      json: true
    };

    BRequest(options).then( response => {
      console.log('response=======> ', response.body );
      res.send(response.body.name);

    });



  });






};