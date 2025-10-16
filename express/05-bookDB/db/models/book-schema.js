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
    type: Schema.Types.ObjectId,
    ref: 'authors',
  },
  price: { type: Number, min: 200, max: 2000 },
  image: {
    type: String,
    default: "http://localhost:8000/images/1j6s9nkygmgsz8szb-no-image.png"
  },
});

const Book = model('books', bookSchema);
module.exports = Book;
