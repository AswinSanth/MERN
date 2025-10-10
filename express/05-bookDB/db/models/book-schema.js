const { Schema, model } = require('mongoose');

const bookSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    lowercase: true,
    trim: true,
  },
  author: {
    type: String,
    // select: false,
    // enum: ['arun', 'blake', 'andrew'],

    uppercase: true,
  },
  price: { type: Number, min: 200, max: 2000 },
});

const Book = model('books', bookSchema);
module.exports = Book;
