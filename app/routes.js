var express = require('express');
var mongoose = require('mongoose');
var Company = require( './models/company' );

module.exports = function (app) {

  app.get( '/api/companies', function( req, res ) {

    Company.find( {}, function(error, companies) {

      if ( error ) {
        res.json(error);
      } else if ( companies === null ) {
        res.json('Empty data');
      } else {
        res.json(companies);
      }      
    });
  });

  app.get('/api/companies/:name', function(req, res) {
    
    var name = req.params.name;
    Company.find( {name: name }, function(error, company) {
      console.log('company', company);
      if (error) {
        console.log('error', error);
        res.json(error);
      } else if ( company === null ) {
        res.json('Empty data');
      } else {
        res.json(company);
      }
    });
  });

  app.post( '/api/companies', function(req, res) {

    var newCompany = Company({
      name: req.body.name,
      status: {
        applied: false,
        phone: false,
        onsite: false,
        offer: false,
        accepted: false 
      }
    });

    newCompany.save(function(err) {
      res.end();
    });

  });

  app.get( '/test', function(req, res) {
    res.sendfile(__dirname + '/public/test/test.html');
  });

  app.delete( '/api/companies/:id', function (req, res) {
    
    var id = req.params.id;
    Company.remove({ _id: mongoose.Types.ObjectId(id) }, 
      function(err, doc) {
        res.json(doc);
      });

  });

};