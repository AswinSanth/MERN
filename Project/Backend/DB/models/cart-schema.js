const { Schema, model } = require('mongoose');
const User = require('./user-schema');
const Product = require('./product-schema');

const cartSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
});
const Cart = model('carts', cartSchema);
module.exports = Cart;
