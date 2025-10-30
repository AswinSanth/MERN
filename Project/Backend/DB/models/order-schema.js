const { Schema, model } = require('mongoose');

const orderSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],

  totalAmount: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  address: {
    fullname: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
  },
  shippingAddress: {
    fullname: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
  },
  status: { type: String, default: 'Pending' },
});

const Order = model('orders', orderSchema);
module.exports = Order;
