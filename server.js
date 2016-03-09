var express = require('express');
var mongoose = require('mongoose');
var Company = require( './app/models/company' );
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var port = process.env.PORT || 4568;
var dbURI = 'mongodb://localhost/jobhunt';


mongoose.connect( dbURI );

// Serve index.html file (detected automatically in specified directory)
app.use( express.static( __dirname + '/public') );

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


// handle this elsewhere...

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
    name: req.body.name
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

  Company.remove({ _id: mongoose.Types.ObjectId(id) }, function(err, doc) {
    res.json(doc);
  });


});

