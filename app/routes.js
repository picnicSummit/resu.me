var express = require('express');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

var mongoose = require('mongoose');
var passport = require('passport');
var Company = require( './models/company' );
var User = require( './models/user' );
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app) {

  app.get( '/api/companies/:id', function( req, res ) {
    console.log('88888888888', req.params.id);
    var id = new ObjectID(req.params.id);
    User
      .findOne({ id: id })
      .populate('_creator')
      .exec(function(error, companies) {
        if ( error ) {
          console.log(error);
          res.json(error);
        } else if ( companies === null ) {
          console.log(companies);
          res.json('Empty data');
        } else {
          console.log(companies);
          res.json(companies);
        }      
      });
  });

  app.get('/api/companies/:id', function(req, res) {

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

    var newCompany = Company(req.body);
    newCompany.save(function(err) {
      Company.populate(newCompany, {path: '_creator'}, function(error, success) {
        console.log(error);
        console.log('888888', success);
      });
      console.log(err);
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
  //can't go to register if logged in
  app.post('/register', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({message: 'Please fill out all fields'});
    }
    var user = new User();
    user.username = req.body.username;
    user.setPassword(req.body.password);
    user.save(function (err, success) {
      if (err) {
        return next(err);
      }
      return res.json({
        userId: success._id,
        token: user.generateJWT()
      });
    });
  });

  app.post('/login', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({message: 'Please fill out all fields'});
    }
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (user) {
        console.log(user);
        return res.json({
          userId: user._id,
          token: user.generateJWT()
        });
      } else {
        console.log('no user');
        return res.status(401).json(info);
      }
    })(req, res, next);
  });

};