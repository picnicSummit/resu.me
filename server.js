var express = require('express');
var mongoose = require('mongoose');
var Issue = require( './app/models/issue' );
var app = express();

var port = process.env.PORT || 4568;
var dbURI = 'mongodb://localhost/niccon';


mongoose.connect( dbURI );

// Serve index.html file (detected automatically in specified directory)
app.use( express.static( __dirname + '/public') );

app.listen( port, function () {
  console.log( 'server listening on port ' + port + '...\n' );
});


mongoose.connection.on( 'connected', function () {

  console.log( 'successful db connection to: ' + dbURI + '\n' );

  if( app.get('env') === 'development' ) {

    var demoData = require( './app/models/demoData' );

    Issue.remove().exec(); // clear database

    Issue.collection.insertMany( demoData, function(err,r) {

      if( err )
        console.log( "error loading demo data:", err );
      else
        console.log( "seeded database with " + r.insertedCount + " records\n" );
    });

  }
});



// handle this elsewhere...

app.get( '/api/issues', function( req, res ) {

  Issue.find( {}, function(error, data) {

    if(error) {
      res.json(error);
    }
    else if( data === null ) {
      res.json('Empty data')
    }
    else {
      res.json(data);
    }      
  });

});




