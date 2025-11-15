const { Schema, model } = require('mongoose');
const { User } = require('./user-schema');
const Product = require('./product-schema');

const wishlistSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  listItems: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'products', required: true },
    },
  ],
});

const Wishlist = model('wishlists', wishlistSchema);
module.exports = Wishlist;
