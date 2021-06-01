let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
  title: String,
  description: String,
  tags: [String],
  author: String,
  likes: Number,
});

let User = mongoose.model('User', userSchema);

module.exports = User;
