var express = require('express');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

var mongoose = require('mongoose');
var passport = require('passport');
var Company = require( './models/company' );
var User = require( './models/user' );
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app) {

  //THIS GETS ALL COMPANIES FOR ONE USER
  app.get( '/api/:user/companies', function( req, res ) {
    var id = new ObjectID(req.params.user);
    User
      .findOne({ _id: id })
      .exec(function(error, companies) {
        if ( error ) {
          res.json(error);
        } else {
          res.json(companies);
        }      
      });
  });

  //THIS ADDS A COMPANY TO A USER
  app.post( '/api/:user/companies', function(req, res) {
    console.log(req.body);
    var id = new ObjectID(req.params.user);
    var newCompany = Company(req.body);
    User
      .findOne({_id: id}, function(error, user) {
        if (error) {
          console.log(error);
        }
        user.companies.push(newCompany);
        user.save(function(err) {
          if (err) {
            console.log(err);
          }
        });
        console.log(user);
        res.json(newCompany);
      });
  });

  app.delete( '/api/:user/companies/:company', function (req, res) {
    var id = new ObjectID(req.params.user);
    var company = new ObjectID(req.params.company);
    User
      .update(
        {_id: id},
        { $pull: { companies: {_id: company } } }, 
        function(error, user) {
          if (error) {
            console.log(error);
          }
          res.json(user);
        });
  });

  //ADDING DATES TO COMPANY
  app.post('/api/:user/companies/:company/phone', function(req, res) {
    var id = new ObjectID(req.params.user);
    var company = new ObjectID(req.params.company);
    console.log('------- dates', req.body);
    User
      .findOneAndUpdate(
        {'_id': id, 'companies._id': company},
        { '$set': { 
          'companies.$.dates.phone': req.body.date,
          'companies.$.status.phone': true 
        } }, 
        function(error, user) {
          if (error) {
            console.log(error);
          }
          console.log(user);
          res.json(user);
        });
  }); 

  app.post('/api/:user/companies/:company/onsite', function(req, res) {
    var id = new ObjectID(req.params.user);
    var company = new ObjectID(req.params.company);
    console.log(req.body);
    User
      .findOneAndUpdate(
        {'_id': id, 'companies._id': company},
        { '$set': { 
          'companies.$.dates.onsite': req.body.date,
          'companies.$.status.onsite': true 
        } }, 
        function(error, user) {
          if (error) {
            console.log(error);
          }
          console.log(user);
          res.json(user);
        });
  }); 

  app.post('/api/:user/companies/:company/applied', function(req, res) {
    var id = new ObjectID(req.params.user);
    var company = new ObjectID(req.params.company);
    console.log(req.body);
    User
      .findOneAndUpdate(
        {'_id': id, 'companies._id': company},
        { '$set': { 
          'companies.$.status.applied': true,
        } }, 
        function(error, user) {
          if (error) {
            console.log(error);
          }
          console.log(user);
          res.json(user);
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