const { Schema, model } = require('mongoose');

const orderSchema = Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'books',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  date: { type: String, required: true },
});

const Order = model('orders', orderSchema);
module.exports = Order;
