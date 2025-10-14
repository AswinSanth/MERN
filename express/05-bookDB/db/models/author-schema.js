const { Schema, model } = require('mongoose');

const authorSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  about: {
    type: String,
    require: true,
  },
  awards: [String],
  image: {
    type: String,
    require: true,
  },
});

const Author = model('authors', authorSchema);
module.exports = Author;
