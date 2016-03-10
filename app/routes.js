var express = require('express');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
var mongoose = require('mongoose');
var passport = require('passport');
var Company = require( './models/company' );
var User = require( './models/user' );


module.exports = function (app) {

  app.get( '/api/companies', auth, function( req, res ) {

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

  app.get('/api/companies/:name', auth, function(req, res) {
    
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

  app.post( '/api/companies', auth, function(req, res) {

    newCompany.username = req.payload.username;

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

  app.delete( '/api/companies/:id', auth, function (req, res) {
    
    var id = req.params.id;
    Company.remove({ _id: mongoose.Types.ObjectId(id) }, 
      function(err, doc) {
        res.json(doc);
      });

  });

  app.post('/register', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({message: 'Please fill out all fields'});
    }

    var user = new User();

    user.username = req.body.username;

    user.setPassword(req.body.password);

    user.save(function (err) {
      if (err) {
        return next(err);
      }

      return res.json({token: user.generateJWT()});
    });
  });

  app.post('/login', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }

      if (user) {
        return res.json({token: user.generateJWT()});
      } else {
        return res.status(401).json(info);
      }

    })(req, res, next);
  });

};