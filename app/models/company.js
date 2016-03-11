var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  _creator: { type: String, ref: 'User' },

});

module.exports = mongoose.model( 'Company', companySchema );