var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ContactsSchema = require('./contacts').schema;
var Contacts = mongoose.model('Contacts');

var companySchema = new Schema({
  
  name: String,
  status: {
    applied: Boolean,
    phone: Boolean,
    onsite: Boolean,
    offer: Boolean,
    accepted: Boolean 
  },
  dates: {
    phone: Date,
    onsite: Date
  },
  resume: String,
  coverLetter: String,
  research: String,
  contacts: [ContactsSchema]
});

module.exports = mongoose.model( 'Company', companySchema );

// var contactsSchema = new Schema({
//   name: String,
//   email: String,
//   phoneNumber: String,
//   socialMedia: String,
//   title: String
//   // website: String
// });
// module.exports = mongoose.model('Contacts', contactsSchema);
