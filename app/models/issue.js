var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var issueSchema = new Schema({
  title: String,
  description: String,
  bid: Number,
  hourly: Boolean,
  accepted: Boolean,
  completed: Boolean
});

module.exports = mongoose.model( 'Issue', issueSchema );