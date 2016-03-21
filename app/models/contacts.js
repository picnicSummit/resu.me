var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactsSchema = new Schema({
  name: String,
  email: String,
  phoneNumber: String,
  socialMedia: String,
  title: String,
  website: String
});

module.exports = mongoose.model('Contacts', ContactsSchema);