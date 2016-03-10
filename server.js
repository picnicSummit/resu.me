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

var port = process.env.PORT || 4568;
var dbURI = 'mongodb://localhost/jobhunt';


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

  if ( app.get('env') === 'development' ) {

    var demoData = require( './app/models/demoData' );

    Company.remove().exec(); // clear database

    Company.collection.insertMany( demoData, function( err, r ) {

      if ( err ) {
        console.log( 'error loading demo data:', err );
      } else {
        console.log( 'seeded database with ' + r.insertedCount + ' records\n' );
      }
    });

  }
});

// routes ======================================================================
require('./app/routes.js')(app);



