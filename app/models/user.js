var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Company = mongoose.model('Company');

var UserSchema = new Schema({
	
  username: { type: String, lowercase: true, unique: true },
  companies: [Company],
  hash: String,
  salt: String

});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(15).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, 'SECRET');
};


module.exports = mongoose.model( 'User', UserSchema );