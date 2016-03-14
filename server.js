// set up ======================================================================
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

var Company = require( './app/models/company' );
var User = require( './app/models/user' );

var ConfigPassport = require( './config/passport' );

// configuration ===============================================================
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var port = process.env.PORT || 4500;
var dbURI = 'mongodb://heroku_qbvl1qx6:u764ejr6tc2u04ht5lms87vdm0@ds011389.mlab.com:11389/heroku_qbvl1qx6';


mongoose.connect( dbURI );

// Serve index.html file (detected automatically in specified directory)
app.use( express.static( __dirname + '/public') );

//initialize passport
app.use( passport.initialize() );


// listen (start app with node server.js) ======================================
app.listen( port, function () {
  console.log( 'server listening on port ' + port + '...\n' );
});


mongoose.connection.on( 'connected', function () {

  console.log( 'successful db connection to: ' + dbURI + '\n' );

});

// routes ======================================================================
require('./app/routes.js')(app);



