'use strict';

const _        = require('lodash');
const request  = require('request');
const Promise  = require('bluebird');
const BRequest = Promise.promisify(request);

module.exports = (app) => {

  //===========//
  // EXAMPLE 1 //
  //===========//
  app.get('/test1/', (req, res) => {

    let options = {
      method: 'GET',
      uri: 'http://swapi.co/api/people/1'
    };

    BRequest(options).then(response => {
      console.log('response ::::::::::: ==> ', response.body);
      res.send(response.body);
    })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  //===========//
  // EXAMPLE 2 //
  //===========//
  app.get('/test2/', (req, res) => {

    const BASE_OPTIONS = {
      method: 'GET',
      uri: 'http://swapi.co/api/people/'
    };

    Promise.map(_.range(1, 6), (charNum) => {
      let options = _.cloneDeep(BASE_OPTIONS);
      options.uri = options.uri + charNum;
      console.log('options :::::: ==>', options);

      return BRequest(options);
    }).then((results) => {
      console.log('results ::::: ==> ', results);

      let characters = _.reduce(results, (aggregatedChars, responsePage) => {
        console.log('responsePage.body', JSON.parse(responsePage.body));
        return aggregatedChars.concat(JSON.parse(responsePage.body))
      }, []);

      console.log('characters :::: ==> ', characters);

      res.status(200).json(characters);
    })
      .catch((err) => {
        res.status(500).json(err);
      })

  });

  //===========//
  // EXAMPLE 3 //
  //===========//
  app.get('/test3/', (req, res) => {

    let options = {
      method: 'GET',
      uri: 'http://swapi.co/api/people/1'
    };

    BRequest(options).then(response => {

      let character = JSON.parse(response.body);
      console.log('homeworld ::::: ==> ', character.homeworld);

      let planetOptions = {
        method: 'GET',
        url: character.homeworld
      };

      BRequest(planetOptions).then(response => {
        let planet = JSON.parse(response.body);
        res.status(200).json(planet);
      })
        .catch(err => {
          res.status(500).json(err);
        });

    })
      .catch((err) => {
        res.status(500).json(err);
      });


  });


};