// set up ======================================================================
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

var Company = require( './app/models/company' );
var User = require( './app/models/user' );
var Contacts = require( './app/models/contacts' );
var ConfigPassport = require( './config/passport' );

// configuration ===============================================================
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// Serve index.html file (detected automatically in specified directory)
app.use( express.static( __dirname + '/public') );

//initialize passport
app.use( passport.initialize() );

var port = process.env.PORT || 8000;
var dbURI = 'mongodb://itsme:123@ds015909.mlab.com:15909/resu-me';


mongoose.connect( dbURI );

// listen (start app with node server.js) ======================================
app.listen( port, function () {
  console.log( 'server listening on port ' + port + '...\n' );
});


mongoose.connection.on( 'connected', function () {

  console.log( 'successful db connection to: ' + dbURI + '\n' );

});

// routes ======================================================================
require('./app/routes.js')(app);



