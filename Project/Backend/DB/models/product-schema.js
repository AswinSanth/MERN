const { Schema, model } = require('mongoose');

const productSchema = Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  inStock: { type: String },
  image: {
    type: String,
    default: 'http://localhost:8000/images/1j6s9nkygmgsz8szb-no-image.png',
  },
  address:{
    
  }
});

const Product = model('products', productSchema);

module.exports = Product;
