const { Schema, model } = require('mongoose');

const productSchema = Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  inStock: { type: String },
});

const Product = model('products', productSchema);

module.exports = Product;
